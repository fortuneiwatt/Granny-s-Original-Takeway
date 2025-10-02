import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg text-center">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">
          ❌ Payment Cancelled
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Your payment was cancelled. Don’t worry, your cart is still saved 🛒.  
          You can try again whenever you’re ready.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/checkout"
            className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition font-semibold"
          >
            🔄 Return to Checkout
          </Link>
          <Link
            to="/menu"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-gray-300 transition font-semibold"
          >
            🍴 Continue Browsing Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
