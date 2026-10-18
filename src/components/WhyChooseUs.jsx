import { useEffect, useRef, useState } from "react";
import Placeholder from "./Placeholder.jsx";

const items = [
  {
    title: "Premium Quality",
    text: "Solid hardwood frames and natural upholstery built to hold up for years, not seasons.",
    back: "Because furniture should outlast the trend that sold it to you.",
    kind: "shelf",
  },
  {
    title: "Modern Designs",
    text: "A collection refreshed each season by our in-house design studio.",
    back: "Every new piece is designed in-house, from sketch to showroom.",
    kind: "chair",
  },
  {
    title: "Custom Furniture",
    text: "Adjust size, material, colour or finish to fit your room exactly.",
    back: "Size, material, colour or finish — tell us what your room needs.",
    kind: "sofa",
  },
  {
    title: "Expert Craftsmanship",
    text: "Every joint and finish checked by hand before it leaves the workshop.",
    back: "Every joint and finish reviewed by hand before it ships.",
    kind: "table",
  },
];

function FlipCard({ it, index }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
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
    <div
      ref={ref}
      className="why-flip-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
      }}
    >
      <div className="why-flip-inner">
        <div className="why-flip-face why-flip-front" style={{ borderColor: "var(--line)", background: "var(--cream)" }}>
          <div className="w-12 h-12 rounded-full mb-5 overflow-hidden">
            <Placeholder kind={it.kind} tint={index} />
          </div>
          <h3 className="font-display text-lg mb-2" style={{ color: "var(--charcoal)" }}>{it.title}</h3>
          <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>{it.text}</p>
        </div>
        <div className="why-flip-face why-flip-back" style={{ background: "var(--charcoal)" }}>
          <p className="text-sm" style={{ color: "rgba(246,241,232,0.9)" }}>{it.back}</p>
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="pt-16 md:pt-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl mb-10" style={{ color: "var(--charcoal)" }}>Why Choose Us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <FlipCard key={it.title} it={it} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .why-flip-card {
          perspective: 1200px;
          height: 230px;
        }
        .why-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
          transform-style: preserve-3d;
        }
        .why-flip-card:hover .why-flip-inner,
        .why-flip-card:focus-within .why-flip-inner {
          transform: rotateY(180deg);
        }
        .why-flip-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          border-radius: 1rem;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }
        .why-flip-front {
          border: 1px solid;
        }
        .why-flip-back {
          transform: rotateY(180deg);
          justify-content: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .why-flip-inner { transition: none !important; }
        }
      `}</style>
    </section>
  );
}