import express, { Request, Response } from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20" as any,
});

// --- File for admin override ---
const statusFile = path.join(__dirname, "restaurant-status.json");

// --- Opening hours (UK time) ---
const openingHours = [
  { day: 1, open: "13:00", close: "22:00" }, // Monday
  { day: 2, open: "13:00", close: "22:00" },
  { day: 3, open: "13:00", close: "22:00" },
  { day: 4, open: "13:00", close: "22:00" },
  { day: 5, open: "13:00", close: "23:00" },
  { day: 6, open: "13:00", close: "23:00" },
  { day: 0, open: "13:00", close: "22:00" }, // Sunday
];

// --- Helpers ---
function getAdminOverride(): boolean | null {
  try {
    const data = fs.readFileSync(statusFile, "utf8");
    return JSON.parse(data).open;
  } catch {
    return null;
  }
}

function setAdminOverride(open: boolean) {
  fs.writeFileSync(statusFile, JSON.stringify({ open }), "utf8");
}

function isWithinHours(): boolean {
  const now = new Date();
  const ukTime = new Date(
    now.toLocaleString("en-GB", { timeZone: "Europe/London" })
  );

  const today = openingHours.find((d) => d.day === ukTime.getDay());
  if (!today) return false;

  const [openH, openM] = today.open.split(":").map(Number);
  const [closeH, closeM] = today.close.split(":").map(Number);

  const openTime = new Date(ukTime);
  openTime.setHours(openH, openM, 0, 0);

  const closeTime = new Date(ukTime);
  closeTime.setHours(closeH, closeM, 0, 0);

  return ukTime >= openTime && ukTime <= closeTime;
}

function getRestaurantOpen(): boolean {
  const override = getAdminOverride();
  if (override !== null) return override;
  return isWithinHours();
}

// --- Middleware ---
app.use("/webhook", bodyParser.raw({ type: "application/json" })); // Stripe webhook
app.use(express.json()); // must come before toggle/status

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// --- SSE Clients ---
let clients: Response[] = [];

// ✅ Status endpoint
app.get("/status", (req: Request, res: Response) => {
  res.json({ open: getRestaurantOpen() });
});

// ✅ SSE live updates
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  res.flushHeaders?.();

  res.write(`data: ${JSON.stringify({ open: getRestaurantOpen() })}\n\n`);

  clients.push(res);
  req.on("close", () => {
    clients = clients.filter((c) => c !== res);
  });
});

function broadcastStatus(open: boolean) {
  clients.forEach((res) =>
    res.write(`data: ${JSON.stringify({ open })}\n\n`)
  );
}

// ✅ Admin toggle
app.post("/admin/toggle", (req: Request, res: Response) => {
  const { open } = req.body;

  if (typeof open !== "boolean") {
    console.error("Invalid request body:", req.body);
    return res.status(400).json({ error: "Invalid status" });
  }

  setAdminOverride(open);
  broadcastStatus(open);

  console.log("🔄 Restaurant status updated:", open ? "OPEN" : "CLOSED");

  res.json({ success: true, open });
});

// ✅ Stripe checkout
app.post("/create-checkout-session", async (req: Request, res: Response) => {
  const { cart, customer } = req.body;

  if (!getRestaurantOpen()) {
    return res.status(403).json({
      error: "❌ Restaurant is currently CLOSED. Please try again later.",
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart.map((item: any) => ({
        price_data: {
          currency: "gbp",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      customer_email: customer.email,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/checkout",
    });

    res.json({ id: session.id });
  } catch (err: any) {
    console.error("Stripe session error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Stripe webhook
app.post("/webhook", (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("✅ Payment completed:", session);

    // TODO: send confirmation email here if needed
  }

  res.json({ received: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
