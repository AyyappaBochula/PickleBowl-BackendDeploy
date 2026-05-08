import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:8000/api";

export default function ProductDetail() {

  const { pid } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(null);

  const guestId = localStorage.getItem("guest_id");
  const token = localStorage.getItem("access");

  // =========================
  // HEADERS
  // =========================
  const getHeaders = () => {

    const headers = {
      "Content-Type": "application/json",
    };

    if (guestId) headers["guest-id"] = guestId;
    if (token) headers["Authorization"] = `Bearer ${token}`;

    return headers;
  };

  // =========================
  // FETCH PRODUCT
  // =========================
  useEffect(() => {

    fetch(`${API}/products/${pid}/`)
      .then((res) => res.json())
      .then((res) => {

        const data = res.data || res;

        setProduct(data);

        if (data?.weights?.length > 0) {
          setSelectedWeight(data.weights[0]);
        }

      })
      .catch((err) => console.log(err));

  }, [pid]);

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {

    fetch(`${API}/products/`)
      .then((res) => res.json())
      .then((res) => setProducts(res.data || res))
      .catch((err) => console.log(err));

  }, []);

  if (!product || !selectedWeight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const finalPrice = Number(selectedWeight.price) * qty;

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async () => {

    const payload = {
      product_id: product.id,
      product_weight_id: selectedWeight.id,
      quantity: qty,
    };

    try {

      await axios.post(
        `${API}/cart/add/`,
        payload,
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
  // 🔥 BUY NOW (NEW LOGIC ADDED)
  // =========================
  const handleBuyNow = () => {

    const buyNowData = {
      id: product.id,
      name: product.name,
      price: selectedWeight.price,
      qty: qty,
      image: product.image
    };

    navigate("/checkout", {
      state: buyNowData
    });

  };

  // =========================
  // SIMILAR PRODUCTS
  // =========================
  const similarProducts = (products || [])
    .filter((item) =>
      item.id !== product.id &&
      item.category?.slug &&
      product.category?.slug &&
      item.category.slug === product.category.slug
    )
    .slice(0, 10);

  // =========================
  // UI (UNCHANGED)
  // =========================
  return (

    <section className="bg-cream py-10 min-h-screen">

      <div className="max-w-6xl mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-10">

          {/* IMAGE */}
          <div className="bg-white rounded-3xl p-6 flex items-center justify-center">
            <img
              src={product.image || "/logo.png"}
              className="max-h-[350px] object-contain"
            />
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-3xl p-6">

            <h1 className="text-3xl font-bold">{product.name}</h1>

            <p className="text-4xl font-bold text-primary mt-5">
              ₹{finalPrice}
            </p>

            {/* WEIGHTS */}
            <div className="mt-6 flex flex-wrap gap-2">

              {product.weights?.map((w) => (

                <button
                  key={w.id}
                  onClick={() => setSelectedWeight(w)}
                  className={`px-3 py-2 border rounded-full text-sm ${
                    selectedWeight.id === w.id
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  {w.weight_in_grams}g - ₹{w.price}
                </button>

              ))}

            </div>

            {/* QTY */}
            <div className="mt-6 flex items-center gap-4">

              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>
                -
              </button>

              <span>{qty}</span>

              <button onClick={() => setQty(qty + 1)}>
                +
              </button>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-10">

              {/* 🔥 BUY NOW FIXED */}
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

        {/* SIMILAR PRODUCTS */}
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