export default function Reviews() {
  const reviews = [
    {
      name: "Ramesh Kumar",
      text: "The mango pickle tastes exactly like homemade! Very fresh and authentic.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      text: "Loved the chicken pickle. Perfect spice and great quality packaging.",
      rating: 5,
    },
    {
      name: "Anjali Reddy",
      text: "Podis are amazing! Feels like my grandma made them.",
      rating: 4,
    },
    {
      name: "Kiran Rao",
      text: "Very hygienic and fresh. Will definitely order again.",
      rating: 5,
    },
    {
      name: "Suresh Naidu",
      text: "Good quality but delivery can be faster. Taste is excellent.",
      rating: 4,
    },
  ];

  return (
    <section className="bg-cream py-14">

      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            💬 What Our Customers Say
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Real reviews from people who love our pickles
          </p>
        </div>

        {/* REVIEWS SCROLL */}
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">

          {reviews.map((item, i) => (
            <div
              key={i}
              className="
                min-w-[260px] sm:min-w-[300px]
                bg-white
                border border-gray-100
                rounded-2xl
                p-5
                shadow-sm
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl
              "
            >

              {/* RATING */}
              <div className="text-yellow-500 text-sm mb-2">
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </div>

              {/* TEXT */}
              <p className="text-gray-700 text-sm leading-relaxed">
                "{item.text}"
              </p>

              {/* NAME */}
              <p className="mt-4 text-sm font-semibold text-gray-900">
                — {item.name}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}