import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// ✅ Auto-switch API base (local vs deployed)
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "";

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    Cookies.get("admin-auth") === "true"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  // ✅ SSE with auto-reconnect
  useEffect(() => {
    if (!loggedIn) return;

    let events: EventSource | null = null;

    const connect = () => {
      events = new EventSource(`${API_BASE}/events`);

      events.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (typeof data.open === "boolean") {
            setIsOpen(data.open);
          }
        } catch (err) {
          console.error("SSE parse error:", err);
        }
      };

      events.onerror = () => {
        console.warn("⚠️ SSE connection lost. Retrying in 3s...");
        events?.close();
        setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      events?.close();
    };
  }, [loggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      email === import.meta.env.VITE_ADMIN_EMAIL &&
      password === import.meta.env.VITE_ADMIN_PASS
    ) {
      setLoggedIn(true);
      Cookies.set("admin-auth", "true", { expires: 1 });
    } else {
      alert("Invalid admin credentials ❌");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    Cookies.remove("admin-auth");
  };

  const toggleOpen = async () => {
    try {
      setLoading(true);
      const newStatus = !isOpen;
      const res = await fetch(`${API_BASE}/admin/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ open: newStatus }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "❌ Failed to update restaurant status");
      }
      // ✅ SSE will auto-update isOpen
    } catch (err) {
      console.error("Toggle error:", err);
      alert("❌ Server error while updating status");
    } finally {
      setLoading(false);
    }
  };

  if (!loggedIn) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center text-red-600">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // ✅ Admin Panel
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow text-center">
      <h2 className="text-2xl font-bold mb-6 text-red-600">Admin Panel</h2>

      <p className="mb-4">
        Restaurant is currently:{" "}
        <span
          className={isOpen ? "text-green-600 font-bold" : "text-red-600 font-bold"}
        >
          {isOpen ? "OPEN ✅" : "CLOSED ❌"}
        </span>
      </p>

      <button
        onClick={toggleOpen}
        disabled={loading}
        className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
          isOpen
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Updating..." : isOpen ? "Close Restaurant" : "Open Restaurant"}
      </button>

      <button
        onClick={handleLogout}
        className="block mt-6 w-full bg-gray-600 text-white py-3 rounded hover:bg-gray-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
