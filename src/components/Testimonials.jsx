import { IconStar } from "./icons.jsx";
import { testimonials } from "../data/furnitureData.js";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-sm font-medium mb-2" style={{ color: "var(--clay)" }}>From our customers</p>
          <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--charcoal)" }}>Testimonials</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl p-7 border" style={{ borderColor: "var(--line)", background: "var(--cream)" }}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IconStar key={i} filled={i < t.stars} />
                ))}
              </div>
              <p className="mb-6" style={{ color: "var(--charcoal-soft)" }}>&ldquo;{t.text}&rdquo;</p>
              <p className="font-display" style={{ color: "var(--charcoal)" }}>{t.name}</p>
              <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>{t.city}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
