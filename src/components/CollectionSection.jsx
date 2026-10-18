
import { useEffect, useRef, useState } from "react";
import Placeholder from "./Placeholder.jsx";

const HEADING = "Quiet, warm interiors for the season ahead";
const WORDS = HEADING.split(" ");

export default function CollectionSection() {
  const boxRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return (
    <section id="collection" className="px-5 md:px-8 py-6 md:py-10">
      <div className="max-w-7xl mx-auto">
        
        {/* SINGLE BANNER */}
        <div
          ref={boxRef}
          className="relative w-full h-[360px] md:h-[430px] rounded-[2.5rem] overflow-hidden"
        >
          {/* ONE IMAGE ONLY */}
          {!imgError ? (
            <img
              src="/collection/banner.jpg"
              alt="Collection interior"
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0">
              <Placeholder kind="bedroom" tint={3} />
            </div>
          )}

          {/* DARK OVERLAY */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(40,34,29,0.78), rgba(40,34,29,0.08))",
            }}
          />

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-end">
            <div className="p-7 md:p-12 max-w-lg text-[#F6F1E8]">

              <p
                className="text-sm font-medium mb-2"
                style={{ color: "var(--brass)" }}
              >
                New Collection — Autumn
              </p>

              <h2 className="font-display text-3xl md:text-4xl mb-3">
                {WORDS.map((word, index) => (
                  <span
                    key={index}
                    className="inline-block"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView
                        ? "translateY(0)"
                        : "translateY(10px)",
                      transition: `opacity 0.5s ease ${
                        index * 70
                      }ms, transform 0.5s ease ${
                        index * 70
                      }ms`,
                    }}
                  >
                    {word}
                    {index < WORDS.length - 1 ? "\u00A0" : ""}
                  </span>
                ))}
              </h2>

              <p className="mb-5 opacity-90">
                Twelve new pieces in walnut and boucle, designed around low
                light and long evenings at home.
              </p>

              <a
                href="#furniture"
                className="btn-primary inline-block px-7 py-3 rounded-full font-medium transition-transform duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Explore Collection
              </a>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

