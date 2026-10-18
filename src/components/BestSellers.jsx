import Placeholder from "./Placeholder.jsx";
import { bestSellers } from "../data/furnitureData.js";

export default function BestSellers() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8" style={{ background: "var(--panel)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-sm font-medium mb-2" style={{ color: "var(--clay)" }}>Most loved</p>
          <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--charcoal)" }}>Best Sellers</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((p) => (
            <div key={p.name} className="card-hover rounded-2xl overflow-hidden bg-[var(--cream)] border flex" style={{ borderColor: "var(--line)" }}>
              <div className="w-32 shrink-0">
                <Placeholder kind={p.kind} tint={p.tint} />
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-display text-lg mb-1" style={{ color: "var(--charcoal)" }}>{p.name}</h3>
                  <p className="font-display text-base" style={{ color: "var(--clay)" }}>{p.price}</p>
                </div>
                <a href="#contact" className="text-sm font-medium underline-grow mt-3 inline-block w-fit" style={{ color: "var(--charcoal)" }}>
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
