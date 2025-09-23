import React, { useState } from "react";
import { useCart } from "../context/CartContext";

type Item = { id: number; name: string; price: number; image: string };

export default function ProductCard({
  item,
  hidePrice = false,
}: {
  item: Item;
  hidePrice?: boolean;
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white flex flex-col">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="font-semibold text-xl mb-2">{item.name}</h3>

      {!hidePrice && (
        <p className="text-gray-700 mb-3">£{item.price.toFixed(2)}</p>
      )}

      <button
        onClick={handleAdd}
        disabled={added}
        className={`mt-auto px-4 py-2 rounded transition font-medium ${
          added
            ? "bg-green-600 text-white cursor-not-allowed"
            : "bg-black text-white hover:bg-red-600"
        }`}
      >
        {added ? "✅ Added!" : "Add to Cart"}
      </button>
    </div>
  );
}
