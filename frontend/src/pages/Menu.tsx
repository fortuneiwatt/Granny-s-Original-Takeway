import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

// 🧩 Type definitions
type VarietyItem = {
  name: string;
  price: number;
  image: string;
};

type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  varieties?: VarietyItem[];
};

// === MENU DATA ===

// 🥘 African Soups (with varieties)
const africanSoups: MenuItem[] = [
  {
    id: 1,
    name: "Afang Soup Meal",
    price: 0,
    image: "/images/menu/afang.jpg",
    varieties: [
      { name: "With Poundo", price: 15.0, image: "/images/menu/poundo.jpg" },
      { name: "With Eba", price: 15.0, image: "/images/menu/eba.jpg" },
      { name: "With Amala", price: 15.0, image: "/images/menu/amala.jpg" },
      { name: "With Semolina", price: 15.0, image: "/images/menu/semolina.jpg" },
      { name: "With Plantain Fufu", price: 15.0, image: "/images/menu/plantain_fufu.jpg" },
    ],
  },
  {
    id: 2,
    name: "Egusi Soup",
    price: 0,
    image: "/images/menu/egusi.jpg",
    varieties: [
      { name: "With Poundo", price: 15.0, image: "/images/menu/poundo.jpg" },
      { name: "With Eba", price: 15.0, image: "/images/menu/eba.jpg" },
      { name: "With Amala", price: 15.0, image: "/images/menu/amala.jpg" },
      { name: "With Semolina", price: 15.0, image: "/images/menu/semolina.jpg" },
      { name: "With Plantain Fufu", price: 15.0, image: "/images/menu/plantain_fufu.jpg" },
    ],
  },
  {
    id: 3,
    name: "Ogbono Soup",
    price: 0,
    image: "/images/menu/ogbono_soup.jpg",
    varieties: [
      { name: "With Poundo", price: 15.0, image: "/images/menu/poundo.jpg" },
      { name: "With Eba", price: 15.0, image: "/images/menu/eba.jpg" },
      { name: "With Amala", price: 15.0, image: "/images/menu/amala.jpg" },
      { name: "With Semolina", price: 15.0, image: "/images/menu/semolina.jpg" },
      { name: "With Plantain Fufu", price: 15.0, image: "/images/menu/plantain_fufu.jpg" },
    ],
  },
  {
    id: 4,
    name: "Okra Soup",
    price: 0,
    image: "/images/menu/Okra_soup.jpg",
    varieties: [
      { name: "With Poundo", price: 15.0, image: "/images/menu/poundo.jpg" },
      { name: "With Eba", price: 15.0, image: "/images/menu/eba.jpg" },
      { name: "With Amala", price: 15.0, image: "/images/menu/amala.jpg" },
      { name: "With Semolina", price: 15.0, image: "/images/menu/semolina.jpg" },
      { name: "With Plantain Fufu", price: 15.0, image: "/images/menu/plantain_fufu.jpg" },
    ],
  },
  {
    id: 5,
    name: "Pepper Soup",
    price: 0,
    image: "/images/menu/peppersoupp.jpg",
    varieties: [
      { name: "With White Rice", price: 15.0, image: "/images/menu/white_rice.jpg" },
    ],
  },
  {
    id: 6,
    name: "Edikaikong Soup",
    price: 0,
    image: "/images/menu/vegetablesoup.jpg",
    varieties: [
      { name: "With Poundo", price: 15.0, image: "/images/menu/poundo.jpg" },
      { name: "With Eba", price: 15.0, image: "/images/menu/eba.jpg" },
      { name: "With Amala", price: 15.0, image: "/images/menu/amala.jpg" },
      { name: "With Semolina", price: 15.0, image: "/images/menu/semolina.jpg" },
      { name: "With Plantain Fufu", price: 15.0, image: "/images/menu/plantain_fufu.jpg" },
    ],
  },
  {
    id: 22,
    name: "Fisherman Soup",
    price: 0,
    image: "/images/menu/fishermansoup.jpg",
    varieties: [
      { name: "With Poundo", price: 15.0, image: "/images/menu/poundo.jpg" },
      { name: "With Eba", price: 15.0, image: "/images/menu/eba.jpg" },
      { name: "With Amala", price: 15.0, image: "/images/menu/amala.jpg" },
      { name: "With Semolina", price: 15.0, image: "/images/menu/semolina.jpg" },
      { name: "With Plantain Fufu", price: 15.0, image: "/images/menu/plantain_fufu.jpg" },
    ],
  },
  {
    id: 23,
    name: "Bitterleaf Soup",
    price: 0,
    image: "/images/menu/bitterleaf_soup.jpg",
    varieties: [
      { name: "With Poundo", price: 15.0, image: "/images/menu/poundo.jpg" },
      { name: "With Eba", price: 15.0, image: "/images/menu/eba.jpg" },
      { name: "With Amala", price: 15.0, image: "/images/menu/amala.jpg" },
      { name: "With Semolina", price: 15.0, image: "/images/menu/semolina.jpg" },
      { name: "With Plantain Fufu", price: 15.0, image: "/images/menu/plantain_fufu.jpg" },
    ],
  },
];

// 🍚 African Delights
const africanDelights: MenuItem[] = [
  {
    id: 7,
    name: "White Rice",
    price: 0, // Keep normal price — just don’t show if 0
    image: "/images/menu/white_rice.jpg",
    varieties: [
      { name: "With Stew", price: 12.0, image: "/images/menu/stew.jpg" },
      { name: "With Pepper Soup", price: 12.0, image: "/images/menu/peppersoup.jpg" },
      { name: "With Curry Prawns", price: 12.0, image: "/images/menu/stewed_prawns.jpg" },
      { name: "With Fried Plantain & Stew", price: 12.0, image: "/images/menu/fried_plantain.jpg" },
      { name: "With Chicken Stew", price: 12.0, image: "/images/menu/chicken_stew.jpg" },
      { name: "With Fresh Fish Stew", price: 12.0, image: "/images/menu/fish_stew.jpg" },
    ],
  },
  {
    id: 8,
    name: "Jollof Rice",
    price: 10.75,
    image: "/images/menu/jollof.jpg",
    varieties: [
      { name: "With Fried Plantain", price: 13.0, image: "/images/menu/fried_plantain.jpg" },
      { name: "With Chicken", price: 13.0, image: "/images/menu/Curry_chicken.jpg" },
      { name: "With Curry Goat", price: 13.0, image: "/images/menu/Curry_goat.jpg" },
      { name: "With Jerk Chicken", price: 13.0, image: "/images/menu/JERK_CHICKEN.jpg" },
      { name: "With Chicken Stew", price: 13.0, image: "/images/menu/chicken_stew.jpg" },
      { name: "With Stewed Prawns", price: 13.0, image: "/images/menu/stewed_prawns.jpg" },
      { name: "With Fried Fish", price: 13.0, image: "/images/menu/fried_fish.jpg" },
      { name: "With Fried Meat", price: 13.0, image: "/images/menu/fried_meat.jpg" },
    ],
  },
  {
    id: 9,
    name: "Fried Rice",
    price: 10.75,
    image: "/images/menu/fried_rice.jpg",
    varieties: [
      { name: "With Fried Plantain", price: 13.0, image: "/images/menu/fried_plantain.jpg" },
      { name: "With Chicken", price: 13.0, image: "/images/menu/Curry_chicken.jpg" },
      { name: "With Curry Goat", price: 13.0, image: "/images/menu/Curry_goat.jpg" },
      { name: "With Jerk Chicken", price: 13.0, image: "/images/menu/JERK_CHICKEN.jpg" },
      { name: "With Stew Chicken", price: 13.0, image: "/images/menu/chicken_stew.jpg" },
      { name: "With Stewed Prawns", price: 13.0, image: "/images/menu/stewed_prawns.jpg" },
      { name: "With Fried Fish", price: 13.0, image: "/images/menu/fried_fish.jpg" },
      { name: "With Fried Meat", price: 13.0, image: "/images/menu/fried_meat.jpg" },
    ],
  },
  { id: 10, name: "Moi Moi", price: 7.75, image: "/images/menu/moimoi.jpg" },
  {
    id: 11,
    name: "Plantain",
    price: 7.75,
    image: "/images/menu/fried_plantain.jpg",
    varieties: [{ name: "With Stew", price: 10.0, image: "/images/menu/stew.jpg" }],
  },
  {
    id: 20,
    name: "Fried Yam",
    price: 7.75,
    image: "/images/menu/fried_yam.jpg",
    varieties: [{ name: "With Stew", price: 10.0, image: "/images/menu/stew.jpg" }],
  },
];

// 🍗 Caribbean Favourites
const caribbeanFavourites: MenuItem[] = [
  { id: 12, name: "Curry Goat", price: 12.5, image: "/images/menu/Curry_goat.jpg" },
  { id: 13, name: "Oxtail", price: 12.5, image: "/images/menu/Oxtail.jpg" },
  { id: 14, name: "Jerk Chicken", price: 12.5, image: "/images/menu/JERK_CHICKEN.jpg" },
  { id: 15, name: "Stew Chicken", price: 12.5, image: "/images/menu/stew_chicken.jpg" },
  { id: 21, name: "Seafood Combo", price: 12.5, image: "/images/menu/sea_food_combo.jpg" },
];

// 🍩 Caribbean Snacks
const caribbeanSnacks: MenuItem[] = [
  { id: 16, name: "Fried Dumplings", price: 5.5, image: "/images/menu/fried_dumplings.jpg" },
  { id: 17, name: "Festival", price: 5.5, image: "/images/menu/festival.jpg" },
  { id: 18, name: "Fritters", price: 7.75, image: "/images/menu/fritters.jpg" },
];

// 🌊 Seafood
const seafood: MenuItem[] = [
  { id: 19, name: "Crayfish", price: 0, image: "/images/menu/crayfishb.jpg" },
];

export default function Menu() {
  const { addToCart, cart } = useCart();
  const [activeTab, setActiveTab] = useState("African Soups");
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCartButton, setShowCartButton] = useState(false);

  // ✳️ Show floating cart when items are added
  useEffect(() => {
    if (cart.length > 0) setShowCartButton(true);
  }, [cart]);

  const handleAddToCart = (item: MenuItem, variety?: VarietyItem) => {
    const product = variety
      ? {
          id: `${item.id}-${variety.name}`,
          name: `${item.name} (${variety.name})`,
          price: variety.price,
          image: variety.image,
          quantity: 1,
        }
      : {
          id: `${item.id}`,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
        };

    addToCart(product);
    setToastMessage(`✅ Added ${product.name} to cart`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const tabs = [
    { name: "African Soups ", key: "African Soups", color: "from-green-700 to-green-500" },
    { name: "African Delights ", key: "African Delights", color: "from-green-700 to-green-500" },
    { name: "Caribbean Favourites ", key: "Caribbean Favourites", color: "from-yellow-500 to-green-600" },
    { name: "Caribbean Snacks ", key: "Caribbean Snacks", color: "from-yellow-500 to-green-600" },
    { name: "Seafood 🌊", key: "Seafood", color: "from-blue-600 to-cyan-400" },
  ];

  const getMenuItems = () => {
    switch (activeTab) {
      case "African Soups":
        return africanSoups;
      case "African Delights":
        return africanDelights;
      case "Caribbean Favourites":
        return caribbeanFavourites;
      case "Caribbean Snacks":
        return caribbeanSnacks;
      case "Seafood":
        return seafood;
      default:
        return [];
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-red-600 tracking-wide">
        Our Menu 🍴
      </h2>

      {/* 🌍 Sticky Category Tabs */}
      <div className="sticky top-0 z-40 bg-white py-3 border-b shadow-sm flex flex-wrap justify-center gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-xs sm:text-sm md:text-base rounded-full font-semibold shadow-md transition-transform transform hover:scale-105 ${
              activeTab === tab.key
                ? `bg-gradient-to-r ${tab.color} text-white`
                : "bg-gray-200 text-gray-800 hover:bg-red-100"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* 🧆 Meals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getMenuItems().map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-48 sm:h-56 md:h-64 w-full object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>

              {/* Hide £0.00 prices */}
              {item.price > 0 && (
                <p className="text-gray-600 mt-1 font-medium">£{item.price.toFixed(2)}</p>
              )}

              <button
                onClick={() => handleAddToCart(item)}
                className="mt-3 bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
              >
                Add to Cart
              </button>

              {/* 🍛 Varieties */}
              {item.varieties && (
                <div className="mt-4">
                  <button
                    onClick={() =>
                      setExpandedItem(expandedItem === item.id ? null : item.id)
                    }
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition shadow-md ${
                      expandedItem === item.id
                        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-red-600"
                    }`}
                  >
                    {expandedItem === item.id ? "Hide Varieties" : "🍽 See Varieties"}
                  </button>

                  {expandedItem === item.id && (
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {item.varieties.map((v, index) => (
                        <div
                          key={index}
                          onClick={() => handleAddToCart(item, v)}
                          className="cursor-pointer bg-yellow-50 hover:bg-yellow-100 rounded-xl shadow p-3 transition transform hover:scale-105"
                        >
                          <img
                            src={v.image}
                            alt={v.name}
                            className="h-40 w-full object-cover rounded-lg mb-3"
                          />
                          <h4 className="text-md font-semibold text-gray-800">{v.name}</h4>
                          <p className="text-gray-600 text-sm">£{v.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fade-in-out z-50">
          {toastMessage}
        </div>
      )}

      {/* 🛒 Floating Cart Button */}
      {showCartButton && (
        <Link
          to="/cart"
          className="fixed bottom-6 right-6 bg-gradient-to-r from-red-600 to-orange-500 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 hover:opacity-90 transition z-50"
        >
          🛒 <span className="font-semibold">{cart.length}</span>
        </Link>
      )}

      {/* 🦞 Seafood Special Note */}
      {activeTab === "Seafood" && (
        <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg text-center">
          <p className="font-semibold">
            ⚠️ Special Note: Crayfish orders are delivered directly from Nigeria .  
            Please allow extra delivery time before it reaches the UK .
          </p>
          <p className="text-lg font-semibold text-red-600 mt-2">
            📞 For inquiries, call/WhatsApp:{" "}
            <a
              href="tel:+2348068221929"
              className="underline hover:text-red-800"
            >
              +234 806 822 1929
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
