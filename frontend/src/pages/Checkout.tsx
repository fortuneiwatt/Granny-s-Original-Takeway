import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

// ✅ Store URLs (set these in your .env once live)
const DELIVEROO_STORE_URL = import.meta.env.VITE_DELIVEROO_STORE_URL || null;
const UBEREATS_STORE_URL = import.meta.env.VITE_UBEREATS_STORE_URL || null;
const JUSTEAT_STORE_URL = import.meta.env.VITE_JUSTEAT_STORE_URL || null;

// ✅ Auto-switch API base (local vs deployed)
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [open, setOpen] = useState<boolean | null>(null);
  const [address, setAddress] = useState("");
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // ✅ Listen to restaurant status via SSE
  useEffect(() => {
    const events = new EventSource(`${API_BASE}/events`);
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
      console.warn("⚠️ SSE connection lost, closing stream.");
      events.close();
      setOpen(false);
    };
    return () => events.close();
  }, []);

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
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
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

          {/* Platform Buttons */}
          {open ? (
            <div className="space-y-3">
              {/* Deliveroo */}
              {DELIVEROO_STORE_URL ? (
                <a
                  href={DELIVEROO_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full px-6 py-3 rounded-lg shadow font-semibold transition bg-green-600 text-white hover:bg-green-700"
                >
                  🛵 Order via Deliveroo
                </a>
              ) : (
                <button
                  disabled
                  className="block text-center w-full px-6 py-3 rounded-lg shadow font-semibold bg-gray-400 text-white cursor-not-allowed"
                >
                  🚧 Deliveroo – Coming Soon
                </button>
              )}

              {/* Uber Eats */}
              {UBEREATS_STORE_URL ? (
                <a
                  href={UBEREATS_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full px-6 py-3 rounded-lg shadow font-semibold transition bg-green-600 text-white hover:bg-green-700"
                >
                  🚗 Order via Uber Eats
                </a>
              ) : (
                <button
                  disabled
                  className="block text-center w-full px-6 py-3 rounded-lg shadow font-semibold bg-gray-400 text-white cursor-not-allowed"
                >
                  🚧 Uber Eats – Coming Soon
                </button>
              )}

              {/* Just Eat */}
              {JUSTEAT_STORE_URL ? (
                <a
                  href={JUSTEAT_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full px-6 py-3 rounded-lg shadow font-semibold transition bg-green-600 text-white hover:bg-green-700"
                >
                  🍽️ Order via Just Eat
                </a>
              ) : (
                <button
                  disabled
                  className="block text-center w-full px-6 py-3 rounded-lg shadow font-semibold bg-gray-400 text-white cursor-not-allowed"
                >
                  🚧 Just Eat – Coming Soon
                </button>
              )}
            </div>
          ) : (
            <div className="text-center mt-4 sm:mt-6 px-3">
              <span className="inline-block w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-lg font-semibold sm:font-bold text-base sm:text-lg shadow-md whitespace-normal sm:whitespace-nowr app
              ">
                ❌ Restaurant is currently CLOSED
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
