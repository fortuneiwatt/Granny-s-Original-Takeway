import React, { useState, useEffect } from "react";

type Hours = {
  day: string;
  open: string;
  close: string;
};

// Opening hours (for display only)
const openingHours: Hours[] = [
  { day: "Monday", open: "13:00", close: "22:00" },
  { day: "Tuesday", open: "13:00", close: "22:00" },
  { day: "Wednesday", open: "13:00", close: "22:00" },
  { day: "Thursday", open: "13:00", close: "22:00" },
  { day: "Friday", open: "13:00", close: "23:00" },
  { day: "Saturday", open: "13:00", close: "23:00" },
  { day: "Sunday", open: "13:00", close: "22:00" },
];

// ✅ Clock-based fallback
function isOpenNow() {
  const now = new Date();
  const ukTime = new Date(
    now.toLocaleString("en-GB", { timeZone: "Europe/London" })
  );

  const today = openingHours[ukTime.getDay() === 0 ? 6 : ukTime.getDay() - 1];
  if (!today) return false;

  const [openH, openM] = today.open.split(":").map(Number);
  const [closeH, closeM] = today.close.split(":").map(Number);

  const openTime = new Date(ukTime);
  openTime.setHours(openH, openM, 0, 0);

  const closeTime = new Date(ukTime);
  closeTime.setHours(closeH, closeM, 0, 0);

  return ukTime >= openTime && ukTime <= closeTime;
}

// ✅ Auto-switch backend URL
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [open, setOpen] = useState<boolean | null>(null); // null = loading
  const [todayIndex, setTodayIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const ukTime = new Date(
      now.toLocaleString("en-GB", { timeZone: "Europe/London" })
    );
    setTodayIndex(ukTime.getDay() === 0 ? 6 : ukTime.getDay() - 1);

    // ✅ Use SSE for live updates
    const events = new EventSource(`${API_BASE}/events`);

    events.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (typeof data.open === "boolean") {
          setOpen(data.open);
        }
      } catch (err) {
        console.error("SSE parse error:", err);
        setOpen(isOpenNow()); // fallback
      }
    };

    events.onerror = (err) => {
      console.error("SSE connection error:", err);
      events.close();
      setOpen(isOpenNow()); // fallback if SSE fails
    };

    return () => {
      events.close();
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(data.error || "❌ Failed to send message.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-red-600">
        Contact Us
      </h1>

      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Info Section */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center lg:text-left">
          <p className="text-lg mb-2">
            📍 220 St Vincent Street, Birmingham, B16 8RP
          </p>
          <p className="text-lg mb-2">
            <a href="tel:+4401214546562" className="hover:text-red-800">
              📞 +44 0121 454 6562
            </a>
          </p>

          {/* Opening Hours */}
          <h2 className="text-2xl font-semibold mb-3 text-red-500">
            Opening Hours
          </h2>
          <ul className="space-y-2">
            {openingHours.map((day, index) => {
              const isWeekend = day.day === "Saturday" || day.day === "Sunday";
              const isToday = index === todayIndex;

              return (
                <li
                  key={day.day}
                  className={`flex justify-between items-center border-b pb-1 px-2 py-1 rounded-md text-sm sm:text-base
                    ${
                      isWeekend
                        ? "text-orange-600 font-semibold"
                        : "text-blue-600 font-semibold"
                    }
                    ${isToday ? "bg-yellow-100 shadow-sm" : ""}
                  `}
                >
                  <span>{day.day}</span>
                  <span>
                    {day.open} – {day.close}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Open/Closed Status */}
          <div className="mt-6 text-center lg:text-left">
            {open === null ? (
              <span className="px-5 py-2 bg-gray-400 text-white rounded-lg font-semibold text-base sm:text-lg shadow">
                ⏳ Checking status...
              </span>
            ) : open ? (
              <span className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold text-base sm:text-lg shadow">
                ✅ We are OPEN now
              </span>
            ) : (
              <span className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold text-base sm:text-lg shadow">
                ❌ Sorry, we are CLOSED
              </span>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-4"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Send us a Message
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500"
            rows={5}
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto px-6 py-3 rounded-md text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p className="mt-3 text-sm font-medium text-center sm:text-left">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
