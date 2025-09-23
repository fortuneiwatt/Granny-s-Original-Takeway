import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg text-center">
        <h1 className="text-4xl font-extrabold text-green-600 mb-4">
          ✅ Payment Successful!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Thank you for your order with{" "}
          <span className="font-semibold text-red-600">
            African Caribbean Fusion
          </span>
          .  
          Your delicious food will be prepared and delivered soon 🍲.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/menu"
            className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition font-semibold"
          >
            🍴 Browse More Meals
          </Link>
          <Link
            to="/"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-gray-300 transition font-semibold"
          >
            🏠 Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
