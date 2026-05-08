import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const slides = [
    "/hero1.png",
    "/hero2.png",
    "/hero3.png",
    "/hero4.png",
    "/hero5.png",
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="bg-cream py-6">

      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl shadow-lg bg-cream">

          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={slides[index]}
              initial={{
                x: direction > 0 ? 80 : -80,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: direction > 0 ? -80 : 80,
                opacity: 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
              className="
                w-full
                h-auto                 /* 🔥 mobile fix */
                md:h-[420px]
                lg:h-[520px]
                xl:h-[600px]

                object-contain
                md:object-cover

                object-center
              "
            />
          </AnimatePresence>

          {/* ⬅ LEFT */}
          <button
            onClick={prev}
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 md:p-3 rounded-full shadow"
          >
            ‹
          </button>

          {/* ➡ RIGHT */}
          <button
            onClick={next}
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 md:p-3 rounded-full shadow"
          >
            ›
          </button>

          {/* DOTS */}
          <div className="absolute bottom-3 w-full flex justify-center gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-primary"
                    : "w-2 bg-white/70"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}