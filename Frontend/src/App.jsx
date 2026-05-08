import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./Main/Navbar";
import Footer from "./Main/Footer";
import Home from "./Home/Home";
import Login from "./Main/Login";
import Register from "./Main/Register";
import Profile from "./Main/Profile";
import Cart from "./Main/Cart";
import Checkout from "./Main/Checkout";

// Products
import CategoryDetail from "./Products/CategoryDetail";
import ProductDetail from "./Products/ProductDetail";

// 👇 IMPORT UTILITY
import { getGuestId } from "./utils/guestUser";

export default function App() {

  // ✅ CREATE GUEST ID ON FIRST LOAD
  useEffect(() => {

    const guestId = getGuestId();

    console.log("GUEST ID ACTIVE:", guestId);

  }, []);

  return (
    <BrowserRouter>

      <Navbar />

      <div className="max-w-6xl mx-auto px-4">
        <Routes>

          {/* Home */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          {/* Category */}
          <Route path="/category" element={<Navigate to="/category/all" replace />} />
          <Route path="/category/:category" element={<CategoryDetail />} />

          {/* Product */}
          <Route path="/product/:pid" element={<ProductDetail />} />

          {/* Checkout */}
          <Route path="/checkout" element={<Checkout />} />

        </Routes>
      </div>

      <Footer />

    </BrowserRouter>
  );
}