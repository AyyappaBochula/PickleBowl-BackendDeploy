// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:8000/api";

// export default function ProductDetail() {

//   const { pid } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [qty, setQty] = useState(1);
//   const [selectedWeight, setSelectedWeight] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const guestId = localStorage.getItem("guest_id");
//   const token = localStorage.getItem("access");

//   // =========================
//   // HEADERS
//   // =========================
//   const getHeaders = () => {
//     const headers = {
//       "Content-Type": "application/json",
//     };

//     if (guestId) headers["guest-id"] = guestId;
//     if (token) headers["Authorization"] = `Bearer ${token}`;

//     return headers;
//   };

//   // =========================
//   // FETCH PRODUCT
//   // =========================
//   useEffect(() => {

//     const fetchProduct = async () => {

//       try {

//         setLoading(true);

//         const res = await fetch(`${API}/products/${pid}/`);
//         const data = await res.json();

//         const productData = data.data || data;

//         setProduct(productData);

//         if (productData?.weights?.length > 0) {
//           setSelectedWeight(productData.weights[0]);
//         }

//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();

//   }, [pid]);

//   // =========================
//   // FETCH PRODUCTS
//   // =========================
//   useEffect(() => {

//     fetch(`${API}/products/`)
//       .then((res) => res.json())
//       .then((res) => setProducts(res.data || res))
//       .catch((err) => console.log(err));

//   }, []);

//   // =========================
//   // FINAL PRICE
//   // =========================
//   const finalPrice =
//     Number(selectedWeight?.price || 0) * qty;

//   // =========================
//   // ADD TO CART
//   // =========================
//   const handleAddToCart = async () => {

//     if (!selectedWeight) {
//       alert("Select weight");
//       return;
//     }

//     try {

//       const payload = {
//         product_id: product.id,
//         product_weight_id: selectedWeight.id,
//         quantity: qty
//       };

//       await axios.post(
//         `${API}/cart/add/`,
//         payload,
//         { headers: getHeaders() }
//       );

//       alert("Added to cart");
//       navigate("/cart");

//     } catch (err) {
//       console.log(err);
//       alert("Failed to add");
//     }
//   };

//   // =========================
//   // BUY NOW (🔥 FIXED)
//   // =========================
//   const handleBuyNow = () => {

//     if (!selectedWeight) {
//       alert("Select weight");
//       return;
//     }

//     const buyNowData = {
//       buy_now_data: {
//         buy_now: true,
//         product_id: product.id,
//         name: product.name,
//         quantity: qty,
//         weight: selectedWeight.weight_in_grams,
//         product_weight_id: selectedWeight.id,
//         price: selectedWeight.price,
//         total_price: Number(selectedWeight.price) * qty,
//         image: product.image
//       }
//     };

//     // ❌ DO NOT RELY ON CART OR OLD LOCAL STORAGE
//     localStorage.setItem("buy_now", JSON.stringify(buyNowData));

//     navigate("/checkout", {
//       state: buyNowData
//     });
//   };

//   // =========================
//   // SIMILAR PRODUCTS
//   // =========================
//   const similarProducts =
//     (products || [])
//       .filter((item) =>
//         item.id !== product?.id &&
//         item.category?.slug === product?.category?.slug
//       )
//       .slice(0, 10);

//   // =========================
//   // LOADING
//   // =========================
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Product not found
//       </div>
//     );
//   }

//   // =========================
//   // UI (SAME)
//   // =========================
//   return (
//     <section className="bg-cream py-10 min-h-screen">

//       <div className="max-w-6xl mx-auto px-4">

//         <div className="grid md:grid-cols-2 gap-8">

//           {/* IMAGE */}
//           <div className="bg-white rounded-3xl p-6 flex items-center justify-center">

//             <img
//               src={product.image || "/logo.png"}
//               alt={product.name}
//               className="max-h-[350px] object-contain"
//             />

//           </div>

//           {/* DETAILS */}
//           <div className="bg-white rounded-3xl p-6">

//             <h1 className="text-3xl font-bold">
//               {product.name}
//             </h1>

//             <p className="text-4xl font-bold text-primary mt-5">
//               ₹{finalPrice}
//             </p>

//             <p className="text-gray-500 mt-4 leading-7">
//               {product.description ||
//                 "Traditional homemade Andhra style pickle with authentic taste."
//               }
//             </p>

//             {/* WEIGHTS */}
//             <div className="mt-6 flex flex-wrap gap-2">

//               {product.weights?.map((w) => (
//                 <button
//                   key={w.id}
//                   onClick={() => setSelectedWeight(w)}
//                   className={`px-4 py-2 border rounded-full text-sm ${
//                     selectedWeight?.id === w.id
//                       ? "bg-primary text-white"
//                       : ""
//                   }`}
//                 >
//                   {w.weight_in_grams >= 1000
//                     ? `${w.weight_in_grams / 1000}kg`
//                     : `${w.weight_in_grams}g`}
//                   {" - "}₹{w.price}
//                 </button>
//               ))}

//             </div>

//             {/* QTY */}
//             <div className="mt-6 flex items-center gap-4">

//               <button
//                 onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
//                 className="w-9 h-9 bg-primary text-white rounded-full"
//               >
//                 -
//               </button>

//               <span className="text-lg font-bold">{qty}</span>

//               <button
//                 onClick={() => setQty(qty + 1)}
//                 className="w-9 h-9 bg-primary text-white rounded-full"
//               >
//                 +
//               </button>

//             </div>

//             {/* BUTTONS */}
//             <div className="flex gap-3 mt-10">

//               <button
//                 onClick={handleBuyNow}
//                 className="flex-1 bg-primary text-white py-3 rounded-2xl"
//               >
//                 Buy Now
//               </button>

//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 border border-primary text-primary py-3 rounded-2xl"
//               >
//                 Add to Cart
//               </button>

//             </div>

//           </div>

//         </div>

//         {/* SIMILAR */}
//         <div className="mt-10">

//           <h2 className="text-xl font-bold mb-4">
//             Similar Products
//           </h2>

//           <div className="flex gap-4 overflow-x-auto">

//             {similarProducts.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => navigate(`/product/${item.id}`)}
//                 className="min-w-[200px] bg-white p-4 rounded-2xl cursor-pointer"
//               >
//                 <img
//                   src={item.image || "/logo.png"}
//                   className="h-32 object-contain mx-auto"
//                 />
//                 <p className="text-center mt-2">
//                   {item.name}
//                 </p>
//               </div>
//             ))}

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "/api";

export default function ProductDetail() {

  const { pid } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [loading, setLoading] = useState(true);

  const guestId = localStorage.getItem("guest_id");
  const token = localStorage.getItem("access");

  const getHeaders = () => {
    const headers = { "Content-Type": "application/json" };
    if (guestId) headers["guest-id"] = guestId;
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  // =========================
  // FETCH PRODUCT
  // =========================
  useEffect(() => {

    const fetchProduct = async () => {

      try {
        setLoading(true);

        const res = await fetch(`${API}/products/${pid}/`);
        const data = await res.json();

        const productData = data.data || data;

        setProduct(productData);

        if (productData?.weights?.length > 0) {
          setSelectedWeight(productData.weights[0]);
        }

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

  }, [pid]);

  // =========================
  // PRODUCTS LIST
  // =========================
  useEffect(() => {

    fetch(`${API}/products/`)
      .then((res) => res.json())
      .then((res) => setProducts(res.data || res))
      .catch((err) => console.log(err));

  }, []);

  const finalPrice =
    Number(selectedWeight?.price || 0) * qty;

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async () => {

    if (!selectedWeight) {
      alert("Select weight");
      return;
    }

    try {

      await axios.post(
        `${API}/cart/add/`,
        {
          product_id: product.id,
          product_weight_id: selectedWeight.id,
          quantity: qty
        },
        { headers: getHeaders() }
      );

      alert("Added to cart");
      navigate("/cart");

    } catch (err) {
      console.log(err);
      alert("Failed to add");
    }
  };

  // =========================
  // BUY NOW (USES API)
  // =========================
  const handleBuyNow = async () => {

    if (!selectedWeight) {
      alert("Select weight");
      return;
    }

    try {

      const payload = {
        buy_now_data: {
          product_id: product.id,
          product_weight_id: selectedWeight.id,
          quantity: qty
        }
      };

      const res = await axios.post(
        `${API}/orders/buy-now/checkout/`,
        payload,
        { headers: getHeaders() }
      );

      if (!res.data.status) {
        alert(res.data.message);
        return;
      }

      // Navigate to checkout with buy now data
      navigate("/checkout", {
        state: {
          buy_now: true,
          ...res.data.data
        }
      });

    } catch (err) {
      console.log(err);
      alert("Failed to process buy now");
    }
  };
  const similarProducts =
    (products || [])
      .filter((item) =>
        item.id !== product?.id &&
        item.category?.slug === product?.category?.slug
      )
      .slice(0, 10);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  // return (
  //   <section className="bg-cream py-10 min-h-screen">

  //     <div className="max-w-6xl mx-auto px-4">

  //       <div className="grid md:grid-cols-2 gap-8">

  //         {/* IMAGE */}
  //         <div className="bg-white rounded-3xl p-6 flex items-center justify-center">
  //           <img src={product.image || "/logo.png"} className="max-h-[350px] object-contain" />
  //         </div>

  //         {/* DETAILS */}
  //         <div className="bg-white rounded-3xl p-6">

  //           <h1 className="text-3xl font-bold">{product.name}</h1>

  //           <p className="text-4xl font-bold text-primary mt-5">
  //             ₹{finalPrice}
  //           </p>

  //           <p className="text-gray-500 mt-4">
  //             {product.description}
  //           </p>

  //           {/* WEIGHTS */}
  //           <div className="mt-6 flex gap-2 flex-wrap">

  //             {product.weights?.map((w) => (
  //               <button
  //                 key={w.id}
  //                 onClick={() => setSelectedWeight(w)}
  //                 className={`px-4 py-2 border rounded-full ${
  //                   selectedWeight?.id === w.id ? "bg-primary text-white" : ""
  //                 }`}
  //               >
  //                 {w.weight_in_grams >= 1000
  //                   ? `${w.weight_in_grams / 1000}kg`
  //                   : `${w.weight_in_grams}g`}
  //                 {" - ₹"}{w.price}
  //               </button>
  //             ))}

  //           </div>

  //           {/* QTY */}
  //           <div className="mt-6 flex items-center gap-4">

  //             <button
  //               onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
  //               className="w-9 h-9 bg-primary text-white rounded-full"
  //             >
  //               -
  //             </button>

  //             <span className="font-bold">{qty}</span>

  //             <button
  //               onClick={() => setQty(qty + 1)}
  //               className="w-9 h-9 bg-primary text-white rounded-full"
  //             >
  //               +
  //             </button>

  //           </div>

  //           {/* BUTTONS */}
  //           <div className="flex gap-3 mt-10">

  //             <button
  //               onClick={handleBuyNow}
  //               className="flex-1 bg-primary text-white py-3 rounded-2xl"
  //             >
  //               Buy Now
  //             </button>

  //             <button
  //               onClick={handleAddToCart}
  //               className="flex-1 border border-primary text-primary py-3 rounded-2xl"
  //             >
  //               Add to Cart
  //             </button>

  //           </div>

  //         </div>

  //       </div>

  //       {/* SIMILAR */}
  //       <div className="mt-10">

  //         <h2 className="text-xl font-bold mb-4">Similar Products</h2>

  //         <div className="flex gap-4 overflow-x-auto">

  //           {similarProducts.map((item) => (
  //             <div
  //               key={item.id}
  //               onClick={() => navigate(`/product/${item.id}`)}
  //               className="min-w-[200px] bg-white p-4 rounded-2xl cursor-pointer"
  //             >
  //               <img src={item.image || "/logo.png"} className="h-32 object-contain mx-auto" />
  //               <p className="text-center mt-2">{item.name}</p>
  //             </div>
  //           ))}

  //         </div>

  //       </div>

  //     </div>

  //   </section>
  // );
return (
    <section className="bg-cream py-10 min-h-screen">

      <div className="max-w-6xl mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-8">

          {/* IMAGE */}
          <div className="bg-white rounded-3xl p-6 flex items-center justify-center">

            <img
              src={product.image || "/logo.png"}
              alt={product.name}
              className="max-h-[350px] object-contain"
            />

          </div>

          {/* DETAILS */}
          <div className="bg-white rounded-3xl p-6">

            <h1 className="text-3xl font-bold">
              {product.name}
            </h1>

            <p className="text-4xl font-bold text-primary mt-5">
              ₹{finalPrice}
            </p>

            <p className="text-gray-500 mt-4 leading-7">
              {product.description ||
                "Traditional homemade Andhra style pickle with authentic taste."
              }
            </p>

            {/* WEIGHTS */}
            <div className="mt-6 flex flex-wrap gap-2">

              {product.weights?.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWeight(w)}
                  className={`px-4 py-2 border rounded-full text-sm ${
                    selectedWeight?.id === w.id
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  {w.weight_in_grams >= 1000
                    ? `${w.weight_in_grams / 1000}kg`
                    : `${w.weight_in_grams}g`}
                  {" - "}₹{w.price}
                </button>
              ))}

            </div>

            {/* QTY */}
            <div className="mt-6 flex items-center gap-4">

              <button
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                className="w-9 h-9 bg-primary text-white rounded-full"
              >
                -
              </button>

              <span className="text-lg font-bold">{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="w-9 h-9 bg-primary text-white rounded-full"
              >
                +
              </button>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-10">

              <button
                onClick={handleBuyNow}
                className="flex-1 bg-primary text-white py-3 rounded-2xl"
              >
                Buy Now
              </button>

              <button
                onClick={handleAddToCart}
                className="flex-1 border border-primary text-primary py-3 rounded-2xl"
              >
                Add to Cart
              </button>

            </div>

          </div>

        </div>

        {/* SIMILAR */}
        <div className="mt-10">

          <h2 className="text-xl font-bold mb-4">
            Similar Products
          </h2>

          <div className="flex gap-4 overflow-x-auto">

            {similarProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="min-w-[200px] bg-white p-4 rounded-2xl cursor-pointer"
              >
                <img
                  src={item.image || "/logo.png"}
                  className="h-32 object-contain mx-auto"
                />
                <p className="text-center mt-2">
                  {item.name}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
