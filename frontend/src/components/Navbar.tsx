import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-xl sm:text-2xl font-extrabold tracking-wide">
          🍲 African Caribbean Fusion
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition ${
                isActive ? "bg-white text-red-600" : "hover:bg-red-700"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition ${
                isActive ? "bg-white text-red-600" : "hover:bg-red-700"
              }`
            }
          >
            🍛 Menu
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition ${
                isActive ? "bg-white text-red-600" : "hover:bg-red-700"
              }`
            }
          >
            💳 Checkout
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition ${
                isActive ? "bg-white text-red-600" : "hover:bg-red-700"
              }`
            }
          >
            📞 Contact
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative px-3 py-2 rounded-lg transition ${
                isActive ? "bg-white text-red-600" : "hover:bg-red-700"
              }`
            }
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-red-700 text-white px-4 py-3 space-y-3">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded hover:bg-red-800"
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded hover:bg-red-800"
          >
            🍛 Menu
          </NavLink>
          <NavLink
            to="/checkout"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded hover:bg-red-800"
          >
            💳 Checkout
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded hover:bg-red-800"
          >
            📞 Contact
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded hover:bg-red-800 relative"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute top-1 right-4 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      )}
    </nav>
  );
}
