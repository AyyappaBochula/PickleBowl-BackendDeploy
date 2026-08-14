import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    street: "",
    village: "",
    district: "",
    state: "",
    pincode: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT
  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    // VALIDATION
    if (
      !form.name ||
      !form.mobile ||
      !form.password ||
      !form.confirmPassword ||
      !form.street ||
      !form.village ||
      !form.district ||
      !form.state ||
      !form.pincode
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (form.mobile.length !== 10) {
      setError("Enter valid mobile number");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.pincode.length !== 6) {
      setError("Enter valid pincode");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/customers/register/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: form.name,
            mobile: form.mobile,
            email: form.email,
            password: form.password,
            confirm_password: form.confirmPassword,
            street: form.street,
            village: form.village,
            district: form.district,
            state: form.state,
            pincode: form.pincode,
          }),
        }
      );

      const data = await response.json();

      if (data.status) {
        alert("Registration Successful");
        navigate("/login");
      } else {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0];
          setError(
            Array.isArray(firstError)
              ? firstError[0]
              : "Registration failed"
          );
        } else {
          setError("Registration failed");
        }
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-cream min-h-screen flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl">

        <div className="bg-white rounded-3xl shadow-soft p-8">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Account 
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Join and start ordering homemade pickles
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          {/* FORM */}
          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="input"
            />

            {/* MOBILE */}
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              maxLength={10}
              className="input"
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={handleChange}
              className="input md:col-span-2"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="input"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="input"
              />
            </div>

            {/* STREET */}
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={form.street}
              onChange={handleChange}
              className="input md:col-span-2"
            />

            {/* VILLAGE */}
            <input
              type="text"
              name="village"
              placeholder="Village / City"
              value={form.village}
              onChange={handleChange}
              className="input"
            />

            {/* DISTRICT */}
            <input
              type="text"
              name="district"
              placeholder="District"
              value={form.district}
              onChange={handleChange}
              className="input"
            />

            {/* STATE */}
            <input
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="input"
            />

            {/* PINCODE */}
            <input
              type="number"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              className="input"
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                md:col-span-2
                bg-primary text-white py-3 rounded-xl
                font-semibold hover:scale-[1.02] transition
              "
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="text-center mt-5 text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-primary font-medium cursor-pointer"
            >
              Login
            </span>
          </div>

        </div>

      </div>

      {/* 🔥 REUSABLE INPUT STYLE */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 10px 14px;
            border-radius: 12px;
            border: 1px solid #d1d5db;
            outline: none;
            transition: 0.2s;
          }

          .input:focus {
            border-color: #f97316;
          }
        `}
      </style>

    </section>
  );
}
