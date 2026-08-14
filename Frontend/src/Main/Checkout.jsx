// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const API = "http://127.0.0.1:8000/api";

// export default function Checkout() {

//   const navigate = useNavigate();
//   const location = useLocation();

//   const [items, setItems] = useState([]);
//   const [checkoutData, setCheckoutData] = useState(null);

//   const [coupon, setCoupon] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [success, setSuccess] = useState(null); // ✅ SUCCESS SCREEN

//   const [address, setAddress] = useState({
//     name: "",
//     phone: "",
//     street: "",
//     city: "",
//     pincode: ""
//   });

//   const guestId = localStorage.getItem("guest_id");

//   const headers = {
//     "Content-Type": "application/json",
//     "guest-id": guestId || ""
//   };

//   // =========================
//   // LOAD RAZORPAY SCRIPT
//   // =========================
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   // =========================
//   // INIT
//   // =========================
//   useEffect(() => {

//     if (location.state?.buy_now) {

//       const data = {
//         cart_items: location.state.cart_items,
//         total_amount: location.state.total_amount,
//         discount_amount: location.state.discount_amount || 0,
//         final_amount: location.state.final_amount
//       };

//       setCheckoutData(data);
//       setItems(location.state.cart_items || []);
//       return;
//     }

//     const data =
//       location.state ||
//       JSON.parse(localStorage.getItem("checkout_data") || "{}");

//     if (data.cart_items) {
//       setCheckoutData(data);
//       setItems(data.cart_items);
//     }

//   }, [location.state]);

//   // =========================
//   // APPLY COUPON
//   // =========================
//   const applyCoupon = async () => {

//     if (!coupon) {
//       alert("Enter coupon");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         coupon_code: coupon,
//         total_amount: checkoutData?.total_amount || 0
//       };

//       const res = await fetch(`${API}/cart/apply-coupon/`, {
//         method: "POST",
//         headers,
//         body: JSON.stringify(payload)
//       });

//       const data = await res.json();

//       if (!data.status) {
//         alert(data.message);
//         return;
//       }

//       setCheckoutData((prev) => ({
//         ...prev,
//         total_amount: data.data.total_amount,
//         discount_amount: data.data.discount_amount,
//         final_amount: data.data.final_amount,
//         coupon_code: data.data.coupon_code
//       }));

//     } catch (err) {
//       alert("Coupon error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // CREATE ORDER
//   // =========================
//   const placeOrder = async () => {

//     const isBuyNow = location.state?.buy_now;

//     const payload = isBuyNow
//       ? {
//           buy_now_data: {
//             product_id: location.state.cart_items[0].product_id,
//             product_weight_id: location.state.cart_items[0].product_weight_id,
//             quantity: location.state.cart_items[0].quantity
//           },
//           name: address.name,
//           phone: address.phone,
//           street: address.street,
//           city: address.city,
//           pincode: address.pincode
//         }
//       : {
//           cart_id: checkoutData?.cart_id,
//           coupon_code: coupon,
//           name: address.name,
//           phone: address.phone,
//           street: address.street,
//           city: address.city,
//           pincode: address.pincode
//         };

//     const res = await axios.post(`${API}/orders/create/`, payload, { headers });

//     if (!res.data.status) {
//       alert(res.data.message);
//       return null;
//     }

//     return res.data.data;
//   };

//   // =========================
//   // PAYMENT
//   // =========================
//   const payWithRazorpay = async () => {

//     if (!address.name || !address.phone) {
//       alert("Fill address");
//       return;
//     }

//     const order = await placeOrder();
//     if (!order) return;

//     const options = {
//       key: "rzp_test_SmpM6ztvoSeSrm",
//       amount: order.amount,
//       currency: "INR",
//       name: "Pickle Bowl",
//       description: "Order Payment",
//       order_id: order.razorpay_order_id,

//       handler: async function (response) {

//         try {

//           await axios.post(`${API}/orders/verify-payment/`, {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature
//           });

//           // =========================
//           // SUCCESS SCREEN DATA
//           // =========================
//           setSuccess({
//             orderId: order.order_id,
//             phone: address.phone
//           });

//           // auto redirect after 4 sec
//           setTimeout(() => {
//             navigate("/");
//           }, 4000);

//         } catch (err) {
//           alert("Payment verification failed");
//         }
//       },

//       prefill: {
//         name: address.name,
//         contact: address.phone
//       },

//       theme: {
//         color: "#16a34a"
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   const total = checkoutData?.total_amount || 0;
//   const discount = checkoutData?.discount_amount || 0;
//   const finalTotal = checkoutData?.final_amount || total;

//   // =========================
//   // SUCCESS UI
//   // =========================
//   if (success) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">

//       <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center overflow-hidden">

//         {/* decorative glow */}
//         <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-40"></div>
//         <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-200 rounded-full blur-3xl opacity-40"></div>

//         {/* success icon */}
//         <div className="flex justify-center mb-5">
//           <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
//             <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="3"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* heading */}
//         <h2 className="text-2xl font-bold text-gray-800">
//           Payment Successful
//         </h2>

//         <p className="text-green-600 font-medium mt-1">
//           🎉 Thank you for your order!
//         </p>

//         {/* details card */}
//         <div className="mt-6 bg-gray-50 rounded-2xl p-4 text-left space-y-3 border">

//           <div className="flex justify-between">
//             <span className="text-gray-500 text-sm">Order ID</span>
//             <span className="font-semibold text-gray-800 text-sm">
//               {success.orderId}
//             </span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-gray-500 text-sm">Phone</span>
//             <span className="font-semibold text-gray-800 text-sm">
//               {success.phone}
//             </span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-gray-500 text-sm">Status</span>
//             <span className="text-green-600 font-bold text-sm">
//               Confirmed ✔
//             </span>
//           </div>

//         </div>

//         {/* loading dots */}
//         <div className="flex justify-center mt-6 space-x-1">
//           <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
//           <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-150"></span>
//           <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-300"></span>
//         </div>

//         {/* redirect text */}
//         <p className="text-xs text-gray-400 mt-4">
//           Redirecting you to home in a few seconds...
//         </p>

//       </div>
//     </div>
//   );
// }
//   // =========================
//   // MAIN UI
//   // =========================
//   return (
//     <section className="bg-cream min-h-screen py-10">

//       <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-8">

//         {/* LEFT */}
//         <div className="lg:col-span-2">

//           {/* ADDRESS */}
//           <div className="bg-white p-6 rounded-3xl shadow">

//             <h2 className="font-bold mb-4">Address</h2>

//             <div className="grid md:grid-cols-2 gap-4">

//               {Object.keys(address).map((k) => (
//                 <input
//                   key={k}
//                   placeholder={k}
//                   className="border p-3 rounded-xl"
//                   onChange={(e) =>
//                     setAddress({ ...address, [k]: e.target.value })
//                   }
//                 />
//               ))}

//             </div>

//           </div>

//           {/* ITEMS */}
//           <div className="bg-white p-6 mt-6 rounded-3xl shadow">

//             <h2 className="font-bold mb-4">Items</h2>

//             {(checkoutData?.cart_items || items).map((item, i) => (
//               <div key={i} className="flex justify-between border-b py-2">
//                 <div>
//                   <p>{item.product_name}</p>
//                   <p>Qty: {item.quantity}</p>
//                 </div>
//                 <p>₹{item.total_price}</p>
//               </div>
//             ))}

//           </div>

//         </div>

//         {/* RIGHT */}
//        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-gray-100">

//   {/* TITLE */}
//   <h2 className="font-bold text-lg mb-5 text-gray-800">
//     Order Summary
//   </h2>

//   {/* COUPON BOX */}
//   <div className="flex gap-2 mb-5">

//     <input
//       value={coupon}
//       onChange={(e) => setCoupon(e.target.value)}
//       placeholder="Enter coupon code"
//       className="border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 p-3 rounded-xl w-full outline-none"
//     />

//     <button
//       onClick={applyCoupon}
//       disabled={loading}
//       className={`px-5 rounded-xl font-medium transition-all duration-300 transform
//         ${loading 
//           ? "bg-gray-300 cursor-not-allowed" 
//           : "bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95"
//         }
//         text-white flex items-center justify-center min-w-[90px]
//       `}
//     >
//       {loading ? (
//         <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//       ) : (
//         "Apply"
//       )}
//     </button>

//   </div>

//   {/* PRICING SECTION */}
//   <div className="space-y-3">

//     {/* TOTAL */}
//     <div className="flex justify-between text-gray-600">
//       <span>Item Total</span>
//       <span>₹{total}</span>
//     </div>

//     {/* DELIVERY */}
//     <div className="flex justify-between text-gray-600">
//       <span>Delivery Fee</span>
//       <span className="text-gray-700 font-medium">
//         +₹90
//       </span>
//     </div>

//     {/* DISCOUNT */}
//     <div className="flex justify-between text-green-600 transition-all duration-300">
//       <span>Discount</span>
//       <span className="font-semibold">
//         -₹{discount}
//       </span>
//     </div>

//     <div className="h-px bg-gray-100 my-2"></div>

//     {/* FINAL */}
//     <div className="flex justify-between text-lg font-bold text-gray-900">
//       <span>To Pay</span>
//       <span className="text-green-700">
//         ₹{finalTotal + 90}
//       </span>
//     </div>

//   </div>

//   {/* SUCCESS MESSAGE */}
//   {discount > 0 && (
//     <div className="mt-4 text-sm text-green-600 bg-green-50 border border-green-100 p-2 rounded-xl animate-fade-in">
//       🎉 Coupon applied successfully!
//     </div>
//   )}

//   {/* PAY BUTTON */}
//   <button
//     onClick={payWithRazorpay}
//     className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
//   >
//     Pay ₹{finalTotal + 90}
//   </button>

// </div>
// </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Checkout() {

  const navigate = useNavigate();
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [checkoutData, setCheckoutData] = useState(null);

  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email:"",
    street: "",
    city: "",
    pincode: ""
  });

  const guestId = localStorage.getItem("guest_id");

  const headers = {
    "Content-Type": "application/json",
    "guest-id": guestId || ""
  };

  // Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // INIT
  useEffect(() => {

    if (location.state?.buy_now) {

      const data = {
        cart_items: location.state.cart_items,
        total_amount: location.state.total_amount,
        discount_amount: location.state.discount_amount || 0,
        final_amount: location.state.final_amount
      };

      setCheckoutData(data);
      setItems(location.state.cart_items || []);
      return;
    }

    const data =
      location.state ||
      JSON.parse(localStorage.getItem("checkout_data") || "{}");

    if (data.cart_items) {
      setCheckoutData(data);
      setItems(data.cart_items);
    }

  }, [location.state]);

  // APPLY COUPON
  const applyCoupon = async () => {

    if (!coupon) return alert("Enter coupon");

    try {
      setLoading(true);

      const payload = {
        coupon_code: coupon,
        total_amount: checkoutData?.total_amount || 0
      };

      const res = await fetch(`${API}/cart/apply-coupon/`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!data.status) return alert(data.message);

      setCheckoutData((prev) => ({
        ...prev,
        total_amount: data.data.total_amount,
        discount_amount: data.data.discount_amount,
        final_amount: data.data.final_amount,
        coupon_code: data.data.coupon_code
      }));

    } finally {
      setLoading(false);
    }
  };

  // PLACE ORDER
  const placeOrder = async () => {

    const payload = location.state?.buy_now
      ? {
          buy_now_data: {
            product_id: location.state.cart_items[0].product_id,
            product_weight_id: location.state.cart_items[0].product_weight_id,
            quantity: location.state.cart_items[0].quantity
          },
          ...address
        }
      : {
          cart_id: checkoutData?.cart_id,
          coupon_code: coupon,
          ...address
        };

    const res = await axios.post(`${API}/orders/create/`, payload, { headers });

    if (!res.data.status) {
      alert(res.data.message);
      return null;
    }

    return res.data.data;
  };

  // PAYMENT
  const payWithRazorpay = async () => {

    if (
  !address.name ||
  !address.phone ||
  !address.email ||
  !address.street ||
  !address.city ||
  !address.pincode
) {
      alert("Fill address");
      return;
    }

    const order = await placeOrder();
    if (!order) return;

    const options = {
      key: "rzp_test_SmpM6ztvoSeSrm",
      amount: order.amount,
      currency: "INR",
      name: "Pickle Bowl",
      order_id: order.razorpay_order_id,

      handler: async (response) => {

        await axios.post(`${API}/orders/verify-payment/`, response);

        setSuccess({
          orderId: order.order_id,
          phone: address.phone
        });

        setTimeout(() => navigate("/"), 4000);
      },

      prefill: {
  name: address.name,
  contact: address.phone,
  email: address.email
},

      theme: { color: "#16a34a" }
    };

    new window.Razorpay(options).open();
  };

  const total = checkoutData?.total_amount || 0;
  const discount = checkoutData?.discount_amount || 0;
  const finalTotal = checkoutData?.final_amount || total;

  // ================= SUCCESS UI =================
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">

        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center overflow-hidden">

          <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-200 rounded-full blur-3xl opacity-40"></div>

          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
                ✔
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Payment Successful
          </h2>

          <p className="text-green-600 mt-1">
            🎉 Order placed successfully
          </p>

          <div className="mt-6 bg-gray-50 rounded-2xl p-4 text-left space-y-3 border">

            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Order ID</span>
              <span className="font-semibold text-sm">{success.orderId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Phone</span>
              <span className="font-semibold text-sm">{success.phone}</span>
            </div>
<div className="flex justify-between">
  <span className="text-gray-500 text-sm">Email</span>
  <span className="font-semibold text-sm">
    {address.email}
  </span>
</div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Status</span>
              <span className="text-green-600 font-bold text-sm">Confirmed ✔</span>
            </div>

          </div>

          <p className="text-xs text-gray-400 mt-4">
            Redirecting to home...
          </p>

        </div>

      </div>
    );
  }

  return (
    <section className="bg-cream min-h-screen py-10">

      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2">

          {/* ADDRESS */}
<div className="bg-white p-6 rounded-3xl shadow">

  <h2 className="font-bold mb-4">Address</h2>

  <div className="grid md:grid-cols-2 gap-4">

    {/* NAME */}
    <div>
      <input
        placeholder="name"
        className="border p-3 rounded-xl w-full transition-all focus:scale-[1.02] focus:border-green-500"
        value={address.name}
        onChange={(e) => {
          const val = e.target.value;
          if (/^[A-Za-z\s]*$/.test(val)) {
            setAddress({ ...address, name: val });
          }
        }}
      />
      {address.name && !/^[A-Za-z\s]+$/.test(address.name) && (
        <p className="text-red-500 text-xs mt-1">Only letters allowed</p>
      )}
    </div>

    {/* PHONE */}
    <div>
      <input
        placeholder="phone"
        className="border p-3 rounded-xl w-full transition-all focus:scale-[1.02] focus:border-green-500"
        value={address.phone}
        maxLength={10}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, "");
          setAddress({ ...address, phone: val });
        }}
      />
      {address.phone && address.phone.length !== 10 && (
        <p className="text-red-500 text-xs mt-1">
          Must be 10 digits
        </p>
      )}
    </div>
    {/* EMAIL */}
<div>
  <input
    type="email"
    placeholder="email"
    className="border p-3 rounded-xl w-full transition-all focus:scale-[1.02] focus:border-green-500"
    value={address.email}
    onChange={(e) =>
      setAddress({ ...address, email: e.target.value })
    }
  />

  {address.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email) && (
      <p className="text-red-500 text-xs mt-1">
        Enter valid email
      </p>
  )}
</div>

    {/* STREET */}
    <input
      placeholder="street"
      className="border p-3 rounded-xl transition-all focus:scale-[1.02] focus:border-green-500"
      value={address.street}
      onChange={(e) =>
        setAddress({ ...address, street: e.target.value })
      }
    />

    {/* CITY */}
    <input
      placeholder="city"
      className="border p-3 rounded-xl transition-all focus:scale-[1.02] focus:border-green-500"
      value={address.city}
      onChange={(e) =>
        setAddress({ ...address, city: e.target.value })
      }
    />

    {/* PINCODE */}
    <div>
      <input
        placeholder="pincode"
        className="border p-3 rounded-xl w-full transition-all focus:scale-[1.02] focus:border-green-500"
        value={address.pincode}
        maxLength={6}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, "");
          setAddress({ ...address, pincode: val });
        }}
      />
      {address.pincode && address.pincode.length !== 6 && (
        <p className="text-red-500 text-xs mt-1">
          Must be 6 digits
        </p>
      )}
    </div>

  </div>

</div>
          {/* ITEMS (UPGRADED UI) */}
          <div className="bg-white mt-6 rounded-3xl shadow-xl border overflow-hidden">

            <div className="p-5 border-b bg-gray-50">
              <h2 className="font-bold">Items</h2>
            </div>

            <div className="divide-y">

              {(checkoutData?.cart_items || items).map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between p-5 hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">₹{item.total_price}</p>
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-white/90 p-6 rounded-3xl shadow-xl">

          <h2 className="font-bold mb-5">Order Summary</h2>

          {/* COUPON (UPGRADED UI) */}
          <div className="flex gap-2 mb-5">

            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border p-3 rounded-xl w-full"
              placeholder="Coupon code"
            />

            <button
              onClick={applyCoupon}
              className="bg-green-600 text-white px-4 rounded-xl"
            >
              {loading ? "..." : "Apply"}
            </button>

          </div>

          {discount > 0 && (
            <p className="text-green-600 text-sm mb-3 animate-pulse">
              🎉 Coupon Applied
            </p>
          )}

          {/* PRICING */}
          <div className="space-y-2">

            <div className="flex justify-between">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹90</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>

            <div className="border-t pt-2 flex justify-between font-bold">
              <span>To Pay</span>
              <span>₹{finalTotal + 90}</span>
            </div>

          </div>

          <button
            onClick={payWithRazorpay}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-2xl"
          >
            Pay ₹{finalTotal + 90}
          </button>

        </div>

      </div>

    </section>
  );
}
