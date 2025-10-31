import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { CartItem } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-600">Your Cart is Empty 🛒</h2>
        <p className="mb-6 text-gray-600">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          to="/menu"
          className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-4xl font-extrabold mb-8 text-red-600">Your Cart 🛒</h2>

      <ul className="space-y-4">
        {cart.map((item: CartItem) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-white shadow-md rounded-lg p-5 border border-gray-100 hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">£{item.price.toFixed(2)} each</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-0">
              <button
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity === 1}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-base sm:text-lg font-bold transition ${
                  item.quantity === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                -
              </button>
              <span className="text-base sm:text-lg font-semibold min-w-[2rem] text-center">{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 text-base sm:text-lg font-bold transition"
              >
                +
              </button>
            </div>

            {/* Total per item + remove */}
            <div className="flex flex-col items-end">
              <p className="font-semibold text-gray-800">
                £{(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 font-medium hover:text-red-800 transition text-sm mt-1"
              >
                Remove ❌
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total & Actions */}
      <div className="mt-10 bg-gray-50 border-t-4 border-red-600 rounded-lg p-6 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Total: <span className="text-red-600">£{total.toFixed(2)}</span>
          </h3>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={clearCart}
              className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Clear Cart
            </button>
            <Link
              to="/checkout"
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition font-semibold"
            >
              Proceed to Checkout ➡️
            </Link>
          </div>
        </div>
      </div>

      {/* Delivery Platforms */}
      <div className="mt-10 text-center space-y-4">
        <p className="text-lg font-semibold text-gray-700">
          Get Your Meal Delivered To your Doorstep
        </p>
        <div className="flex flex-wrap justify-center gap-4">
         
          <a
            href="https://deliveroo.co.uk/menu/birmingham/YOUR-RESTAURANT-ID"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
          >
            🛵 Delivery Coming Soon
          </a>
         
        </div>
      </div>
    </div>
  );
}
