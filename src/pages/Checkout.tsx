import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";

// ✅ Load Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

export default function CheckoutPage() {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<boolean | null>(null);
  const [address, setAddress] = useState("");
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // ✅ Listen to restaurant status via SSE
  useEffect(() => {
    const events = new EventSource("http://localhost:5000/events");
    events.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (typeof data.open === "boolean") {
          setOpen(data.open);
        }
      } catch {
        setOpen(false);
      }
    };
    events.onerror = () => {
      events.close();
      setOpen(false);
    };
    return () => events.close();
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!open) {
      alert("❌ Restaurant is closed.");
      return;
    }
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const customer = {
      name: formData.get("name"),
      email: formData.get("email"),
      address, // use autocomplete result
    };

    try {
      const res = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, customer }),
      });
      const data = await res.json();

      if (data.id) {
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({ sessionId: data.id });
      } else {
        alert(data.error || "Something went wrong.");
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty 🛒</h2>
        <Link
          to="/menu"
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  if (!isLoaded) return <p>Loading maps...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      {open === null ? (
        <p className="text-center text-gray-600">Checking restaurant status...</p>
      ) : (
        <form onSubmit={handleCheckout} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Address with Autocomplete */}
          <div>
            <label className="block font-medium mb-1">Delivery Address</label>
            <Autocomplete
              onLoad={(ac) => setAutocomplete(ac)}
              onPlaceChanged={() => {
                if (autocomplete) {
                  const place = autocomplete.getPlace();
                  setAddress(place.formatted_address || "");
                }
              }}
            >
              <input
                type="text"
                placeholder="Start typing your address..."
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </Autocomplete>
          </div>

          {/* Order Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {cart.map((item) => (
                <li key={item.id}>
                  {item.quantity} × {item.name} — £
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="mt-3 font-bold">Total: £{total.toFixed(2)}</p>
          </div>

          {open ? (
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 rounded-lg shadow font-semibold transition ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {loading ? "Processing..." : "Pay with Card 💳"}
            </button>
          ) : (
            <div className="text-center mt-6">
              <span className="px-5 py-3 bg-red-600 text-white rounded-lg font-bold text-lg shadow">
                ❌ Restaurant is currently CLOSED
              </span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
