import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

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
app.use("/webhook", bodyParser.raw({ type: "application/json" }));
app.use(express.json());

// ✅ Flexible CORS setup
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://grannys-takeaway.co.uk"] // change to your live domain
    : ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked: " + origin));
      }
    },
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

// ✅ Contact form route (Nodemailer)
app.post("/contact", async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Gmail address
        pass: process.env.GMAIL_PASS, // App password
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // send to yourself
      subject: `📩 New Contact Form Message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: `<p><b>From:</b> ${name} (${email})</p><p>${message}</p>`,
    });

    res.json({ success: true, message: "Message sent successfully ✅" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send message ❌" });
  }
});

// ✅ Serve React frontend in production
const __dirnamePath = path.resolve();
const frontendPath = path.join(__dirnamePath, "../frontend/dist");

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
