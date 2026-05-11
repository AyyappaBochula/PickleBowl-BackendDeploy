import { useState } from "react";
import axios from "axios";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api";

export default function SearchBar({ closeSearch }) {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {

    setSearch(value);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    try {

      setLoading(true);

      const res = await axios.get(
        `${API}/products/search/?search=${value}`
      );

      setResults(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="absolute left-0 top-16 w-full bg-white border-t shadow-lg z-50">

      <div className="max-w-4xl mx-auto p-4">

        {/* SEARCH INPUT */}
        <div className="flex items-center border rounded-xl overflow-hidden bg-gray-50">

          <div className="px-4 text-gray-500">
            <Search size={18} />
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search pickles..."
            className="flex-1 px-2 py-3 bg-transparent outline-none"
            autoFocus
          />

          <button
            onClick={closeSearch}
            className="px-4 text-gray-500 hover:text-red-500"
          >
            <X size={18} />
          </button>

        </div>

        {/* RESULTS */}
        <div className="mt-3 bg-white rounded-xl overflow-hidden">

          {loading ? (

            <div className="p-4 text-sm text-gray-500">
              Searching...
            </div>

          ) : results.length > 0 ? (

            results.map((product) => (

              <div
                key={product.id}
                onClick={() => {
                  navigate(`/product/${product.id}`);
                  closeSearch();
                }}
                className="flex items-center gap-4 p-3 hover:bg-orange-50 cursor-pointer border-b"
              >

                <img
                  src={`http://localhost:8000${product.image}`}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex-1">

                  <h3 className="font-medium text-gray-800">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    ₹{product.price_per_kg}/kg
                  </p>

                </div>

              </div>

            ))

          ) : search.length >= 2 ? (

            <div className="p-4 text-sm text-gray-500">
              No products found
            </div>

          ) : null}

        </div>

      </div>

    </div>

  );
}