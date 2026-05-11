
// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // import {
// //   Menu,
// //   X,
// //   Search,
// //   ShoppingCart,
// //   ChevronDown,
// //   LogOut,
// //   User,
// //   Truck
// // } from "lucide-react";

// // import axios from "axios";

// // const API = "http://localhost:8000/api";

// // export default function Navbar() {

// //   const navigate = useNavigate();

// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [moreOpen, setMoreOpen] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);

// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [cartCount, setCartCount] = useState(0);

// //   // SEARCH
// //   const [search, setSearch] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const [mainCategories, setMainCategories] = useState([]);
// //   const [moreCategories, setMoreCategories] = useState([]);

// //   // =========================
// //   // AUTH HEADERS
// //   // =========================
// //   const guestId = localStorage.getItem("guest_id");
// //   const token = localStorage.getItem("access");

// //   const headers = {
// //     "Content-Type": "application/json",
// //     "guest-id": guestId || "",
// //     ...(token && {
// //       Authorization: `Bearer ${token}`,
// //     }),
// //   };

// //   // =========================
// //   // SEARCH
// //   // =========================
// //   const handleSearch = async (value) => {

// //     setSearch(value);

// //     if (value.trim().length < 2) {
// //       setSearchResults([]);
// //       return;
// //     }

// //     try {

// //       setLoading(true);

// //       const res = await axios.get(
// //         `${API}/products/search/?search=${value}`
// //       );

// //       setSearchResults(res.data);

// //     } catch (err) {

// //       console.log(err);

// //     } finally {

// //       setLoading(false);
// //     }
// //   };

// //   // =========================
// //   // LOAD CART
// //   // =========================
// //   const loadCartCount = async () => {

// //     try {

// //       const res = await axios.get(
// //         `${API}/cart/`,
// //         { headers }
// //       );

// //       const items = res.data.data?.items || [];

// //       setCartCount(items.length);

// //     } catch (err) {

// //       console.log(err);

// //       setCartCount(0);
// //     }
// //   };

// //   // =========================
// //   // FETCH CATEGORIES
// //   // =========================
// //   useEffect(() => {

// //     fetch(`${API}/products/categories/`)
// //       .then((res) => res.json())
// //       .then((data) => {

// //         setMainCategories(
// //           data.slice(0, 4).map((cat) => ({
// //             name: cat.name,
// //             path: `/category/${cat.slug}`,
// //           }))
// //         );

// //         setMoreCategories(
// //           data.slice(4).map((cat) => ({
// //             name: cat.name,
// //             path: `/category/${cat.slug}`,
// //           }))
// //         );

// //       })
// //       .catch((err) => console.log(err));

// //   }, []);

// //   // =========================
// //   // LOGIN + CART
// //   // =========================
// //   useEffect(() => {

// //     const updateState = () => {

// //       const user = localStorage.getItem("user");

// //       setIsLoggedIn(!!user);

// //       loadCartCount();
// //     };

// //     updateState();

// //     window.addEventListener("storage", updateState);

// //     window.addEventListener("focus", updateState);

// //     window.addEventListener("cartUpdated", loadCartCount);

// //     return () => {

// //       window.removeEventListener(
// //         "storage",
// //         updateState
// //       );

// //       window.removeEventListener(
// //         "focus",
// //         updateState
// //       );

// //       window.removeEventListener(
// //         "cartUpdated",
// //         loadCartCount
// //       );
// //     };

// //   }, []);

// //   // =========================
// //   // SCROLL EFFECT
// //   // =========================
// //   useEffect(() => {

// //     const handleScroll = () =>
// //       setScrolled(window.scrollY > 10);

// //     window.addEventListener(
// //       "scroll",
// //       handleScroll
// //     );

// //     return () =>
// //       window.removeEventListener(
// //         "scroll",
// //         handleScroll
// //       );

// //   }, []);

// //   // =========================
// //   // NAVIGATION
// //   // =========================
// //   const go = (path) => {

// //     navigate(path);

// //     setMenuOpen(false);
// //     setMoreOpen(false);
// //   };

// //   // =========================
// //   // LOGOUT
// //   // =========================
// //   const handleLogout = () => {

// //     localStorage.removeItem("user");

// //     setIsLoggedIn(false);

// //     window.dispatchEvent(
// //       new Event("cartUpdated")
// //     );

// //     navigate("/");
// //   };

// //   return (

// //     <header
// //       className={`sticky top-0 z-50 bg-white transition ${
// //         scrolled
// //           ? "shadow-sm border-b"
// //           : ""
// //       }`}
// //     >

// //       <div className="max-w-6xl mx-auto px-4">

// //         {/* TOP */}
// //         <div className="flex items-center justify-between py-3">

// //           {/* LOGO */}
// //           <div
// //             onClick={() => go("/")}
// //             className="flex items-center gap-2 cursor-pointer"
// //           >

// //             <img
// //               src="/logo.png"
// //               className="h-9"
// //             />

// //             <h1 className="font-bold text-lg text-primary">
// //               PickleBowl
// //             </h1>

// //           </div>

// //           {/* CATEGORY NAV */}
// //           <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">

// //             {mainCategories.map((cat) => (

// //               <button
// //                 key={cat.path}
// //                 onClick={() => go(cat.path)}
// //                 className="hover:text-primary"
// //               >
// //                 {cat.name}
// //               </button>

// //             ))}

// //             {moreCategories.length > 0 && (

// //               <div className="relative">

// //                 <button
// //                   onClick={() =>
// //                     setMoreOpen(!moreOpen)
// //                   }
// //                   className="flex items-center gap-1 hover:text-primary"
// //                 >
// //                   More
// //                   <ChevronDown size={14} />
// //                 </button>

// //                 {moreOpen && (

// //                   <div className="absolute top-8 w-44 bg-orange-50 border rounded-xl shadow overflow-hidden z-50">

// //                     {moreCategories.map((item) => (

// //                       <div
// //                         key={item.path}
// //                         onClick={() =>
// //                           go(item.path)
// //                         }
// //                         className="px-4 py-2 text-sm hover:bg-primary hover:text-white cursor-pointer"
// //                       >
// //                         {item.name}
// //                       </div>

// //                     ))}

// //                   </div>

// //                 )}

// //               </div>

// //             )}

// //           </div>

// //           {/* RIGHT */}
// //           <div className="flex items-center gap-2">

// //             {/* SEARCH BAR */}
// //             <div className="hidden md:block relative">

// //               <div className="flex items-center bg-gray-100 rounded-xl px-4 w-[260px]">

// //                 <Search
// //                   size={18}
// //                   className="text-gray-400"
// //                 />

// //                 <input
// //                   type="text"
// //                   value={search}
// //                   onChange={(e) =>
// //                     handleSearch(e.target.value)
// //                   }
// //                   placeholder="Search pickles..."
// //                   className="w-full bg-transparent px-3 py-2.5 outline-none text-sm"
// //                 />

// //               </div>

// //               {/* SEARCH RESULTS */}
// //               {search.length >= 2 && (

// //                 <div className="absolute top-12 left-0 w-[320px] bg-white border rounded-2xl shadow-xl overflow-hidden z-50">

// //                   {loading ? (

// //                     <div className="p-4 text-sm text-gray-500">
// //                       Searching...
// //                     </div>

// //                   ) : searchResults.length > 0 ? (

// //                     searchResults.map((product) => (

// //                       <div
// //                         key={product.id}
// //                         onClick={() => {
// //                           navigate(`/product/${product.id}`);
// //                           setSearch("");
// //                           setSearchResults([]);
// //                         }}
// //                         className="flex items-center gap-3 p-3 hover:bg-orange-50 cursor-pointer border-b"
// //                       >

// //                         {/* <img
// //                           // src={product.image}
// //                           alt={product.name}
// //                           className="w-14 h-14 object-cover rounded-lg"
// //                         /> */}

// //                         <div className="flex-1">

// //                           <h3 className="text-sm font-medium text-gray-800">
// //                             {product.name}
// //                           </h3>

// //                           <p className="text-xs text-gray-500">
// //                             ₹{product.price_per_kg}/kg
// //                           </p>

// //                         </div>

// //                       </div>

// //                     ))

// //                   ) : (

// //                     <div className="p-4 text-sm text-gray-500">
// //                       No products found
// //                     </div>

// //                   )}

// //                 </div>

// //               )}

// //             </div>

// //             {/* CART */}
// //             <button
// //               onClick={() => go("/cart")}
// //               className="relative p-2 hover:bg-gray-100 rounded-full"
// //             >

// //               <ShoppingCart size={20} />

// //               {cartCount > 0 && (

// //                 <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] px-1.5 rounded-full">
// //                   {cartCount}
// //                 </span>

// //               )}

// //             </button>

// //             {/* TRACK */}
// //             <button
// //               onClick={() => go("/tracking")}
// //               className="hidden md:flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm hover:border-primary hover:text-primary"
// //             >

// //               <Truck size={16} />

// //               Track Order

// //             </button>

// //             {/* LOGIN */}
// //             {!isLoggedIn ? (

// //               <button
// //                 onClick={() => go("/login")}
// //                 className="hidden md:flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm hover:border-primary hover:text-primary"
// //               >

// //                 <User size={16} />

// //                 Login

// //               </button>

// //             ) : (

// //               <div className="hidden md:flex items-center gap-2">

// //                 <button
// //                   onClick={() => go("/profile")}
// //                   className="flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm hover:border-primary hover:text-primary"
// //                 >

// //                   <User size={16} />

// //                   Profile

// //                 </button>

// //                 <button
// //                   onClick={handleLogout}
// //                   className="flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm hover:border-red-500 hover:text-red-500"
// //                 >

// //                   <LogOut size={16} />

// //                   Logout

// //                 </button>

// //               </div>

// //             )}

// //             {/* MOBILE MENU */}
// //             <button
// //               className="md:hidden p-2"
// //               onClick={() =>
// //                 setMenuOpen(!menuOpen)
// //               }
// //             >

// //               {menuOpen ? <X /> : <Menu />}

// //             </button>

// //           </div>

// //         </div>

// //       </div>

// //       {/* MOBILE MENU */}
// //       {menuOpen && (

// //         <div className="md:hidden bg-white border-t">

// //           <button
// //             onClick={() => go("/tracking")}
// //             className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
// //           >
// //             Track Order
// //           </button>

// //           {[...mainCategories, ...moreCategories].map((item) => (

// //             <button
// //               key={item.path}
// //               onClick={() => go(item.path)}
// //               className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
// //             >
// //               {item.name}
// //             </button>

// //           ))}

// //         </div>

// //       )}

// //     </header>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Search,
//   ShoppingCart,
//   ChevronDown,
//   LogOut,
//   User,
// } from "lucide-react";
// import axios from "axios";

// const API = "http://localhost:8000/api";

// export default function Navbar() {

//   const navigate = useNavigate();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [moreOpen, setMoreOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   const [mainCategories, setMainCategories] = useState([]);
//   const [moreCategories, setMoreCategories] = useState([]);

//   // =========================
//   // AUTH HEADERS
//   // =========================
//   const guestId = localStorage.getItem("guest_id");
//   const token = localStorage.getItem("access");

//   const headers = {
//     "Content-Type": "application/json",
//     "guest-id": guestId || "",
//     ...(token && { Authorization: `Bearer ${token}` }),
//   };

//   // =========================
//   // LOAD CART (ITEM COUNT ONLY)
//   // =========================
//   const loadCartCount = async () => {
//     try {

//       const res = await axios.get(`${API}/cart/`, { headers });

//       const items = res.data.data?.items || [];

//       // 🔥 ONLY ITEM COUNT (NOT QTY, NOT LOCAL STORAGE)
//       setCartCount(items.length);

//     } catch (err) {
//       console.log(err);
//       setCartCount(0);
//     }
//   };

//   // =========================
//   // FETCH CATEGORIES
//   // =========================
//   useEffect(() => {

//     fetch(`${API}/products/categories/`)
//       .then((res) => res.json())
//       .then((data) => {

//         setMainCategories(
//           data.slice(0, 4).map((cat) => ({
//             name: cat.name,
//             path: `/category/${cat.slug}`,
//           }))
//         );

//         setMoreCategories(
//           data.slice(4).map((cat) => ({
//             name: cat.name,
//             path: `/category/${cat.slug}`,
//           }))
//         );

//       })
//       .catch((err) => console.log(err));

//   }, []);

//   // =========================
//   // LOGIN + CART SYNC
//   // =========================
//   useEffect(() => {

//     const updateState = () => {

//       const user = localStorage.getItem("user");
//       setIsLoggedIn(!!user);

//       loadCartCount();
//     };

//     updateState();

//     window.addEventListener("storage", updateState);
//     window.addEventListener("focus", updateState);
//     window.addEventListener("cartUpdated", loadCartCount);

//     return () => {
//       window.removeEventListener("storage", updateState);
//       window.removeEventListener("focus", updateState);
//       window.removeEventListener("cartUpdated", loadCartCount);
//     };

//   }, []);

//   // =========================
//   // SCROLL EFFECT
//   // =========================
//   useEffect(() => {

//     const handleScroll = () => setScrolled(window.scrollY > 10);

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);

//   }, []);

//   // =========================
//   // NAV
//   // =========================
//   const go = (path) => {
//     navigate(path);
//     setMenuOpen(false);
//     setSearchOpen(false);
//     setMoreOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");

//     setIsLoggedIn(false);

//     window.dispatchEvent(new Event("cartUpdated"));

//     navigate("/");
//   };

//   return (
//     <header className={`sticky top-0 z-50 bg-white transition ${scrolled ? "shadow-sm border-b" : ""}`}>

//       <div className="max-w-6xl mx-auto px-4">

//         {/* TOP */}
//         <div className="flex items-center justify-between py-3">

//           {/* LOGO */}
//           <div
//             onClick={() => go("/")}
//             className="flex items-center gap-2 cursor-pointer"
//           >
//             <img src="/logo.png" className="h-9" />
//             <h1 className="font-bold text-lg text-primary">
//               PickleBowl
//             </h1>
//           </div>

//           {/* NAV */}
//           <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">

//             {mainCategories.map((cat) => (
//               <button
//                 key={cat.path}
//                 onClick={() => go(cat.path)}
//                 className="hover:text-primary"
//               >
//                 {cat.name}
//               </button>
//             ))}

//             {moreCategories.length > 0 && (
//               <div className="relative">

//                 <button
//                   onClick={() => setMoreOpen(!moreOpen)}
//                   className="flex items-center gap-1 hover:text-primary"
//                 >
//                   More <ChevronDown size={14} />
//                 </button>

//                 {moreOpen && (
//                   <div className="absolute top-8 w-44 bg-orange-50 border rounded-xl shadow">

//                     {moreCategories.map((item) => (
//                       <div
//                         key={item.path}
//                         onClick={() => go(item.path)}
//                         className="px-4 py-2 text-sm hover:bg-primary hover:text-white cursor-pointer"
//                       >
//                         {item.name}
//                       </div>
//                     ))}

//                   </div>
//                 )}

//               </div>
//             )}

//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center gap-2">

//             {/* SEARCH */}
//             <button
//               onClick={() => setSearchOpen(!searchOpen)}
//               className="p-2 hover:bg-gray-100 rounded-full"
//             >
//               <Search size={18} />
//             </button>

//             {/* CART */}
//             <button
//               onClick={() => go("/cart")}
//               className="relative p-2 hover:bg-gray-100 rounded-full"
//             >
//               <ShoppingCart size={20} />

//               {/* 🔥 ITEM COUNT ONLY */}
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] px-1.5 rounded-full">
//                   {cartCount}
//                 </span>
//               )}

//             </button>

//             {/* LOGIN / PROFILE */}
//             {!isLoggedIn ? (
//               <button
//                 onClick={() => go("/login")}
//                 className="hidden md:flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm hover:border-primary hover:text-primary"
//               >
//                 <User size={16} />
//                 Login
//               </button>
//             ) : (
//               <div className="hidden md:flex items-center gap-2">

//                 <button
//                   onClick={() => go("/profile")}
//                   className="flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm hover:border-primary hover:text-primary"
//                 >
//                   <User size={16} />
//                   Profile
//                 </button>

//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm hover:border-red-500 hover:text-red-500"
//                 >
//                   <LogOut size={16} />
//                   Logout
//                 </button>

//               </div>
//             )}

//             {/* MOBILE */}
//             <button
//               className="md:hidden p-2"
//               onClick={() => setMenuOpen(!menuOpen)}
//             >
//               {menuOpen ? <X /> : <Menu />}
//             </button>

//           </div>

//         </div>

//         {/* SEARCH */}
//         {searchOpen && (
//           <div className="pb-3">
//             <input
//               placeholder="Search pickles..."
//               className="w-full px-4 py-2 border rounded-xl bg-gray-50"
//             />
//           </div>
//         )}

//         {/* MOBILE MENU */}
//         {menuOpen && (
//           <div className="md:hidden bg-white border rounded-xl mt-2 overflow-hidden">

//             {[...mainCategories, ...moreCategories].map((item) => (
//               <button
//                 key={item.path}
//                 onClick={() => go(item.path)}
//                 className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
//               >
//                 {item.name}
//               </button>
//             ))}

//           </div>
//         )}

//       </div>
//     </header>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  Search,
  ShoppingCart,
  ChevronDown,
  LogOut,
  User,
  Truck,
} from "lucide-react";

import axios from "axios";

const API = "http://localhost:8000/api";

export default function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // SEARCH
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [mainCategories, setMainCategories] = useState([]);
  const [moreCategories, setMoreCategories] = useState([]);

  // =========================
  // AUTH HEADERS
  // =========================
  const guestId = localStorage.getItem("guest_id");
  const token = localStorage.getItem("access");

  const headers = {
    "Content-Type": "application/json",
    "guest-id": guestId || "",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };

  // =========================
  // SEARCH FUNCTION
  // =========================
  const handleSearch = async (value) => {

    setSearch(value);

    if (value.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    try {

      setLoading(true);

      const res = await axios.get(
        `${API}/products/search/?search=${value}`
      );

      setSearchResults(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // LOAD CART
  // =========================
  const loadCartCount = async () => {

    try {

      const res = await axios.get(
        `${API}/cart/`,
        { headers }
      );

      const items = res.data.data?.items || [];

      setCartCount(items.length);

    } catch (err) {

      console.log(err);

      setCartCount(0);
    }
  };

  // =========================
  // FETCH CATEGORIES
  // =========================
  useEffect(() => {

    fetch(`${API}/products/categories/`)
      .then((res) => res.json())
      .then((data) => {

        setMainCategories(
          data.slice(0, 4).map((cat) => ({
            name: cat.name,
            path: `/category/${cat.slug}`,
          }))
        );

        setMoreCategories(
          data.slice(4).map((cat) => ({
            name: cat.name,
            path: `/category/${cat.slug}`,
          }))
        );

      })
      .catch((err) => console.log(err));

  }, []);

  // =========================
  // LOGIN + CART SYNC
  // =========================
  useEffect(() => {

    const updateState = () => {

      const user = localStorage.getItem("user");

      setIsLoggedIn(!!user);

      loadCartCount();
    };

    updateState();

    window.addEventListener("storage", updateState);

    window.addEventListener("focus", updateState);

    window.addEventListener("cartUpdated", loadCartCount);

    return () => {

      window.removeEventListener(
        "storage",
        updateState
      );

      window.removeEventListener(
        "focus",
        updateState
      );

      window.removeEventListener(
        "cartUpdated",
        loadCartCount
      );
    };

  }, []);

  // =========================
  // SCROLL EFFECT
  // =========================
  useEffect(() => {

    const handleScroll = () =>
      setScrolled(window.scrollY > 10);

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  // =========================
  // NAVIGATION
  // =========================
  const go = (path) => {

    navigate(path);

    setMenuOpen(false);
    setSearchOpen(false);
    setMoreOpen(false);
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    localStorage.removeItem("user");

    setIsLoggedIn(false);

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    navigate("/");
  };

  return (

    <header
      className={`sticky top-0 z-50 bg-white transition ${
        scrolled
          ? "shadow-sm border-b"
          : ""
      }`}
    >

      <div className="max-w-6xl mx-auto px-4">

        {/* TOP */}
        <div className="flex items-center justify-between py-3">

          {/* LOGO */}
          <div
            onClick={() => go("/")}
            className="flex items-center gap-2 cursor-pointer"
          >

            <img
              src="/logo.png"
              className="h-9"
            />

            <h1 className="font-bold text-lg text-primary">
              PickleBowl
            </h1>

          </div>

          {/* NAV */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">

            {mainCategories.map((cat) => (

              <button
                key={cat.path}
                onClick={() => go(cat.path)}
                className="hover:text-primary"
              >
                {cat.name}
              </button>

            ))}

            {moreCategories.length > 0 && (

              <div className="relative">

                <button
                  onClick={() =>
                    setMoreOpen(!moreOpen)
                  }
                  className="flex items-center gap-1 hover:text-primary"
                >

                  More

                  <ChevronDown size={14} />

                </button>

                {moreOpen && (

                  <div className="absolute top-8 w-44 bg-orange-50 border rounded-xl shadow overflow-hidden z-50">

                    {moreCategories.map((item) => (

                      <div
                        key={item.path}
                        onClick={() =>
                          go(item.path)
                        }
                        className="px-4 py-2 text-sm hover:bg-primary hover:text-white cursor-pointer"
                      >
                        {item.name}
                      </div>

                    ))}

                  </div>

                )}

              </div>

            )}

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">

            {/* SEARCH */}
            <button
              onClick={() =>
                setSearchOpen(!searchOpen)
              }
              className="p-2 hover:bg-gray-100 rounded-full"
            >

              <Search size={18} />

            </button>

            {/* CART */}
            <button
              onClick={() => go("/cart")}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >

              <ShoppingCart size={20} />

              {cartCount > 0 && (

                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] px-1.5 rounded-full">
                  {cartCount}
                </span>

              )}

            </button>

            {/* TRACK ORDER */}
            <button
              onClick={() => go("/tracking")}
              className="hidden md:flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm hover:border-primary hover:text-primary"
            >

              <Truck size={16} />

              Track Order

            </button>

            {/* LOGIN / PROFILE */}
            {!isLoggedIn ? (

              <button
                onClick={() => go("/login")}
                className="hidden md:flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm hover:border-primary hover:text-primary"
              >

                <User size={16} />

                Login

              </button>

            ) : (

              <div className="hidden md:flex items-center gap-2">

                <button
                  onClick={() => go("/profile")}
                  className="flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm hover:border-primary hover:text-primary"
                >

                  <User size={16} />

                  Profile

                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm hover:border-red-500 hover:text-red-500"
                >

                  <LogOut size={16} />

                  Logout

                </button>

              </div>

            )}

            {/* MOBILE MENU */}
            <button
              className="md:hidden p-2"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
            >

              {menuOpen ? <X /> : <Menu />}

            </button>

          </div>

        </div>

        {/* SEARCH BOX */}
        {searchOpen && (

          <div className="pb-3 relative">

            <div className="relative">

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  handleSearch(e.target.value)
                }
                placeholder="Search pickles..."
                className="w-full px-4 py-2 border rounded-xl bg-gray-50 outline-none"
              />

            </div>

            {/* SEARCH RESULTS */}
            {search.length >= 2 && (

              <div className="absolute top-14 left-0 w-full bg-white border rounded-2xl shadow-xl overflow-hidden z-50">

                {loading ? (

                  <div className="p-4 text-sm text-gray-500">
                    Searching...
                  </div>

                ) : searchResults.length > 0 ? (

                  searchResults.map((product) => (

                    <div
                      key={product.id}
                      onClick={() => {

                        navigate(`/product/${product.id}`);

                        setSearch("");

                        setSearchResults([]);

                        setSearchOpen(false);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-orange-50 cursor-pointer border-b"
                    >

                      <div className="flex-1">

                        <h3 className="text-sm font-medium text-gray-800">
                          {product.name}
                        </h3>

                        <p className="text-xs text-gray-500">
                          ₹{product.price_per_kg}/kg
                        </p>

                      </div>

                    </div>

                  ))

                ) : (

                  <div className="p-4 text-sm text-gray-500">
                    No products found
                  </div>

                )}

              </div>

            )}

          </div>

        )}

        {/* MOBILE MENU */}
        {menuOpen && (

          <div className="md:hidden bg-white border rounded-xl mt-2 overflow-hidden">

            {/* TRACK ORDER */}
            <button
              onClick={() => go("/tracking")}
              className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
            >
              Track Order
            </button>

            {[...mainCategories, ...moreCategories].map((item) => (

              <button
                key={item.path}
                onClick={() => go(item.path)}
                className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
              >
                {item.name}
              </button>

            ))}

          </div>

        )}

      </div>

    </header>
  );
}