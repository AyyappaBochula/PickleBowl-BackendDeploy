// import { useState } from "react";
// import axios from "axios";
// import {
//   PackageCheck,
//   Package,
//   Truck,
//   MapPinned,
//   CheckCircle2,
//   XCircle,
//   Search
// } from "lucide-react";

// const API = "http://127.0.0.1:8000/api";

// export default function Tracking() {

//   const [form, setForm] = useState({
//     order_id: "",
//     phone: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [tracking, setTracking] = useState(null);

//   // =========================
//   // TRACK ORDER
//   // =========================
//   const trackOrder = async () => {

//     try {

//       setLoading(true);

//       const res = await axios.post(
//         `${API}/tracking/track/`,
//         form
//       );

//       if (!res.data.status) {
//         alert(res.data.message);
//         return;
//       }

//       setTracking(res.data.data);

//     } catch (err) {

//       alert(
//         err.response?.data?.message || "Tracking failed"
//       );

//     } finally {

//       setLoading(false);
//     }
//   };

//   // =========================
//   // STATUS STEPS
//   // =========================
//   const steps = [
//     {
//       key: "confirmed",
//       label: "Confirmed",
//       icon: <PackageCheck size={22} />
//     },
//     {
//       key: "packed",
//       label: "Packed",
//       icon: <Package size={22} />
//     },
//     {
//       key: "shipped",
//       label: "Shipped",
//       icon: <Truck size={22} />
//     },
//     {
//       key: "out_for_delivery",
//       label: "Out for Delivery",
//       icon: <MapPinned size={22} />
//     },
//     {
//       key: "delivered",
//       label: "Delivered",
//       icon: <CheckCircle2 size={22} />
//     }
//   ];

//   // =========================
//   // CURRENT STATUS
//   // =========================
//   const latestStatus =
//     tracking?.tracking_history?.length > 0
//       ? tracking.tracking_history[
//           tracking.tracking_history.length - 1
//         ].status
//       : "";

//   const currentStepIndex = steps.findIndex(
//     (step) => step.key === latestStatus
//   );

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-12 px-4">

//       <div className="max-w-5xl mx-auto">

//         {/* HEADER */}
//         <div className="text-center mb-10">

//           <h1 className="text-4xl font-extrabold text-gray-800">
//             Track Your Order
//           </h1>

//           <p className="text-gray-500 mt-3">
//             Enter your Order ID and Mobile Number
//           </p>

//         </div>

//         {/* SEARCH CARD */}
//         <div className="bg-white rounded-3xl shadow-2xl p-8 border">

//           <div className="grid md:grid-cols-2 gap-5">

//             {/* ORDER ID */}
//             <input
//               type="number"
//               placeholder="Enter Order ID"
//               className="border-2 border-gray-200 focus:border-green-500 outline-none rounded-2xl px-5 py-4"
//               value={form.order_id}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   order_id: e.target.value
//                 })
//               }
//             />

//             {/* PHONE */}
//             <input
//               placeholder="Enter Mobile Number"
//               maxLength={10}
//               className="border-2 border-gray-200 focus:border-green-500 outline-none rounded-2xl px-5 py-4"
//               value={form.phone}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   phone: e.target.value.replace(/\D/g, "")
//                 })
//               }
//             />

//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={trackOrder}
//             className="mt-6 w-full bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
//           >
//             <Search size={18} />

//             {loading ? "Tracking..." : "Track Order"}
//           </button>

//         </div>

//         {/* TRACKING RESULT */}
//         {tracking && (

//           <div className="bg-white rounded-3xl shadow-2xl p-8 mt-10 border">

//             {/* TOP */}
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b pb-6">

//               <div>
//                 <p className="text-sm text-gray-500">
//                   Order ID
//                 </p>

//                 <h2 className="text-3xl font-bold text-gray-800">
//                   #{tracking.order_id}
//                 </h2>
//               </div>

//               <div className="text-left md:text-right">

//                 <p className="text-sm text-gray-500">
//                   Payment Status
//                 </p>

//                 <p className="text-green-600 font-bold capitalize text-lg">
//                   {tracking.payment_status}
//                 </p>

//               </div>

//             </div>

//             {/* CUSTOMER INFO */}
//             <div className="grid md:grid-cols-3 gap-5 mt-8">

//               <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">

//                 <p className="text-sm text-gray-500">
//                   Customer
//                 </p>

//                 <p className="font-bold mt-1">
//                   {tracking.customer_name}
//                 </p>

//               </div>

//               <div className="bg-green-50 rounded-2xl p-5 border border-green-100">

//                 <p className="text-sm text-gray-500">
//                   Phone
//                 </p>

//                 <p className="font-bold mt-1">
//                   {tracking.phone}
//                 </p>

//               </div>

//               <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">

//                 <p className="text-sm text-gray-500">
//                   Total Amount
//                 </p>

//                 <p className="font-bold mt-1">
//                   ₹{tracking.final_amount}
//                 </p>

//               </div>

//             </div>

//             {/* TRACK LINE */}
//             <div className="mt-12 overflow-x-auto">

//               <div className="flex items-center min-w-[700px]">

//                 {steps.map((step, index) => {

//                   const completed =
//                     currentStepIndex >= index;

//                   return (

//                     <div
//                       key={step.key}
//                       className="flex items-center flex-1"
//                     >

//                       {/* STEP */}
//                       <div className="flex flex-col items-center relative">

//                         <div
//                           className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg
//                           ${
//                             completed
//                               ? "bg-green-600"
//                               : "bg-gray-300"
//                           }`}
//                         >
//                           {latestStatus === "cancelled"
//                             ? <XCircle size={24} />
//                             : step.icon}
//                         </div>

//                         <p
//                           className={`mt-3 text-sm font-semibold text-center
//                           ${
//                             completed
//                               ? "text-green-700"
//                               : "text-gray-400"
//                           }`}
//                         >
//                           {step.label}
//                         </p>

//                       </div>

//                       {/* LINE */}
//                       {index !== steps.length - 1 && (

//                         <div
//                           className={`flex-1 h-2 rounded-full mx-2
//                           ${
//                             currentStepIndex > index
//                               ? "bg-green-500"
//                               : "bg-gray-200"
//                           }`}
//                         ></div>

//                       )}

//                     </div>

//                   );
//                 })}

//               </div>

//             </div>

//             {/* CURRENT STATUS */}
//             <div className="mt-10 bg-green-50 border border-green-100 rounded-2xl p-6">

//               <p className="text-sm text-gray-500">
//                 Current Status
//               </p>

//               <h3 className="text-2xl font-bold text-green-700 mt-2 capitalize">
//                 {latestStatus.replaceAll("_", " ")}
//               </h3>

//             </div>

//             {/* TIMELINE */}
//             <div className="mt-12">

//               <h3 className="text-xl font-bold mb-6">
//                 Tracking History
//               </h3>

//               <div className="space-y-6">

//                 {tracking.tracking_history.map((item, index) => (

//                   <div
//                     key={index}
//                     className="flex gap-4"
//                   >

//                     <div className="flex flex-col items-center">

//                       <div className="w-5 h-5 rounded-full bg-green-600"></div>

//                       {index !== tracking.tracking_history.length - 1 && (
//                         <div className="w-1 h-20 bg-green-200"></div>
//                       )}

//                     </div>

//                     <div className="pb-6">

//                       <h4 className="font-bold text-lg capitalize">
//                         {item.status.replaceAll("_", " ")}
//                       </h4>

//                       <p className="text-gray-600 mt-1">
//                         {item.message}
//                       </p>

//                       <p className="text-xs text-gray-400 mt-2">
//                         {new Date(item.created_at).toLocaleString()}
//                       </p>

//                     </div>

//                   </div>

//                 ))}

//               </div>

//             </div>

//           </div>

//         )}

//       </div>

//     </section>
//   );
// }

import { useState } from "react";
import axios from "axios";
import {
  PackageCheck,
  CheckCircle2,
  Package,
  Truck,
  Bike,
  Home,
  XCircle,
  Search
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Tracking() {

  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const [tracking, setTracking] = useState(null);

  // =========================
  // TRACK ORDER
  // =========================
  const handleTrack = async () => {

    if (!orderId || !phone) {
      alert("Enter Order ID and Mobile Number");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${API}/tracking/track/`,
        {
          order_id: orderId,
          phone: phone
        }
      );

      if (!res.data.status) {
        alert(res.data.message);
        return;
      }

      setTracking(res.data.data);

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Order not found"
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // STATUS STEPS
  // =========================
  const steps = [
    {
      key: "confirmed",
      label: "Confirmed",
      icon: CheckCircle2
    },
    {
      key: "packed",
      label: "Packed",
      icon: Package
    },
    {
      key: "shipped",
      label: "Shipped",
      icon: Truck
    },
    {
      key: "out_for_delivery",
      label: "Out For Delivery",
      icon: Bike
    },
    {
      key: "delivered",
      label: "Delivered",
      icon: Home
    }
  ];

  const history =
    tracking?.tracking_history || [];

  const currentStatus =
    history[history.length - 1]?.status;

  const activeIndex = steps.findIndex(
    (s) => s.key === currentStatus
  );

  // =========================
  // CANCELLED
  // =========================
  const isCancelled =
    currentStatus === "cancelled";

  return (
    <section className="bg-cream min-h-screen py-10">

      <div className="max-w-5xl mx-auto px-4">

        {/* TOP CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <PackageCheck className="text-primary" size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Track Your Order
              </h1>

              <p className="text-gray-500 mt-1">
                Enter order details to check delivery status
              </p>
            </div>

          </div>

          {/* INPUTS */}
          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="number"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="border rounded-2xl px-4 py-3 focus:outline-none focus:border-primary"
            />

            <input
              type="number"
              placeholder="Enter Mobile Number"
              value={phone}
              maxLength={10}
              onChange={(e) =>
                setPhone(
                  e.target.value.replace(/\D/g, "")
                )
              }
              className="border rounded-2xl px-4 py-3 focus:outline-none focus:border-primary"
            />

            <button
              onClick={handleTrack}
              className="bg-primary text-white rounded-2xl py-3 font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <Search size={18} />

              {loading ? "Tracking..." : "Track Order"}
            </button>

          </div>

        </div>

        {/* TRACKING DETAILS */}
        {tracking && (

          <div className="mt-8 space-y-6">

            {/* ORDER CARD */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border">

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>

                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800">
                    #{tracking.order_id}
                  </h2>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Customer
                  </p>

                  <h2 className="font-semibold text-gray-700">
                    {tracking.customer_name}
                  </h2>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Payment
                  </p>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {tracking.payment_status}
                  </span>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Total
                  </p>

                  <h2 className="font-bold text-primary text-xl">
                    ₹{tracking.final_amount}
                  </h2>

                </div>

              </div>

            </div>

            {/* CANCELLED */}
            {isCancelled ? (

              <div className="bg-white rounded-3xl shadow-xl p-10 border text-center">

                <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center">

                  <XCircle
                    className="text-red-600"
                    size={40}
                  />

                </div>

                <h2 className="text-3xl font-bold text-red-600 mt-5">
                  Order Cancelled
                </h2>

                <p className="text-gray-500 mt-3">
                  Your order has been cancelled.
                </p>

              </div>

            ) : (

              <>
                {/* PROGRESS */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border overflow-x-auto">

                  <div className="flex items-center min-w-[700px]">

                    {steps.map((step, index) => {

                      const Icon = step.icon;

                      const completed =
                        index <= activeIndex;

                      return (
                        <div
                          key={step.key}
                          className="flex items-center flex-1"
                        >

                          <div className="flex flex-col items-center">

                            <div
                              className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all
                              ${
                                completed
                                  ? "bg-primary border-primary text-white"
                                  : "bg-gray-100 border-gray-200 text-gray-400"
                              }`}
                            >
                              <Icon size={28} />
                            </div>

                            <p
                              className={`mt-3 text-sm font-semibold text-center
                              ${
                                completed
                                  ? "text-primary"
                                  : "text-gray-400"
                              }`}
                            >
                              {step.label}
                            </p>

                          </div>

                          {index !== steps.length - 1 && (

                            <div
                              className={`flex-1 h-1 mx-2 rounded-full
                              ${
                                index < activeIndex
                                  ? "bg-primary"
                                  : "bg-gray-200"
                              }`}
                            />

                          )}

                        </div>
                      );
                    })}

                  </div>

                </div>

                {/* HISTORY */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border">

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Tracking History
                  </h2>

                  <div className="space-y-5">

                    {history.map((item, index) => (

                      <div
                        key={index}
                        className="flex gap-4"
                      >

                        <div className="flex flex-col items-center">

                          <div className="w-4 h-4 rounded-full bg-primary mt-1"></div>

                          {index !== history.length - 1 && (
                            <div className="w-[2px] flex-1 bg-primary/30"></div>
                          )}

                        </div>

                        <div className="pb-5">

                          <h3 className="font-bold capitalize text-gray-800">
                            {item.status.replaceAll("_", " ")}
                          </h3>

                          <p className="text-gray-500 mt-1">
                            {item.message}
                          </p>

                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(
                              item.created_at
                            ).toLocaleString()}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>
              </>
            )}

          </div>

        )}

      </div>

    </section>
  );
}
