import { useEffect, useRef, useState } from "react";

/**
 * Hero — Cinematic "Editorial Rhythm" background sequence
 * Brand: Raj Furniture
 *
 * Implements Option 2 from the approved concept:
 * alternating wide/detail/macro shots, each with movement
 * tailored to its content, soft crossfades, warm ivory /
 * beige / walnut / charcoal / muted brass grading (no blue).
 *
 * Self-contained: all styling for this effect lives in the
 * <style> block below, scoped to .raj-hero, so no other
 * file in the project is touched.
 */

const SLIDES = [
  {
    id: "living-room",
    src: "/hero/01-living-room.jpg",
    label: "Living Room",
    type: "wide",
    duration: 5500,
    animation: "heroPanA",
    objectPosition: "50% 38%",
  },
  {
    id: "wardrobe",
    src: "/hero/02-wardrobe.jpg",
    label: "Walk-In Wardrobe",
    type: "detail",
    duration: 3800,
    animation: "heroPushRight",
    objectPosition: "60% 45%",
  },
  {
    id: "dining-table",
    src: "/hero/03-dining-table.jpg",
    label: "Dining Collection",
    type: "wide",
    duration: 5500,
    animation: "heroPanB",
    objectPosition: "50% 45%",
  },
  {
    id: "nightstand",
    src: "/hero/04-nightstand.jpg",
    label: "Bedside Storage",
    type: "detail",
    duration: 3800,
    animation: "heroPushCenter",
    objectPosition: "45% 42%",
  },
  {
    id: "master-bedroom",
    src: "/hero/05-master-bedroom.jpg",
    label: "Master Bedroom",
    type: "wide",
    duration: 5500,
    animation: "heroPanA",
    objectPosition: "50% 35%",
  },
  {
    id: "material-texture",
    src: "/hero/06-material-texture.jpg",
    label: "Craftsmanship",
    type: "macro",
    duration: 4000,
    animation: "heroMacro",
    objectPosition: "50% 50%",
  },
  {
    id: "bedside-lamp",
    src: "/hero/07-bedside-lamp.jpg",
    label: "Ambient Lighting",
    type: "detail",
    duration: 3800,
    animation: "heroPushLeft",
    objectPosition: "62% 30%",
  },
  {
    id: "velvet-sofa",
    src: "/hero/08-velvet-sofa.jpg",
    label: "Handcrafted Detail",
    type: "macro",
    duration: 4000,
    animation: "heroMacroWarm",
    objectPosition: "50% 50%",
    grade: "saturate(0.4) sepia(0.28) contrast(1.06) brightness(0.92)",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const current = SLIDES[index];
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
      setTick((t) => t + 1);
    }, current.duration);
    return () => clearTimeout(timerRef.current);
  }, [index]);

  const current = SLIDES[index];
  const fadeMs = current.type === "wide" ? 1800 : 1300;

  return (
        <section
      id="home"
      className="raj-hero relative mt-20 md:mt-24 h-[calc(100svh-5rem)] md:h-[calc(100svh-6rem)] min-h-[480px] w-full overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      {/* Cinematic background sequence */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <img
            key={`${slide.id}-${i === index ? tick : "idle"}`}
            src={slide.src}
            alt={slide.label}
            className={`hero-slide hero-anim-${slide.animation}`}
            style={{
              opacity: i === index ? 1 : 0,
              transitionDuration: `${fadeMs}ms`,
              objectPosition: slide.objectPosition,
              animationDuration: `${slide.duration + 400}ms`,
              filter: slide.grade || "none",
            }}
          />
        ))}
      </div>

      {/* Warm directional scrim — protects text contrast on the left */}
      <div className="absolute inset-0 hero-scrim-directional" />
      {/* Vertical vignette — light wash at top (navbar legibility), depth at base */}
      <div className="absolute inset-0 hero-scrim-vertical" />
      {/* Muted brass atmospheric glow */}
      <div className="absolute inset-0 hero-scrim-brass" />
      {/* Fine cinematic grain, reusing the site's existing grain texture */}
      <div className="absolute inset-0 grain opacity-[0.05] pointer-events-none" />

      {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col justify-center">
        <div className="max-w-xl">
          <p className="text-sm tracking-[0.18em] font-medium mb-78 uppercase" style={{ color: "var(--brass)" }}>
            Handcrafted showroom collection
          </p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-6" style={{ color: "#fbf6ee" }}>
            Furniture That Defines Your Space
          </h1>
          <p className="text-lg max-w-md mb-9" style={{ color: "rgba(251,246,238,0.82)" }}>
            Solid-wood sofas, beds, tables and storage — made to order in our workshop and finished by hand for the rooms you actually live in.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#furniture" className="btn-primary px-7 py-3.5 rounded-full font-medium">
              Explore Collection
            </a>
            <a
              href="#contact"
              className="btn-outline px-7 py-3.5 rounded-full font-medium"
              style={{ borderColor: "rgba(251,246,238,0.75)", color: "#fbf6ee" }}
            >
              Contact Us
            </a>
          </div>

          <div className="flex gap-10 mt-12 pt-8 border-t" style={{ borderColor: "rgba(251,246,238,0.22)" }}>
            <div>
              <p className="font-display text-3xl" style={{ color: "#fbf6ee" }}>14</p>
              <p className="text-sm" style={{ color: "rgba(251,246,238,0.72)" }}>years in craft</p>
            </div>
            <div>
              <p className="font-display text-3xl" style={{ color: "#fbf6ee" }}>3,200+</p>
              <p className="text-sm" style={{ color: "rgba(251,246,238,0.72)" }}>homes furnished</p>
            </div>
            <div>
              <p className="font-display text-3xl" style={{ color: "#fbf6ee" }}>2 yr</p>
              <p className="text-sm" style={{ color: "rgba(251,246,238,0.72)" }}>warranty</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rotating editorial caption — bottom-left, glass treatment */}
      <div className="absolute bottom-24 md:bottom-10 left-5 md:left-8 z-10">
        <div
          key={`caption-${index}`}
          className="hero-caption flex items-center gap-3 rounded-full pl-2 pr-5 py-2 backdrop-blur"
          style={{ background: "rgba(251,246,238,0.12)", border: "1px solid rgba(251,246,238,0.22)" }}
        >
          <span className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium" style={{ background: "var(--brass)", color: "#221d18" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm tracking-wide" style={{ color: "#fbf6ee" }}>
            {current.label}
          </span>
        </div>
      </div>

      {/* Subtle scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 hero-scroll-cue">
        <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "rgba(251,246,238,0.6)" }}>Scroll</span>
        <span className="w-px h-8" style={{ background: "rgba(251,246,238,0.4)" }} />
      </div>

      <style>{`
        .hero-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition-property: opacity;
          transition-timing-function: ease-in-out;
          will-change: opacity, transform;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        .hero-anim-heroPanA { animation-name: heroPanA; }
        .hero-anim-heroPanB { animation-name: heroPanB; }
        .hero-anim-heroPushRight { animation-name: heroPushRight; }
        .hero-anim-heroPushLeft { animation-name: heroPushLeft; }
        .hero-anim-heroPushCenter { animation-name: heroPushCenter; }
        .hero-anim-heroMacro { animation-name: heroMacro; }
        .hero-anim-heroMacroWarm { animation-name: heroMacro; }

        @keyframes heroPanA {
          0%   { transform: scale(1.09) translateX(-1.1%); }
          100% { transform: scale(1.09) translateX(1.1%); }
        }
        @keyframes heroPanB {
          0%   { transform: scale(1.09) translateX(1.1%); }
          100% { transform: scale(1.09) translateX(-1.1%); }
        }
        @keyframes heroPushRight {
          0%   { transform: scale(1) translateX(0); }
          100% { transform: scale(1.13) translateX(-1%); }
        }
        @keyframes heroPushLeft {
          0%   { transform: scale(1) translateX(0); }
          100% { transform: scale(1.13) translateX(1%); }
        }
        @keyframes heroPushCenter {
          0%   { transform: scale(1); }
          100% { transform: scale(1.12); }
        }
        @keyframes heroMacro {
          0%   { transform: scale(1.02); }
          100% { transform: scale(1.045); }
        }

        /* Reduced-intensity variants for mobile: pans become gentle zoom only */
        @media (max-width: 767px) {
          @keyframes heroPanA {
            0%   { transform: scale(1.05); }
            100% { transform: scale(1.09); }
          }
          @keyframes heroPanB {
            0%   { transform: scale(1.05); }
            100% { transform: scale(1.09); }
          }
          @keyframes heroPushRight {
            0%   { transform: scale(1.01); }
            100% { transform: scale(1.09); }
          }
          @keyframes heroPushLeft {
            0%   { transform: scale(1.01); }
            100% { transform: scale(1.09); }
          }
          @keyframes heroPushCenter {
            0%   { transform: scale(1.01); }
            100% { transform: scale(1.08); }
          }
        }

        .hero-scrim-directional {
          background: linear-gradient(
            100deg,
            rgba(24, 20, 16, 0.74) 0%,
            rgba(24, 20, 16, 0.4) 42%,
            rgba(24, 20, 16, 0.12) 68%,
            rgba(24, 20, 16, 0.28) 100%
          );
        }
        .hero-scrim-vertical {
          background: linear-gradient(
            180deg,
            rgba(246, 241, 232, 0.24) 0%,
            rgba(24, 20, 16, 0) 20%,
            rgba(24, 20, 16, 0.1) 55%,
            rgba(24, 20, 16, 0.5) 100%
          );
        }
        .hero-scrim-brass {
          background: radial-gradient(ellipse 60% 45% at 22% 18%, rgba(179, 146, 92, 0.14), transparent 60%);
          mix-blend-mode: soft-light;
        }

        .hero-caption {
          animation: heroCaptionIn 0.5s ease-out both;
        }
        @keyframes heroCaptionIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-scroll-cue span:last-child {
          animation: heroScrollPulse 2.2s ease-in-out infinite;
        }
        @keyframes heroScrollPulse {
          0%, 100% { opacity: 0.25; transform: scaleY(0.7); transform-origin: top; }
          50% { opacity: 0.8; transform: scaleY(1); transform-origin: top; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-slide { animation: none !important; }
          .hero-scroll-cue span:last-child { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
