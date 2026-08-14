import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CategoryDetail() {

  const { category } = useParams();

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedSorts, setSelectedSorts] = useState([]);

  const [price, setPrice] = useState(1000);

  const [filterOpen, setFilterOpen] = useState(false);

  // ✅ FETCH CATEGORIES
  useEffect(() => {

    fetch("/api/products/categories/")
      .then((res) => res.json())
      .then((data) => {

        setCategories([
          { slug: "all", name: "All" },
          ...data
        ]);

      })
      .catch((err) => console.log(err));

  }, []);

  // ✅ FETCH PRODUCTS
  useEffect(() => {

    fetch("/api/products/")
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);

      })
      .catch((err) => console.log(err));

  }, []);

  // ✅ FILTER PRODUCTS
  let filtered = products.filter((p) => {

    return (
      (category === "all" ||
        p.category.slug === category) &&
      Number(p.price_per_kg) <= price
    );

  });

  // ✅ SORT PRODUCTS
  if (selectedSorts.length > 0) {

    filtered = [...filtered].sort((a, b) => {

      if (selectedSorts.includes("latest")) {
        return new Date(b.created_at) - new Date(a.created_at);
      }

      if (selectedSorts.includes("low")) {
        return Number(a.price_per_kg) - Number(b.price_per_kg);
      }

      if (selectedSorts.includes("high")) {
        return Number(b.price_per_kg) - Number(a.price_per_kg);
      }

      if (selectedSorts.includes("rating")) {
        return b.rating - a.rating;
      }

      return 0;

    });

  }

  // ✅ TOGGLE SORT
  const toggleSort = (value) => {

    setSelectedSorts((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );

  };

  return (

    <section className="bg-cream min-h-screen py-6">

      <div className="max-w-7xl mx-auto px-3">

        {/* 🔥 MOBILE TOP */}
        <div className="md:hidden mb-4">

          <div className="flex justify-between items-center mb-3">

            <h2 className="text-sm font-semibold capitalize">
              {category} Products
            </h2>

            <button
              onClick={() => setFilterOpen(true)}
              className="bg-white px-3 py-1.5 rounded-full text-xs shadow border hover:border-primary"
            >
              🔍 Filters
            </button>

          </div>

          {/* CATEGORY SCROLL */}
          <div className="overflow-x-auto scrollbar-hide">

            <div className="flex gap-2 w-max">

              {categories.map((cat) => (

                <button
                  key={cat.slug}
                  onClick={() =>
                    navigate(`/category/${cat.slug}`)
                  }
                  className={`
                    px-4 py-2 rounded-full text-xs whitespace-nowrap border transition

                    ${
                      category === cat.slug
                        ? "bg-primary text-white border-primary"
                        : "bg-white border-gray-200"
                    }
                  `}
                >
                  {cat.name}
                </button>

              ))}

            </div>

          </div>

        </div>

        {/* 🔥 MAIN */}
        <div className="flex gap-6">

          {/* ✅ SIDEBAR */}
          <div className="hidden md:block w-64 shrink-0">

            <div className="sticky top-24 space-y-5">

              {/* CATEGORIES */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">

                <h3 className="text-sm font-semibold mb-3">
                  Categories
                </h3>

                <div className="space-y-2">

                  {categories.map((cat) => (

                    <div
                      key={cat.slug}
                      onClick={() =>
                        navigate(`/category/${cat.slug}`)
                      }
                      className={`
                        px-4 py-2 rounded-xl text-sm cursor-pointer transition

                        ${
                          category === cat.slug
                            ? "bg-primary text-white"
                            : "hover:bg-orange-50"
                        }
                      `}
                    >
                      {cat.name}
                    </div>

                  ))}

                </div>

              </div>

              {/* PRICE */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">

                <h3 className="text-sm font-semibold mb-3">
                  Price
                </h3>

                <input
                  type="range"
                  min="100"
                  max="1000"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  className="w-full accent-orange-500"
                />

                <p className="text-sm mt-2 text-primary font-semibold">
                  Up to ₹{price}
                </p>

              </div>

              {/* SORT */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">

                <h3 className="text-sm font-semibold mb-3">
                  Sort By
                </h3>

                {[
                  { label: "Latest", value: "latest" },
                  { label: "Low → High", value: "low" },
                  { label: "High → Low", value: "high" },
                  { label: "Top Rated", value: "rating" },
                ].map((item) => (

                  <div
                    key={item.value}
                    onClick={() =>
                      toggleSort(item.value)
                    }
                    className="flex items-center gap-3 mb-3 cursor-pointer"
                  >

                    <div
                      className={`
                        w-5 h-5 rounded border flex items-center justify-center

                        ${
                          selectedSorts.includes(item.value)
                            ? "bg-primary border-primary"
                            : "border-gray-300"
                        }
                      `}
                    >

                      {selectedSorts.includes(item.value) && (
                        <span className="text-white text-xs">
                          ✓
                        </span>
                      )}

                    </div>

                    <span className="text-sm">
                      {item.label}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* ✅ PRODUCTS */}
          <div className="flex-1">

            {/* DESKTOP HEADER */}
            <div className="hidden md:flex justify-between items-center mb-6">

              <h2 className="text-xl font-semibold capitalize">
                {category} Products
              </h2>

              <span className="text-sm text-gray-500">
                {filtered.length} items
              </span>

            </div>

            {/* ✅ PRODUCTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {filtered.map((item) => (

                <div
                  key={item.id}
                  className="
                    group
                    bg-white rounded-3xl border
                    p-4 text-center
                    hover:-translate-y-2
                    hover:shadow-2xl
                    transition relative
                  "
                >

                  {/* IMAGE */}
                  <div className="h-40 flex items-center justify-center bg-white rounded-2xl mb-3 overflow-hidden">

                    <img
                      src={
                        item.image
                          ? item.image
                          : "/logo.png"
                      }
                      alt={item.name}
                      className="
                        w-full
                        h-full
                        object-contain
                        p-2
                        group-hover:scale-105
                        transition
                      "
                    />

                  </div>

                  {/* NAME */}
                  <h3 className="text-sm font-medium text-gray-800 text-center line-clamp-1">
                    {item.name}
                  </h3>

                  {/* PRICE */}
                  <p className="text-primary font-semibold text-sm mt-1 text-center">
                    ₹{item.price_per_kg}/KG
                  </p>

                  {/* RATING */}
                  <div className="flex justify-center gap-1 text-xs mt-1">

                    <span className="text-yellow-500">
                      {"★".repeat(Math.floor(item.rating))}
                    </span>

                    <span className="text-gray-500">
                      ({item.rating})
                    </span>

                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      navigate(`/product/${item.id}`)
                    }
                    className="
                      mt-4 w-full
                      bg-primary/10 text-primary
                      py-2 rounded-full text-sm
                      hover:bg-primary hover:text-white
                      transition
                    "
                  >
                    View Product
                  </button>

                  {/* GLOW EFFECT */}
                  <div
                    className="
                      absolute inset-0 rounded-3xl
                      opacity-0 group-hover:opacity-100
                      transition
                      bg-gradient-to-tr
                      from-orange-100/40
                      via-transparent
                      to-orange-200/40
                      pointer-events-none
                    "
                  />

                </div>

              ))}

            </div>

            {/* EMPTY */}
            {filtered.length === 0 && (

              <div className="bg-white rounded-3xl p-10 text-center mt-5">

                <img
                  src="/logo.png"
                  className="w-20 mx-auto opacity-40"
                />

                <h3 className="mt-4 text-lg font-semibold text-gray-700">
                  No Products Found
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Try changing filters or category
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

      {/* 🔥 MOBILE FILTER MODAL */}
      {filterOpen && (

        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">

          <div className="bg-white w-full rounded-t-3xl p-5">

            <div className="flex justify-between items-center mb-5">

              <h3 className="font-semibold">
                Filters
              </h3>

              <button
                onClick={() => setFilterOpen(false)}
              >
                ✕
              </button>

            </div>

            {/* PRICE */}
            <div className="mb-5">

              <h4 className="text-sm font-medium mb-2">
                Price
              </h4>

              <input
                type="range"
                min="100"
                max="1000"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="w-full accent-orange-500"
              />

              <p className="text-sm text-primary mt-2">
                ₹{price}
              </p>

            </div>

            {/* SORT */}
            <div>

              <h4 className="text-sm font-medium mb-3">
                Sort By
              </h4>

              {[
                { label: "Latest", value: "latest" },
                { label: "Low → High", value: "low" },
                { label: "High → Low", value: "high" },
                { label: "Top Rated", value: "rating" },
              ].map((item) => (

                <div
                  key={item.value}
                  onClick={() =>
                    toggleSort(item.value)
                  }
                  className="flex items-center gap-3 mb-3 cursor-pointer"
                >

                  <div
                    className={`
                      w-5 h-5 rounded border flex items-center justify-center

                      ${
                        selectedSorts.includes(item.value)
                          ? "bg-primary border-primary"
                          : "border-gray-300"
                      }
                    `}
                  >

                    {selectedSorts.includes(item.value) && (
                      <span className="text-white text-xs">
                        ✓
                      </span>
                    )}

                  </div>

                  <span className="text-sm">
                    {item.label}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      )}

    </section>
  );
}
