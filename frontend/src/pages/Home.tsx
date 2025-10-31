export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ================= HERO SECTION ================= */}
      <div className="min-h-screen flex flex-col">
  {/* ================= HERO SECTION ================= */}
  <section
    className="relative bg-cover bg-center min-h-[80vh] md:min-h-screen flex items-center justify-center text-center text-white"
    style={{
      backgroundImage:
        "url('./images/menu/africanwoman.jpg')",
    }}
  >
    <div className="absolute inset-0 bg-black/70"></div>
    <div className="relative z-10 px-4 sm:px-6 md:px-8 max-w-2xl md:max-w-3xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
        Welcome to African Caribbean Fusion at Granny’s Original Takeaway
      </h1>
      <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 drop-shadow-md">
        Relax, indulge, and savor authentic African & Caribbean flavors — crafted
        with love, served with warmth.
      </p>
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <a
          href="/menu"
          className="px-5 py-3 sm:px-6 sm:py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold shadow-md text-sm sm:text-base"
        >
          View Menu
        </a>
        <a
          href="/checkout"
          className="px-5 py-3 sm:px-6 sm:py-3 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black font-semibold shadow-md text-sm sm:text-base"
        >
          Order Now
        </a>
      </div>
    </div>
  </section>

  {/* ================= ABOUT SECTION ================= */}
  <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
        alt="Delicious Caribbean Dish"
        className="rounded-xl shadow-lg w-full object-cover h-64 sm:h-80 md:h-[400px]"
      />
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-6">
          A Fusion of Culture & Taste
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 leading-relaxed">
          At <span className="font-semibold">African Caribbean Fusion</span>, we
          bring you the bold spices of Africa blended with the rich traditions
          of the Caribbean. Our meals are freshly prepared with passion,
          ensuring every bite is both comforting and exciting.
        </p>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Whether it’s our famous <em>Jollof Rice</em>, a savory{" "}
          <em>Curry Goat</em>, or sweet fried <em>Plantain</em>, you’ll
          experience flavors that feel like home — even if it’s your first time.
          Bold flavors,True Heritage,colors of culture rooted in motherland.
        </p>
        <div className="mt-5 sm:mt-6">
          <a
            href="/menu"
            className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-md text-sm sm:text-base"
          >
            Explore Menu
          </a>
        </div>
      </div>
    </div>
  </section>
</div>

      {/* ================= FEATURED DISHES ================= */}
<section className="bg-gray-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
  <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800">
      Featured Dishes
    </h2>
    <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed">
      A taste of our customer favorites, made with love & tradition.
    </p>
  </div>

  {/* Grid Section */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    {/* Dish 1 */}
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
      <img
        src="/images/menu/jollof.jpg"
        alt="Jollof Rice"
        className="h-48 sm:h-56 md:h-64 w-full object-cover"
      />
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
          Jollof Rice
        </h3>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Smoky, spicy, and flavorful West African rice cooked to perfection.
        </p>
      </div>
    </div>

    {/* Dish 2 */}
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
      <img
        src="/images/menu/Curry goat.jpg"
        alt="Curry Goat"
        className="h-48 sm:h-56 md:h-64 w-full object-cover"
      />
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
          Curry Goat
        </h3>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Tender goat meat simmered in a rich Caribbean curry sauce.
        </p>
      </div>
    </div>

    {/* Dish 3 */}
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
      <img
        src="/images/menu/plantain2.jpg"
        alt="Fried Plantain & Stew"
        className="h-48 sm:h-56 md:h-64 w-full object-cover"
      />
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
          Fried Plantain
        </h3>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Sweet golden plantains, lightly fried for the perfect side dish.
        </p>
      </div>
    </div>
  </div>

  {/* Button */}
  <div className="text-center mt-8 sm:mt-10 lg:mt-12">
    <a
      href="/menu"
      className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-semibold shadow-md text-sm sm:text-base transition"
    >
      See Full Menu
    </a>
  </div>
</section>
    </div>
  );
}
