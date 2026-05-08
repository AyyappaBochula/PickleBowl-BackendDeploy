import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: ""
  });

  // =========================
  // LOAD CART ITEMS (DEMO)
  // =========================
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checkout_items")) || [];
    setItems(data);
  }, []);

  // =========================
  // TOTAL
  // =========================
  const total = items.reduce(
    (acc, item) => acc + item.total_price,
    0
  );

  // =========================
  // PLACE ORDER (DEMO)
  // =========================
  const placeOrder = () => {

    if (!address.name || !address.phone) {
      alert("Please fill delivery details");
      return;
    }

    setTimeout(() => {
      localStorage.removeItem("checkout_items");
      alert("🎉 Order Placed Successfully!");
      navigate("/");
    }, 800);
  };

  return (
    <section className="bg-cream min-h-screen py-10">

      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-8">

        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* DELIVERY ADDRESS */}
          <div className="bg-white rounded-3xl p-6 shadow">

            <h2 className="text-lg font-bold mb-4">
              📍 Delivery Address
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                placeholder="Full Name"
                className="border p-3 rounded-xl"
                onChange={(e) =>
                  setAddress({ ...address, name: e.target.value })
                }
              />

              <input
                placeholder="Phone Number"
                className="border p-3 rounded-xl"
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />

              <input
                placeholder="Street Address"
                className="border p-3 rounded-xl md:col-span-2"
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />

              <input
                placeholder="City"
                className="border p-3 rounded-xl"
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />

              <input
                placeholder="Pincode"
                className="border p-3 rounded-xl"
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
              />

            </div>

          </div>

          {/* ITEMS */}
          <div className="bg-white rounded-3xl p-6 shadow">

            <h2 className="text-lg font-bold mb-4">
              🛒 Items
            </h2>

            <div className="space-y-4">

              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b pb-3"
                >

                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.qty}
                    </p>
                  </div>

                  <p className="font-semibold text-primary">
                    ₹{item.total_price}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE (ORDER SUMMARY) ================= */}
        <div className="bg-white rounded-3xl p-6 shadow-lg h-fit sticky top-20">

          <h2 className="text-lg font-bold mb-4">
            🧾 Order Summary
          </h2>

          {/* SUMMARY BOX */}
          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Items Total</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">₹{total}</span>
            </div>

          </div>

          {/* PLACE ORDER */}
          <button
            onClick={placeOrder}
            className="w-full mt-6 bg-primary text-white py-3 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Place Order
          </button>

        </div>

      </div>

    </section>
  );
}