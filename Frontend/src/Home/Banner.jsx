import { useNavigate } from "react-router-dom";

export default function BigBanner() {
  const navigate = useNavigate();

  return (
    <section className="bg-cream py-12">

      <div className="max-w-6xl mx-auto px-4">

        <div className="
          grid md:grid-cols-2
          items-center
          gap-8
          bg-white
          rounded-3xl
          border border-orange-100
          shadow-lg
          overflow-hidden
        ">

          {/* 🔥 LEFT CONTENT */}
          <div className="p-6 md:p-10">

            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
              🌿 PickleBowl Specials
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-4">
              Authentic Homemade Pickles,
              Made Fresh Just for You
            </h2>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed space-y-2">
              Experience the real taste of tradition with our handcrafted pickles.<br />
              Made using age-old recipes passed down generations.<br />
              No preservatives, no shortcuts — only pure ingredients.<br />
              Prepared fresh after every order to maintain quality.<br />
              Choose from veg, non-veg, podis, sweets, and combos.<br />
              Customized spice levels to match your taste.<br />
              Packed hygienically with love and care.<br />
              Trusted by hundreds of happy customers.<br />
            </p>

            {/* CTA */}
            <button
              onClick={() => navigate("/category")}
              className="
                mt-6
                bg-primary text-white
                px-6 py-2.5
                rounded-full
                text-sm md:text-base font-semibold
                shadow-md
                transition-all duration-300
                hover:scale-105 hover:shadow-xl
              "
            >
              🛒 Buy Now
            </button>

          </div>

                    {/* 🖼 RIGHT IMAGE */}
            <div className="relative h-full">

            <img
                src="/logo1.png"
                alt="PickleBowl Products"
                className="
                w-full
                h-full
                min-h-[320px]
                sm:min-h-[360px]
                md:min-h-[420px]
                lg:min-h-[480px]

                object-cover

                md:rounded-r-[30px]   /* 👈 curve effect */
                "
            />

            </div>
        </div>

      </div>

    </section>
  );
}