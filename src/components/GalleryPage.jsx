import { useEffect, useRef, useState } from "react";
import { galleryCategories, galleryImages } from "../data/galleryImages.js";
import GalleryLightbox from "./GalleryLightbox.jsx";

const EXIT_MS = 150;
const ENTER_MS = 200;

// Replace with your WhatsApp number: country code + number, digits only (no + or spaces)
const WHATSAPP_NUMBER = "919406654752";

function enquiryLink(img) {
  const text = `Hello Raj Furniture, I'm interested in "${img.caption}". Please share price and details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function GalleryCard({ img, phase, onOpen }) {
  const [enteredViaFilter] = useState(() => phase === "entering");
  const [seen, setSeen] = useState(enteredViaFilter);
  const ref = useRef(null);

  useEffect(() => {
    if (enteredViaFilter) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSeen(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [enteredViaFilter]);

  let style;
  if (enteredViaFilter) {
    style =
      phase === "entering"
        ? { opacity: 0, transform: "scale(0.94)", transition: "none" }
        : { opacity: 1, transform: "scale(1)", transition: `opacity ${ENTER_MS}ms ease, transform ${ENTER_MS}ms ease` };
  } else if (phase === "exiting") {
    style = { opacity: 0, transform: "scale(0.94)", transition: `opacity ${EXIT_MS}ms ease, transform ${EXIT_MS}ms ease` };
  } else if (!seen) {
    style = { opacity: 0, transform: "scale(0.97)", transition: "opacity 0.5s ease, transform 0.5s ease" };
  } else {
    style = { opacity: 1, transform: "scale(1)", transition: "opacity 0.5s ease, transform 0.5s ease" };
  }

  return (
    <figure ref={ref} className="gallery-card" style={style}>
      <button
        type="button"
        className="gallery-card-frame"
        onClick={() => onOpen(img)}
        aria-label={`View ${img.caption}`}
      >
        <img src={img.src} alt={img.alt} loading="lazy" className="gallery-card-img" />
        <span className="gallery-card-corner" aria-hidden="true" />
        <div className="gallery-card-overlay">
          <figcaption className="gallery-card-caption">{img.caption}</figcaption>
        </div>
      </button>

      <a
        href={enquiryLink(img)}
        target="_blank"
        rel="noopener noreferrer"
        className="gallery-enquiry"
        aria-label={`Enquire about ${img.caption} on WhatsApp`}
      >
        <svg className="gallery-enquiry-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.3L3 20l1.3-5A8.5 8.5 0 1 1 21 11.5z" />
        </svg>
        <span>Enquire Now</span>
        <svg className="gallery-enquiry-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </figure>
  );
}

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [displayed, setDisplayed] = useState(galleryImages);
  const [phase, setPhase] = useState("idle");
  const [lightboxItem, setLightboxItem] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  function handleFilter(cat) {
    if (cat === active || phase !== "idle") return;
    setPhase("exiting");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const next = cat === "All" ? galleryImages : galleryImages.filter((g) => g.category === cat);
      setActive(cat);
      setDisplayed(next);
      setPhase("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("idle"));
      });
    }, EXIT_MS);
  }

  return (
    <main className="raj-gallery-page pt-28 pb-24 px-5 md:px-8" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12 gallery-fade-up">
          <p className="text-sm tracking-[0.18em] font-medium mb-3 uppercase" style={{ color: "var(--brass)" }}>
            Showroom Catalogue
          </p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4" style={{ color: "var(--charcoal)" }}>
            The Gallery
          </h1>
          <p className="text-base md:text-lg" style={{ color: "var(--charcoal-soft)" }}>
            A closer look at furniture and details finished by Raj Furniture — browse by category, or see everything at once.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10 gallery-fade-up" style={{ animationDelay: "80ms" }}>
          {galleryCategories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300"
                style={
                  isActive
                    ? { background: "var(--charcoal)", color: "var(--cream)" }
                    : { background: "transparent", color: "var(--charcoal-soft)", border: "1px solid var(--line)" }
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {displayed.map((img) => (
            <GalleryCard key={img.id} img={img} phase={phase} onOpen={setLightboxItem} />
          ))}
        </div>

        {displayed.length === 0 && (
          <p className="text-center py-20" style={{ color: "var(--charcoal-soft)" }}>
            No images in this category yet.
          </p>
        )}
      </div>

      {lightboxItem && <GalleryLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}

      <style>{`
        .gallery-fade-up {
          animation: galleryFadeUp 0.6s ease-out both;
        }
        @keyframes galleryFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .gallery-card {
          position: relative;
          margin: 0;
        }

        .gallery-card-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 0.5rem;
          background: var(--panel);
          display: block;
          cursor: pointer;
          text-align: left;
        }
        .gallery-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gallery-card:hover .gallery-card-img,
        .gallery-card-frame:focus-visible .gallery-card-img {
          transform: scale(1.06);
        }

        .gallery-card-corner {
          position: absolute;
          top: 12px;
          left: 12px;
          width: 22px;
          height: 22px;
          pointer-events: none;
        }
        .gallery-card-corner::before,
        .gallery-card-corner::after {
          content: "";
          position: absolute;
          background: var(--brass);
          transition: transform 200ms ease-out;
        }
        .gallery-card-corner::before {
          top: 0; left: 0;
          width: 100%; height: 1.5px;
          transform: scaleX(0);
          transform-origin: left;
        }
        .gallery-card-corner::after {
          top: 0; left: 0;
          width: 1.5px; height: 100%;
          transform: scaleY(0);
          transform-origin: top;
        }
        .gallery-card:hover .gallery-card-corner::before,
        .gallery-card-frame:focus-visible .gallery-card-corner::before {
          transform: scaleX(1);
        }
        .gallery-card:hover .gallery-card-corner::after,
        .gallery-card-frame:focus-visible .gallery-card-corner::after {
          transform: scaleY(1);
        }

        .gallery-card-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 14px 14px 64px;
          background: linear-gradient(180deg, rgba(24,20,16,0) 45%, rgba(24,20,16,0.72) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .gallery-card:hover .gallery-card-overlay,
        .gallery-card-frame:focus-visible .gallery-card-overlay {
          opacity: 1;
        }
        .gallery-card-caption {
          color: #fbf6ee;
          font-size: 0.85rem;
          letter-spacing: 0.02em;
          font-weight: 500;
        }

        .gallery-enquiry {
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 14px;
          border-radius: 999px;
          overflow: hidden;
          background: var(--brass);
          color: var(--charcoal);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-decoration: none;
          box-shadow: 0 6px 18px rgba(24, 20, 16, 0.28);
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
          animation: enquiryPulse 2.4s ease-out infinite;
        }
        .gallery-enquiry::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 40%;
          left: -60%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          animation: enquiryShine 3.2s ease-in-out infinite;
          pointer-events: none;
        }
        .gallery-enquiry span,
        .gallery-enquiry svg {
          position: relative;
          z-index: 1;
        }
        .gallery-enquiry-arrow {
          transition: transform 0.25s ease;
        }
        .gallery-enquiry:hover,
        .gallery-enquiry:focus-visible {
          transform: translateY(-3px);
          filter: brightness(1.06);
          box-shadow: 0 10px 24px rgba(24, 20, 16, 0.38);
        }
        .gallery-enquiry:hover .gallery-enquiry-arrow,
        .gallery-enquiry:focus-visible .gallery-enquiry-arrow {
          transform: translateX(5px);
        }
        .gallery-enquiry:active {
          transform: scale(0.97);
        }
        .gallery-enquiry-icon {
          animation: enquiryWiggle 4s ease-in-out infinite;
          transform-origin: 50% 70%;
        }

        @keyframes enquiryPulse {
          0%   { box-shadow: 0 6px 18px rgba(24,20,16,0.28), 0 0 0 0 color-mix(in srgb, var(--brass) 55%, transparent); }
          70%  { box-shadow: 0 6px 18px rgba(24,20,16,0.28), 0 0 0 10px color-mix(in srgb, var(--brass) 0%, transparent); }
          100% { box-shadow: 0 6px 18px rgba(24,20,16,0.28), 0 0 0 0 color-mix(in srgb, var(--brass) 0%, transparent); }
        }
        @keyframes enquiryShine {
          0%, 55% { left: -60%; }
          100%    { left: 140%; }
        }
        @keyframes enquiryWiggle {
          0%, 88%, 100% { transform: rotate(0deg); }
          91% { transform: rotate(-14deg); }
          94% { transform: rotate(12deg); }
          97% { transform: rotate(-8deg); }
        }

        @media (max-width: 480px) {
          .gallery-enquiry { padding: 9px 10px; font-size: 0.76rem; gap: 6px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-fade-up { animation: none; }
          .gallery-card-img { transition: none; }
          .gallery-enquiry,
          .gallery-enquiry::after,
          .gallery-enquiry-icon { animation: none; }
        }
      `}</style>
    </main>
  );
}