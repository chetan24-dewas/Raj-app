import { useState } from "react";
import { categories } from "../data/furnitureData.js";

const glyphs = {
  sofa: <path d="M5 12v5a1 1 0 0 0 1 1h1v2M17 18v2M6 18h12M4 12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3H4v-3z M6 10V8.5a2 2 0 0 1 4 0V10M14 10V8.5a2 2 0 0 1 4 0V10" />,
  bed: <path d="M3 19v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 19v2M21 19v2M3 15h18M6 11V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" />,
  dining: <path d="M4 8h16l-1.5 4h-13L4 8zM9 12v7M15 12v7M6 8V6M18 8V6" />,
  chair: <path d="M7 4h10v7H7zM7 11v6M17 11v6M7 17h10v3H7zM7 21v0M17 21v0" />,
  table: <path d="M4 8h16M6 8v11M18 8v11M4 8l2-3h12l2 3" />,
  wardrobe: <path d="M6 3h12v18H6zM12 3v18M9 11v0M15 11v0" />,
};

function CategoryCard({ c }) {
  const [touched, setTouched] = useState(false);

  return (
    <a
      href="#furniture"
      className={"cat-card " + (touched ? "touched" : "")}
      onTouchStart={() => setTouched(true)}
      onMouseLeave={() => setTouched(false)}
    >
      <img className="cat-base-img" src={c.img} alt="" loading="lazy" />
      <div className="cat-base-scrim" />

      <div className="cat-idle">
        <div className="cat-idle-ring">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f6f1e8" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
            {glyphs[c.kind]}
          </svg>
        </div>
        <p className="font-display" style={{ color: "var(--cream)", fontSize: 17, margin: 0 }}>{c.name}</p>
        <p style={{ color: "rgba(246,241,232,0.75)", fontSize: 11, margin: 0 }}>{c.count}</p>
      </div>

      <img className="cat-reveal-img" src={c.img} alt={c.name} loading="lazy" />
      <div className="cat-wipe-edge" />
      <div className="cat-reveal-scrim" />

      <div className="cat-hover-content">
        <p className="font-display" style={{ fontSize: 19, fontWeight: 500, margin: "0 0 3px" }}>{c.name}</p>
        <p style={{ fontSize: 12, opacity: 0.85, margin: 0 }}>{c.count}</p>
      </div>

      <div className="cat-arrow">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f6f1e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </a>
  );
}

export default function CategorySection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8" style={{ background: "var(--panel)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-sm font-medium mb-2" style={{ color: "var(--clay)" }}>Browse by room</p>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--charcoal)" }}>Shop By Category</h2>
          </div>
          <a href="#furniture" className="underline-grow font-medium" style={{ color: "var(--charcoal)" }}>
            View all furniture
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => (
            <CategoryCard key={c.name} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
