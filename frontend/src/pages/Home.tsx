export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
            Welcome to African Carribbean Fusion at Granyy's Original Takeway
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-gray-200 drop-shadow">
            Relax, indulge, and savor authentic African & Caribbean flavors —
            crafted with love, served with warmth.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/menu"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold shadow-md"
            >
              View Menu
            </a>
            <a
              href="/checkout"
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black font-semibold shadow-md"
            >
              Order Now
            </a>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
            alt="Delicious Caribbean Dish"
            className="rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              A Fusion of Culture & Taste
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              At <span className="font-semibold">African Caribbean Fusion</span>,
              we bring you the bold spices of Africa blended with the rich
              traditions of the Caribbean. Our meals are freshly prepared with
              passion, ensuring every bite is both comforting and exciting.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether it’s our famous <em>Jollof Rice</em>, a savory{" "}
              <em>Curry Goat</em>, or sweet fried <em>Plantain</em>, you’ll
              experience flavors that feel like home — even if it’s your first
              time. Bold flavours.True Heritage
            </p>
            <div className="mt-6">
              <a
                href="/menu"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-md"
              >
                Explore Menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED DISHES ================= */}
      <section className="bg-gray-50 py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Featured Dishes
          </h2>
          <p className="text-gray-600 mt-4">
            A taste of our customer favorites, made with love & tradition.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Dish 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <img
              src="/images/menu/jollof_Rice_with_Stew.jpg" 
              alt="Jollof Rice"
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800">Jollof Rice</h3>
              <p className="text-gray-600 mt-2">
                Smoky, spicy, and flavorful West African rice cooked to
                perfection.
              </p>
            </div>
          </div>

          {/* Dish 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <img
              src="/images/menu/Curry goat.jpg" 
              alt="Curry Goat"
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800">Curry Goat</h3>
              <p className="text-gray-600 mt-2">
                Tender goat meat simmered in a rich Caribbean curry sauce.
              </p>
            </div>
          </div>

          {/* Dish 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <img
              src="/images/menu/plantain2.jpg" 
              alt="Fried Plantain & Stew"
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Fried Plantain
              </h3>
              <p className="text-gray-600 mt-2">
                Sweet golden plantains, lightly fried for the perfect side dish.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/menu"
            className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-semibold shadow-md"
          >
            See Full Menu
          </a>
        </div>
      </section>
    </div>
  );
}
