import Placeholder from "./Placeholder.jsx";

import { getShowroomCopy } from "../data/showroomCopy.js";

import { whatsappEnquiryHref } from "../data/whatsapp.js";

import { useReveal } from "../hooks/useReveal.js";

export default function ProductCard({ p, index = 0 }) {
  const [ref, inView] = useReveal(0.15);

  return (
    <div
      ref={ref}
      className="group rounded-[26px] overflow-hidden bg-[var(--cream)] flex flex-col transition-all duration-700"
      style={{
        border: "1px solid var(--line)",
        boxShadow: "0 1px 2px rgba(40,34,29,0.06)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transitionDelay: inView ? `${index * 120}ms` : "0ms",
      }}
    >
      <div className="relative h-[300px] md:h-[340px] overflow-hidden">
        <div className="w-full h-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]">
          {p.img ? (
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <Placeholder kind={p.kind} tint={p.tint} />
          )}
        </div>

        <div
          className="pointer-events-none absolute inset-3 rounded-[18px] border opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ borderColor: "var(--brass)" }}
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="h-px w-5"
            style={{ background: "var(--brass)" }}
          />

          <p
            className="text-xs tracking-[0.14em] uppercase"
            style={{ color: "var(--clay)" }}
          >
            {p.cat}
          </p>
        </div>

        <h3
          className="font-display text-2xl mb-2 leading-snug"
          style={{ color: "var(--charcoal)" }}
        >
          {p.name}
        </h3>

        <p
          className="text-sm leading-relaxed mb-6 flex-1 line-clamp-2"
          style={{ color: "var(--charcoal-soft)" }}
        >
          {getShowroomCopy(p)}
        </p>

        <a
          href={whatsappEnquiryHref(p.name)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire about the ${p.name} on WhatsApp`}
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold tracking-wide rounded-full px-6 py-3.5 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            background: "var(--brass)",
            color: "var(--charcoal)",
            outlineColor: "var(--clay)",
            boxShadow: "0 6px 16px -8px rgba(179,146,92,0.55)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--charcoal)";
            e.currentTarget.style.color = "var(--cream)";
            e.currentTarget.style.boxShadow =
              "0 10px 22px -10px rgba(40,34,29,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--brass)";
            e.currentTarget.style.color = "var(--charcoal)";
            e.currentTarget.style.boxShadow =
              "0 6px 16px -8px rgba(179,146,92,0.55)";
          }}
        >
          Enquire Now

          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="8 7 17 7 17 16" />
          </svg>
        </a>
      </div>
    </div>
  );
}