import { Link, useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const navigate = useNavigate();

  // ✅ smooth navigation + scroll top
  const go = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-orange-100 mt-16">

      <div className="max-w-6xl mx-auto px-4 py-12">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* 🏷 BRAND */}
          <div>
            <h2
              onClick={() => go("/")}
              className="text-xl font-bold text-primary mb-3 cursor-pointer"
            >
              PickleBowl
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              Authentic homemade pickles, podis, sweets & snacks made with
              traditional recipes and love.
            </p>
          </div>

          {/* 🔗 QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm text-gray-600">

              <li>
                <button onClick={() => go("/")} className="hover:text-primary">
                  Home
                </button>
              </li>

              <li>
                <button onClick={() => go("/category/all")} className="hover:text-primary">
                  Shop
                </button>
              </li>

              <li>
                <button onClick={() => go("/category/all")} className="hover:text-primary">
                  Categories
                </button>
              </li>

              <li>
                <button onClick={() => go("/profile")} className="hover:text-primary">
                  My Account
                </button>
              </li>

            </ul>
          </div>

          {/* 🛍 CATEGORIES */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Categories
            </h3>

            <ul className="space-y-2 text-sm text-gray-600">

              <li><button onClick={() => go("/category/veg")} className="hover:text-primary">Veg Pickles</button></li>
              <li><button onClick={() => go("/category/nonveg")} className="hover:text-primary">Non-Veg Pickles</button></li>
              <li><button onClick={() => go("/category/podis")} className="hover:text-primary">Podis</button></li>
              <li><button onClick={() => go("/category/sweets")} className="hover:text-primary">Sweets</button></li>
              <li><button onClick={() => go("/category/snacks")} className="hover:text-primary">Snacks</button></li>

            </ul>
          </div>

          {/* 📞 CONTACT */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Contact Us
            </h3>

            <div className="space-y-3 text-sm text-gray-600">

              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Phone size={16} />
                +91 98765 43210
              </a>

              <a
                href="mailto:support@picklebowl.com"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Mail size={16} />
                support@picklebowl.com
              </a>

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                Hyderabad, India
              </div>

            </div>

            {/* 🌐 SOCIAL */}
            <div className="flex gap-3 mt-4">

              <a
                href="https://facebook.com"
                target="_blank"
                className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition"
              >
                <FaInstagram size={14} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition"
              >
                <FaTwitter size={14} />
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* 🔻 BOTTOM */}
      <div className="border-t border-gray-100 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PickleBowl. All rights reserved.
      </div>

    </footer>
  );
}