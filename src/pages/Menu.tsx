import { useState } from "react";
import ProductCard from "../components/ProductCard";

// 📌 Caribbean Menu
const caribbeanFavourites = [
  { id: 1, name: "Curry Goat", price: 9.5, image: "/images/menu/Curry goat.jpg" },
  { id: 2, name: "Oxtail", price: 9.5, image: "/images/menu/Oxtail.jpg" },
  { id: 3, name: "Jerk Chicken", price: 9.5, image: "/images/menu/JERK CHICKEN.jpg" },
  { id: 4, name: "Fried Chicken", price: 9.5, image: "/images/menu/fried chicken.jpg" },
  { id: 5, name: "Stew Chicken", price: 9.5, image: "/images/menu/stew chicken.jpg" },
  { id: 6, name: "Chicken Curry", price: 9.5, image: "/images/menu/Curry chicken.jpg" },
  { id: 7, name: "Ackee & Saltfish", price: 8.5, image: "/images/menu/ackee & saltfish.jpg" },
  { id: 8, name: "Cow Foot", price: 9.5, image: "/images/menu/cow foot.jpg" },
  { id: 9, name: "Stewed Prawns", price: 7.95, image: "/images/menu/stewed prawns.jpg" },
  { id: 10, name: "Soup", price: 6.5, image: "/images/menu/soup.jpg" },
  { id: 11, name: "Sea Bass", price: 6.5, image: "/images/menu/sea bass.jpg" },
];

const caribbeanSnacks = [
  { id: 12, name: "Fried Dumplings", price: 2.5, image: "/images/menu/fried dumplings.jpg" },
  { id: 13, name: "Festival", price: 2.5, image: "/images/menu/festival.jpg" },
  { id: 14, name: "Fritters", price: 4.0, image: "/images/menu/fritters.jpg" },
  { id: 15, name: "Plantain", price: 4.0, image: "/images/menu/plantain.jpg" },
];

// 📌 African Menu
const africanSoups = [
  { id: 16, name: "Afang Soup", price: 15.0, image: "/images/menu/afang.jpg" },
  { id: 17, name: "Egusi Soup", price: 15.0, image: "/images/menu/egusi.jpg" },
  { id: 18, name: "Ogbono Soup", price: 15.0, image: "/images/menu/ogbono soup.jpg" },
  { id: 19, name: "Okra Soup", price: 15.0, image: "/images/menu/Okra soup.jpg" },
  { id: 20, name: "Pepper Soup", price: 13.0, image: "/images/menu/peppersoup.jpg" },
];

const africanSwallows = [
  { id: 21, name: "Amala", price: 4.5, image: "/images/menu/amala.jpg" },
  { id: 22, name: "Eba", price: 4.5, image: "/images/menu/eba.jpg" },
  { id: 23, name: "Poundo", price: 4.5, image: "/images/menu/poundo.jpg" },
  { id: 24, name: "Semolina", price: 4.5, image: "/images/menu/semolina.jpg" },
  { id: 25, name: "Plantain Fufu", price: 4.5, image: "/images/menu/plantain fufu.jpg" },
];

const africanDelights = [
  { id: 26, name: "Rice & Peas", price: 8.5, image: "/images/menu/rice&peas.jpg" },
  { id: 27, name: "Jollof Rice", price: 7.0, image: "/images/menu/jollof_Rice_with_Stew.jpg" },
  { id: 28, name: "Fried Rice", price: 7.0, image: "/images/menu/fried rice.jpg" },
  { id: 29, name: "Fried Yam", price: 6.0, image: "/images/menu/fried yam.jpg" },
  { id: 30, name: "Plantain", price: 4.0, image: "/images/menu/plantain2.jpg" },
  { id: 31, name: "Moi Moi", price: 4.0, image: "/images/menu/moimoi.jpg" },
  { id: 32, name: "White Rice", price: 3.5, image: "/images/menu/white rice.jpg" },
];

// 📌 Seafood (Special)
const seafood = [
  { id: 33, name: "Crayfish", price: 0, image: "/images/menu/crayfishb.jpg"} 
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState("Caribbean Favourites");

  const tabs = [
    "Caribbean Favourites",
    "Snacks & Sides",
    "Soups with Assorted Meat/Fish",
    "Swallows & Sides",
    "African Delights",
    "Seafood", // ✅ new tab
  ];

  const getMenuItems = () => {
    switch (activeTab) {
      case "Caribbean Favourites": return caribbeanFavourites;
      case "Snacks & Sides": return caribbeanSnacks;
      case "Soups with Assorted Meat/Fish": return africanSoups;
      case "Swallows & Sides": return africanSwallows;
      case "African Delights": return africanDelights;
      case "Seafood": return seafood; // ✅ handle new tab
      default: return [];
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-red-600">
        Our Menu 🍴
      </h2>

      {/* 🔹 Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-semibold shadow-md transition ${
              activeTab === tab
                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-red-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔹 Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getMenuItems().map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            hidePrice={activeTab === "Seafood"} // ✅ hide price for seafood
          />
        ))}
      </div>

      {/* 🔹 Seafood special note */}
      {activeTab === "Seafood" && (
        <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg text-center">
          <p className="font-semibold">
            ⚠️ Special Note: Crayfish orders are delivered directly from Nigeria 🇳🇬.  
            Please allow extra delivery time before it reaches the UK 🇬🇧.
          </p>
          <p className="text-lg font-semibold text-red-600">
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
