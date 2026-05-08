// import { useNavigate } from "react-router-dom";

// export default function Categories() {
//   const navigate = useNavigate();

//   const categories = [
//     { name: "Veg Pickles", img: "/categories/veg.png", path: "/category/veg" },
//     { name: "Non-Veg Pickles", img: "/categories/nonveg.png", path: "/category/nonveg" },
//     { name: "Podis", img: "/categories/podis.png", path: "/category/podis" },
//     { name: "Sweets", img: "/categories/sweets.png", path: "/category/sweets" },
//     { name: "Snacks", img: "/categories/snacks.png", path: "/category/snacks" },
//     { name: "Vadiyalu", img: "/categories/pappad.png", path: "/category/vadiyalu" },
//     { name: "Combos", img: "/categories/combos.png", path: "/category/combos" },
//   ];

//   return (
//     <section className="bg-cream py-12">

//       <div className="max-w-6xl mx-auto px-4">

//         {/* HEADER */}
//         <div className="mb-10 text-center md:text-left">
//           <h2 className="text-xl md:text-3xl font-semibold text-gray-900">
//             Shop by Categories
//           </h2>
//           <p className="text-sm text-gray-600 mt-1">
//             Explore our homemade collections
//           </p>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-3 gap-x-4 gap-y-10 md:grid-cols-7 md:gap-y-12">

//           {categories.map((cat, i) => (
//             <div
//               key={i}
//               onClick={() => navigate(cat.path)}
//               className={`
//                 flex flex-col items-center gap-3 cursor-pointer group
//                 transition-all duration-300

//                 ${i === 6 ? "col-span-3 flex justify-center md:col-span-1" : ""}
//               `}
//             >

//               {/* ✅ RESPONSIVE CIRCLE */}
//               <div
//                 className="
//                   w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32
//                   rounded-full
//                   border-2 border-orange-400
//                   bg-white
//                   flex items-center justify-center

//                   shadow-sm
//                   transition-all duration-300

//                   group-hover:-translate-y-2
//                   group-hover:border-orange-500
//                   group-hover:shadow-xl
//                 "
//               >
//                 <img
//                   src={cat.img}
//                   alt={cat.name}
//                   className="
//                     w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20
//                     object-contain
//                     transition-transform duration-300
//                     group-hover:scale-105
//                   "
//                 />
//               </div>

//               {/* TEXT */}
//               <p
//                 className="
//                   text-sm sm:text-base md:text-lg
//                   font-medium
//                   text-gray-800
//                   text-center
//                   transition-all duration-300

//                   group-hover:text-orange-500
//                   group-hover:-translate-y-1
//                 "
//               >
//                 {cat.name}
//               </p>

//             </div>
//           ))}

//         </div>

//       </div>
//     </section>
//   );
// }


import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Categories() {

  const navigate = useNavigate();

  // ✅ API DATA
  const [categories, setCategories] = useState([]);

  // ✅ FETCH CATEGORIES
  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/products/categories/")
      .then((res) => res.json())
      .then((data) => {

        setCategories(data);

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <section className="bg-cream py-14">

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-12 text-center">

          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Shop by Categories
          </h2>

          <p className="text-sm md:text-base text-gray-600 mt-2">
            Explore our homemade collections
          </p>

        </div>

        {/* CATEGORIES */}
        <div
          className="
            flex flex-wrap
            justify-center
            gap-x-6 gap-y-10
            md:gap-x-10 md:gap-y-14
          "
        >

          {categories.map((cat) => (

            <div
              key={cat.id}
              onClick={() =>
                navigate(`/category/${cat.slug}`)
              }
              className="
                flex flex-col items-center
                cursor-pointer group
                w-[100px] sm:w-[130px] md:w-[150px]
                transition-all duration-300
              "
            >

              {/* IMAGE BOX */}
              <div
                className="
                  w-20 h-20
                  sm:w-28 sm:h-28
                  md:w-36 md:h-36

                  rounded-full
                  border-2 border-orange-300
                  bg-white

                  flex items-center justify-center

                  shadow-md
                  transition-all duration-300

                  group-hover:-translate-y-2
                  group-hover:shadow-2xl
                  group-hover:border-primary
                "
              >

                <img
                  src={
                    cat.image
                      ? cat.image
                      : "/logo.png"
                  }
                  alt={cat.name}
                  className="
                    w-12 h-12
                    sm:w-16 sm:h-16
                    md:w-24 md:h-24

                    object-contain

                    transition-all duration-300
                    group-hover:scale-110
                  "
                />

              </div>

              {/* CATEGORY NAME */}
              <h3
                className="
                  mt-4
                  text-center
                  text-sm sm:text-base md:text-lg
                  font-semibold
                  text-gray-800

                  leading-tight

                  transition-all duration-300

                  group-hover:text-primary
                "
              >
                {cat.name}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}