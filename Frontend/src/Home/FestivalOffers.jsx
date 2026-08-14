// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function FestivalOffers() {
//   const navigate = useNavigate();

//   // ✅ ADD ID HERE
//   const products = [
//     { id: 1, name: "Mango Pickle", price: 299, rating: 4.5, img: "/products/mango.png" },
//     { id: 2, name: "Chicken Pickle", price: 599, rating: 4.7, img: "/products/chicken.png" },
//     { id: 3, name: "Prawn Pickle", price: 799, rating: 4.8, img: "/products/prawn.png" },
//     { id: 4, name: "Garlic Pickle", price: 599, rating: 4.3, img: "/products/garlic.png" },
//     { id: 5, name: "Gongura Pickle", price: 349, rating: 4.4, img: "/products/gongura.png" },
//     { id: 6, name: "Karivepaku Podi", price: 199, rating: 4.3, img: "/products/podi.png" },
//   ];

//   // ⏳ TIMER
//   const endTime = new Date();
//   endTime.setHours(endTime.getHours() + 48);

//   const [timeLeft, setTimeLeft] = useState(getTime());

//   function getTime() {
//     const now = new Date();
//     const diff = endTime - now;

//     return {
//       days: Math.floor(diff / (1000 * 60 * 60 * 24)),
//       hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
//       mins: Math.floor((diff / (1000 * 60)) % 60),
//       secs: Math.floor((diff / 1000) % 60),
//     };
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft(getTime());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="bg-cream py-14">

//       <div className="max-w-6xl mx-auto px-4">

//         {/* HEADER */}
//         <div className="mb-8">

//           {/* DESKTOP */}
//           <div className="hidden md:flex md:items-center md:justify-between gap-4">

//             <div className="flex items-center gap-3">
//               <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
//                 🪔 Sankranthi Sale
//               </span>

//               <h2 className="text-xl md:text-2xl font-bold text-gray-900">
//                 Festival Specials
//               </h2>
//             </div>

//             <div className="flex gap-2 text-xs md:text-sm font-medium">
//               {["days", "hours", "mins", "secs"].map((unit, i) => (
//                 <div
//                   key={i}
//                   className="bg-white border px-3 py-2 rounded-xl shadow text-center min-w-[55px]"
//                 >
//                   <p className="text-primary font-bold">
//                     {String(timeLeft[unit]).padStart(2, "0")}
//                   </p>
//                   <p className="text-gray-500 text-[10px] uppercase">
//                     {unit}
//                   </p>
//                 </div>
//               ))}
//             </div>

//           </div>

//           {/* MOBILE */}
//           <div className="md:hidden bg-white rounded-2xl shadow-soft p-4">

//             <div className="text-center mb-3">
//               <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">
//                 🪔 Sankranthi Sale
//               </span>

//               <h2 className="text-lg font-semibold mt-2">
//                 Festival Specials
//               </h2>
//             </div>

//             <div className="flex justify-center gap-2 flex-wrap">
//               {["days", "hours", "mins", "secs"].map((unit, i) => (
//                 <div
//                   key={i}
//                   className="bg-orange-50 px-3 py-2 rounded-xl text-center"
//                 >
//                   <p className="text-primary font-semibold">
//                     {String(timeLeft[unit]).padStart(2, "0")}
//                   </p>
//                   <p className="text-gray-500 text-[10px] uppercase">
//                     {unit}
//                   </p>
//                 </div>
//               ))}
//             </div>

//           </div>

//         </div>

//         {/* PRODUCTS */}
//         <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">

//           {products.map((item) => (
//             <div
//               key={item.id}
//               className="group min-w-[200px] sm:min-w-[230px] rounded-3xl bg-gradient-to-br from-white to-orange-50 border p-4 text-center hover:-translate-y-2 hover:shadow-2xl transition"
//             >

//               <div className="h-40 flex items-center justify-center bg-white rounded-2xl mb-3">
//                 <img
//                   src={item.img}
//                   className="max-h-full object-contain group-hover:scale-110 transition"
//                 />
//               </div>

//               <h3 className="text-sm font-semibold">
//                 {item.name}
//               </h3>

//               <p className="text-primary font-bold text-sm mt-1">
//                 ₹{item.price}/KG
//               </p>

//               <div className="text-xs mt-1 text-yellow-500">
//                 {"★".repeat(Math.floor(item.rating))} ({item.rating})
//               </div>

//               {/* ✅ FIXED BUTTON */}
//               <button
//                 onClick={() => navigate(`/product/${item.id}`)}
//                 className="mt-4 w-full bg-primary/10 text-primary py-2 rounded-full text-sm hover:bg-primary hover:text-white transition"
//               >
//                 👁 View Product
//               </button>

//             </div>
//           ))}

//         </div>

//       </div>
//     </section>
//   );
// }


import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FestivalOffers() {

  const navigate = useNavigate();

  // ✅ API PRODUCTS
  const [products, setProducts] = useState([]);

  // ✅ LOADING
  const [loading, setLoading] = useState(true);

  // ⏳ TIMER
  const endTime = new Date();
  endTime.setHours(endTime.getHours() + 48);

  const [timeLeft, setTimeLeft] = useState(getTime());

  function getTime() {

    const now = new Date();

    const diff = endTime - now;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  }

  // ✅ TIMER
  useEffect(() => {

    const interval = setInterval(() => {
      setTimeLeft(getTime());
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  // ✅ FETCH FESTIVAL PRODUCTS
  useEffect(() => {

    fetch("/api/products/festival-offers/")
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);

        setLoading(false);

      })
      .catch((err) => {

        console.log(err);

        setLoading(false);

      });

  }, []);

  // ✅ HIDE SECTION IF NO PRODUCTS
  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <section className="bg-cream py-14">

      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-8">

          {/* DESKTOP */}
          <div className="hidden md:flex md:items-center md:justify-between gap-4">

            <div className="flex items-center gap-3">

              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                🪔 Festival Sale
              </span>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Festival Specials
              </h2>

            </div>

            <div className="flex gap-2 text-xs md:text-sm font-medium">

              {["days", "hours", "mins", "secs"].map((unit, i) => (

                <div
                  key={i}
                  className="bg-white border px-3 py-2 rounded-xl shadow text-center min-w-[55px]"
                >

                  <p className="text-primary font-bold">
                    {String(timeLeft[unit]).padStart(2, "0")}
                  </p>

                  <p className="text-gray-500 text-[10px] uppercase">
                    {unit}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* MOBILE */}
          <div className="md:hidden bg-white rounded-2xl shadow-soft p-4">

            <div className="text-center mb-3">

              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">
                🪔 Festival Sale
              </span>

              <h2 className="text-lg font-semibold mt-2">
                Festival Specials
              </h2>

            </div>

            <div className="flex justify-center gap-2 flex-wrap">

              {["days", "hours", "mins", "secs"].map((unit, i) => (

                <div
                  key={i}
                  className="bg-orange-50 px-3 py-2 rounded-xl text-center"
                >

                  <p className="text-primary font-semibold">
                    {String(timeLeft[unit]).padStart(2, "0")}
                  </p>

                  <p className="text-gray-500 text-[10px] uppercase">
                    {unit}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* PRODUCTS */}
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">

          {products.map((item) => (

            <div
              key={item.id}
              className="
                group
                min-w-[200px]
                sm:min-w-[230px]
                rounded-3xl
                bg-gradient-to-br
                from-white
                to-orange-50
                border
                p-4
                text-center
                hover:-translate-y-2
                hover:shadow-2xl
                transition
              "
            >

              <div className="h-40 flex items-center justify-center bg-white rounded-2xl mb-3">

                <img
                    src={
                      item.image
                        ? item.image
                        : "/logo.png"
                    }
                    alt={item.name}
                    className="max-h-full object-contain group-hover:scale-110 transition"
                  />

              </div>

              <h3 className="text-sm font-semibold">
                {item.name}
              </h3>

              <p className="text-primary font-bold text-sm mt-1">
                ₹{item.price_per_kg}/KG
              </p>

              <div className="text-xs mt-1 text-yellow-500">
                {"★".repeat(Math.floor(item.rating))} ({item.rating})
              </div>

              {/* BUTTON */}
              <button
                onClick={() => navigate(`/product/${item.id}`)}
                className="
                  mt-4
                  w-full
                  bg-primary/10
                  text-primary
                  py-2
                  rounded-full
                  text-sm
                  hover:bg-primary
                  hover:text-white
                  transition
                "
              >
                👁 View Product
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
