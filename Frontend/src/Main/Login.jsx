import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    // VALIDATION
    if (!form.mobile || !form.password) {
      setError("Please fill all fields");
      return;
    }

    if (form.mobile.length !== 10) {
      setError("Enter valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/customers/login/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            mobile: form.mobile,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (data.status) {

        // SAVE LOGIN DATA
        localStorage.setItem(
          "user",
          JSON.stringify({
            user_id: data.user_id,
            access: data.access,
            refresh: data.refresh,
          })
        );

        // 🔥 UPDATE NAVBAR WITHOUT REFRESH
        window.dispatchEvent(new Event("storage"));

        navigate("/");
      } else {

        if (data.errors) {
          const firstError = Object.values(data.errors)[0];

          setError(
            Array.isArray(firstError)
              ? firstError[0]
              : "Login failed"
          );
        } else {
          setError("Invalid mobile or password");
        }
      }

    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-cream min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-soft p-8">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome Back
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Login with your mobile number
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* MOBILE */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Mobile Number
              </label>

              <div className="flex mt-1">

                <span className="px-3 flex items-center bg-gray-100 border border-r-0 rounded-l-xl text-sm text-gray-600">
                  +91
                </span>

                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  maxLength={10}
                  className="
                    w-full px-4 py-2
                    border border-gray-300 rounded-r-xl
                    focus:outline-none focus:border-primary
                  "
                />

              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative mt-1">

                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="
                    w-full px-4 py-2
                    rounded-xl border border-gray-300
                    focus:outline-none focus:border-primary
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-2 text-gray-500 text-sm"
                >
                  {showPass ? "🙈" : "👁"}
                </button>

              </div>
            </div>

            {/* LOGIN BTN */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full bg-primary text-white
                py-3 rounded-xl font-semibold
                hover:scale-[1.02] transition
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* FOOTER */}
          <div className="text-center mt-6 text-sm text-gray-600">

            Don’t have an account?{" "}

            <span
              onClick={() => navigate("/register")}
              className="text-primary font-medium cursor-pointer"
            >
              Register
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}
