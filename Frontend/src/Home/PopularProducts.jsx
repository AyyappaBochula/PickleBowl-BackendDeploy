// import { useNavigate } from "react-router-dom";

// export default function PopularProducts() {
//   const navigate = useNavigate();

//   // ✅ ADD ID + FIX PRICE FORMAT
//   const products = [
//     { id: 1, name: "Mango Pickle", price: 299, rating: 4.5, img: "/products/mango.png" },
//     { id: 2, name: "Chicken Pickle", price: 599, rating: 4.7, img: "/products/chicken.png" },
//     { id: 3, name: "Prawn Pickle", price: 799, rating: 4.8, img: "/products/prawn.png" },
//     { id: 4, name: "Garlic Pickle", price: 599, rating: 4.3, img: "/products/garlic.png" },
//     { id: 5, name: "Gongura Pickle", price: 349, rating: 4.4, img: "/products/gongura.png" },
//     { id: 6, name: "Karivepaku Podi", price: 199, rating: 4.3, img: "/products/podi.png" },
//     { id: 7, name: "Mango Thokku Pickle", price: 399, rating: 4.3, img: "/products/mangothokku.png" },
//     { id: 8, name: "Ginger Pickle", price: 599, rating: 4.3, img: "/products/ginger.png" },
//   ];

//   return (
//     <section className="bg-cream py-14">

//       <div className="max-w-6xl mx-auto px-4">

//         {/* DESKTOP HEADER */}
//         <div className="hidden md:flex justify-between items-center mb-8">

//           <div className="flex items-center gap-3">
//             <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
//               Trending
//             </span>

//             <h2 className="text-xl md:text-2xl font-bold text-gray-900">
//               Popular Products
//             </h2>
//           </div>

//           <button
//             onClick={() => navigate("/category/all")}
//             className="bg-white border px-4 py-1.5 rounded-full text-sm hover:border-primary hover:text-primary transition"
//           >
//             View All →
//           </button>

//         </div>

//         {/* MOBILE HEADER */}
//         <div className="md:hidden mb-6 bg-white rounded-2xl shadow-soft p-4">

//           <div className="flex flex-col items-center text-center gap-2">

//             <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
//               Trending
//             </span>

//             <h2 className="text-lg font-semibold">
//               Popular Products
//             </h2>

//             <button
//               onClick={() => navigate("/category/all")}
//               className="mt-2 text-xs bg-primary text-white px-4 py-1.5 rounded-full"
//             >
//               View All →
//             </button>

//           </div>

//         </div>

//         {/* PRODUCTS */}
//         <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">

//           {products.map((item) => (
//             <div
//               key={item.id}
//               className="group min-w-[180px] sm:min-w-[220px] bg-white rounded-3xl border p-4 text-center hover:-translate-y-2 hover:shadow-2xl transition relative"
//             >

//               {/* IMAGE */}
//               <div className="h-40 flex items-center justify-center bg-white rounded-2xl mb-3">
//                 <img
//                   src={item.img}
//                   alt={item.name}
//                   className="max-h-full object-contain group-hover:scale-105 transition"
//                 />
//               </div>

//               {/* NAME */}
//               <h3 className="text-sm font-medium text-gray-800">
//                 {item.name}
//               </h3>

//               {/* PRICE */}
//               <p className="text-primary font-semibold text-sm mt-1">
//                 ₹{item.price}/KG
//               </p>

//               {/* RATING */}
//               <div className="flex justify-center gap-1 text-xs mt-1">
//                 <span className="text-yellow-500">
//                   {"★".repeat(Math.floor(item.rating))}
//                 </span>
//                 <span className="text-gray-500">
//                   ({item.rating})
//                 </span>
//               </div>

//               {/* ✅ FIXED BUTTON */}
//               <button
//                 onClick={() => navigate(`/product/${item.id}`)}
//                 className="mt-4 w-full bg-primary/10 text-primary py-2 rounded-full text-sm hover:bg-primary hover:text-white transition"
//               >
//                 View Product
//               </button>

//               {/* GLOW */}
//               <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-tr from-orange-100/40 via-transparent to-orange-200/40 pointer-events-none" />

//             </div>
//           ))}

//         </div>

//       </div>
//     </section>
//   );
// }


import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PopularProducts() {

  const navigate = useNavigate();

  // ✅ API PRODUCTS
  const [products, setProducts] = useState([]);

  // ✅ FETCH POPULAR PRODUCTS
  useEffect(() => {

    fetch("/api/products/popular/")
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  // ✅ HIDE IF NO PRODUCTS
  if (products.length === 0) {
    return null;
  }

  return (

    <section className="bg-cream py-14">

      <div className="max-w-6xl mx-auto px-4">

        {/* DESKTOP HEADER */}
        <div className="hidden md:flex justify-between items-center mb-8">

          <div className="flex items-center gap-3">

            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
              Trending
            </span>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Popular Products
            </h2>

          </div>

          <button
            onClick={() => navigate("/category/all")}
            className="
              bg-white border px-4 py-1.5 rounded-full text-sm
              hover:border-primary hover:text-primary transition
            "
          >
            View All →
          </button>

        </div>

        {/* MOBILE HEADER */}
        <div className="md:hidden mb-6 bg-white rounded-2xl shadow-soft p-4">

          <div className="flex flex-col items-center text-center gap-2">

            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
              Trending
            </span>

            <h2 className="text-lg font-semibold">
              Popular Products
            </h2>

            <button
              onClick={() => navigate("/category/all")}
              className="
                mt-2 text-xs bg-primary text-white
                px-4 py-1.5 rounded-full
              "
            >
              View All →
            </button>

          </div>

        </div>

        {/* PRODUCTS */}
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">

          {products.map((item) => (

            <div
              key={item.id}
              className="
                group
                min-w-[180px] sm:min-w-[220px]
                bg-white rounded-3xl border
                p-4 text-center
                hover:-translate-y-2
                hover:shadow-2xl
                transition relative
              "
            >

              {/* IMAGE */}
              <div className="h-40 flex items-center justify-center bg-white rounded-2xl mb-3">

                <img
                  src={
                    item.image
                      ? item.image
                      : "/logo.png"
                  }
                  alt={item.name}
                  className="
                    max-h-full object-contain
                    group-hover:scale-105
                    transition
                  "
                />

              </div>

              {/* NAME */}
              <h3 className="text-sm font-medium text-gray-800">
                {item.name}
              </h3>

              {/* PRICE */}
              <p className="text-primary font-semibold text-sm mt-1">
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

      </div>

    </section>

  );
}
