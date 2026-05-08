import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

const API = "http://localhost:8000/api";

export default function Cart() {

  const [cart, setCart] = useState({ items: [] });
  const [productsMap, setProductsMap] = useState({});

  const navigate = useNavigate();

  const guestId = localStorage.getItem("guest_id");
  const token = localStorage.getItem("access");

  const headers = {
    "Content-Type": "application/json",
    "guest-id": guestId || "",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  // =========================
  // CART UPDATE EVENT (NAVBAR LIVE UPDATE)
  // =========================
  const notifyCartUpdate = () => {
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // =========================
  // LOAD CART
  // =========================
  const loadCart = async () => {
    try {
      const res = await axios.get(`${API}/cart/`, { headers });
      const items = res.data.data?.items || [];

      setCart({ items });
      fetchProducts(items);

    } catch (err) {
      console.log(err);
      setCart({ items: [] });
    }
  };

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async (items) => {

    const map = {};

    for (const item of items) {
      if (!map[item.product]) {
        try {
          const res = await axios.get(`${API}/products/${item.product}/`);
          map[item.product] = res.data;
        } catch (err) {
          console.log(err);
        }
      }
    }

    setProductsMap(map);
  };

  useEffect(() => {
    loadCart();
  }, []);

  // =========================
  // QTY UPDATE
  // =========================
  const updateQty = async (item, change) => {

    const newQty = item.quantity + change;

    if (newQty < 1) {
      await removeItem(item.id);
      return;
    }

    await axios.post(
      `${API}/cart/update-qty/`,
      {
        item_id: item.id,
        quantity: newQty
      },
      { headers }
    );

    notifyCartUpdate();
    loadCart();
  };

  // =========================
  // CHANGE WEIGHT
  // =========================
  const changeWeight = async (item, weightId) => {

    if (item.product_weight === weightId) return;

    await axios.post(
      `${API}/cart/update/`,
      {
        item_id: item.id,
        product_weight_id: weightId,
        quantity: item.quantity
      },
      { headers }
    );

    notifyCartUpdate();
    loadCart();
  };

  // =========================
  // REMOVE ITEM
  // =========================
  const removeItem = async (id) => {

    await axios.delete(`${API}/cart/remove/${id}/`, { headers });

    notifyCartUpdate();
    loadCart();
  };

  // =========================
  // 👉 CHECKOUT FROM CART (NEW DEMO LOGIC)
  // =========================
  const handleCheckout = () => {

    const items = cart.items.map((item) => ({
      id: item.id,
      name: item.product_name,
      qty: item.quantity,
      total_price: item.total_price,
    }));

    localStorage.setItem(
      "checkout_items",
      JSON.stringify(items)
    );

    navigate("/checkout");
  };

  // =========================
  // TOTAL
  // =========================
  const total = cart.items?.reduce(
    (acc, item) => acc + Number(item.total_price || 0),
    0
  );

  // =========================
  // EMPTY CART
  // =========================
  if (!cart.items.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream">

        <ShoppingCart size={80} className="text-primary mb-4" />

        <h2 className="text-2xl font-bold">Your Cart is Empty</h2>

        <p className="text-gray-500 mt-2">
          Add delicious products 🍯
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-primary text-white px-6 py-3 rounded-2xl"
        >
          Buy Now
        </button>

      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <section className="bg-cream min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-8">

        {/* ================= LEFT CART ================= */}
        <div className="lg:col-span-2 space-y-6">

          {cart.items.map((item) => {

            const product = productsMap[item.product];
            const weights = product?.weights || [];

            return (

              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 flex gap-5 items-center shadow-md hover:shadow-lg transition"
              >

                {/* IMAGE */}
                <img
                  src={item.product_image || product?.image || "/logo.png"}
                  className="w-24 h-24 object-contain rounded-xl"
                />

                {/* DETAILS */}
                <div className="flex-1">

                  <h3 className="font-semibold text-lg">
                    {item.product_name}
                  </h3>

                  {/* WEIGHTS */}
                  <div className="flex gap-2 mt-3 flex-wrap">

                    {weights.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => changeWeight(item, w.id)}
                        className={`px-3 py-1 text-xs rounded-full border transition
                          ${item.product_weight === w.id
                            ? "bg-primary text-white border-primary"
                            : "bg-white border-gray-300 hover:border-primary"}`}
                      >
                        {w.weight_in_grams >= 1000
                          ? `${w.weight_in_grams / 1000}kg`
                          : `${w.weight_in_grams}g`}
                      </button>
                    ))}

                  </div>

                  <p className="text-primary font-bold mt-3 text-lg">
                    ₹{item.total_price}
                  </p>

                </div>

                {/* QTY */}
                <div className="flex flex-col items-center gap-3">

                  <div className="flex items-center bg-cream rounded-full px-3 py-1">

                    <button onClick={() => updateQty(item, -1)}>
                      <Minus size={16} />
                    </button>

                    <span className="px-3 font-medium">
                      {item.quantity}
                    </span>

                    <button onClick={() => updateQty(item, 1)}>
                      <Plus size={16} />
                    </button>

                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:scale-110 transition"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            );

          })}

        </div>

        {/* ================= RIGHT ORDER SUMMARY ================= */}
        <div className="bg-white p-6 rounded-3xl shadow-xl sticky top-20 h-fit">

          <h2 className="text-xl font-bold mb-5">
            🧾 Order Summary
          </h2>

          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">

            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start border-b pb-3"
              >

                <div>
                  <p className="font-medium text-gray-800">
                    {item.product_name}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="text-primary font-semibold">
                  ₹{item.total_price}
                </p>

              </div>
            ))}

          </div>

          {/* TOTAL */}
          <div className="mt-5 bg-cream p-4 rounded-2xl flex justify-between items-center">

            <span className="font-bold text-gray-700">
              Total
            </span>

            <span className="text-xl font-bold text-primary">
              ₹{total?.toFixed(0)}
            </span>

          </div>

          {/* CHECKOUT BUTTON (NOW WORKING) */}
          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-primary text-white py-3 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Proceed to Checkout
          </button>

        </div>

      </div>

    </section>
  );
}