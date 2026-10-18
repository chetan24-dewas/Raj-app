import ProductCard from "./ProductCard.jsx";
import { products } from "../data/furnitureData.js";
import { useReveal } from "../hooks/useReveal.js";

export default function FeaturedProducts() {
  const [headRef, headInView] = useReveal(0.2);

  return (
    <section id="furniture" className="py-16 md:py-28 px-5 md:px-8" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto">
        <div
          ref={headRef}
          className="max-w-2xl mx-auto text-center mb-16 transition-all duration-700"
          style={{ opacity: headInView ? 1 : 0, transform: headInView ? "translateY(0)" : "translateY(16px)" }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8" style={{ background: "var(--brass)" }} />
            <p className="text-xs font-medium tracking-[0.18em] uppercase" style={{ color: "var(--clay)" }}>
              Curated For Your Space
            </p>
            <span className="h-px w-8" style={{ background: "var(--brass)" }} />
          </div>
          <h2 className="font-display text-4xl md:text-5xl mb-4" style={{ color: "var(--charcoal)" }}>
            Featured Furniture
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
            Thoughtfully selected pieces designed to bring comfort, character and timeless elegance to your space.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <ProductCard key={p.name} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}