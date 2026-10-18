import { useEffect, useRef, useState } from "react";

import Placeholder from "./Placeholder.jsx";

const HEADING_TEXT = "Built for Your Home, Crafted at Your Door";

const PARA_A_CHUNKS = [
  "Raj Furniture began with a simple belief — beautiful furniture should not only look good, it should feel right in your own home.",
];

const PARA_B_CHUNKS = [
  "We bring our furniture work directly to you. From understanding your space and taking measurements to crafting and finishing every detail, we work with care at your doorstep. Every piece is thoughtfully made around your space, your comfort, and your lifestyle — creating furniture that feels truly made for you.",
];

function scrollProgress(el, startFrac = 0.85, endFrac = 0.35) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;

  const startY = vh * startFrac;
  const endY = vh * endFrac;

  const p = (startY - rect.top) / (startY - endY);

  return Math.max(0, Math.min(1, p));
}

export default function AboutSection() {
  const headingRef = useRef(null);
  const caretRef = useRef(null);
  const circleMaskRef = useRef(null);
  const imgBoxRef = useRef(null);
  const brassFrameRef = useRef(null);
  const bodyWrapRef = useRef(null);
  const statsRef = useRef(null);

  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.textContent = "";

      headingRef.current.appendChild(
        document.createTextNode("")
      );

      const caret = document.createElement("span");

      caret.className = "about-caret";
      caretRef.current = caret;

      headingRef.current.appendChild(caret);
    }

    let ticking = false;

    function update() {
      if (headingRef.current) {
        const p = scrollProgress(headingRef.current);

        const count = Math.round(
          p * HEADING_TEXT.length
        );

        headingRef.current.childNodes[0].textContent =
          HEADING_TEXT.slice(0, count);

        if (caretRef.current) {
          caretRef.current.style.opacity =
            p >= 1 ? "0" : "1";
        }
      }

      if (circleMaskRef.current) {
        const p = scrollProgress(
          circleMaskRef.current
        );

        circleMaskRef.current.style.clipPath =
          `circle(${p * 75}% at 50% 50%)`;
      }
    }

    function onScroll() {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      onScroll
    );

    update();

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onScroll
      );
    };
  }, []);

  useEffect(() => {
    const targets = [
      brassFrameRef.current,
      imgBoxRef.current,
      bodyWrapRef.current,
      statsRef.current,
    ].filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.25,
      }
    );

    targets.forEach((target) => {
      io.observe(target);
    });

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <section
      id="about"
      className="py-16 md:py-24 px-5 md:px-8"
      style={{
        background: "var(--panel)",
      }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGE */}
        <div className="relative order-2 md:order-1">

          <div
            ref={brassFrameRef}
            className="about-brass-frame"
          />

          <div
            ref={imgBoxRef}
            className="about-imgbox h-80 md:h-[26rem]"
          >
            <div
              ref={circleMaskRef}
              className="about-circle-mask"
            >
              {!imgError ? (
                <img
                  src="/about/workshop.png"
                  alt="Raj Furniture craftsmanship at a customer's home"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <Placeholder
                  kind="living"
                  tint={2}
                />
              )}
            </div>
          </div>

        </div>

        {/* CONTENT */}
        <div className="order-1 md:order-2">

          {/* SINCE */}
          <p
            className="text-sm font-medium mb-3"
            style={{
              color: "var(--clay)",
            }}
          >
            Since 2011
          </p>

          {/* HEADING */}
          <h2
            ref={headingRef}
            className="font-display about-heading text-3xl md:text-4xl mb-5"
            style={{
              color: "var(--charcoal)",
            }}
          />

          {/* STORY */}
          <div
            ref={bodyWrapRef}
            className="about-body-wrap mb-8"
          >

            <p
              className="mb-4"
              style={{
                color: "var(--charcoal-soft)",
              }}
            >
              {PARA_A_CHUNKS.map(
                (chunk, index) => (
                  <span
                    className="about-line"
                    key={index}
                    style={{
                      transitionDelay: `${index * 130}ms`,
                    }}
                  >
                    <span>{chunk} </span>
                  </span>
                )
              )}
            </p>

            <p
              style={{
                color: "var(--charcoal-soft)",
              }}
            >
              {PARA_B_CHUNKS.map(
                (chunk, index) => (
                  <span
                    className="about-line"
                    key={index}
                    style={{
                      transitionDelay: `${
                        (PARA_A_CHUNKS.length + index) * 130
                      }ms`,
                    }}
                  >
                    <span>{chunk} </span>
                  </span>
                )
              )}
            </p>

          </div>

          {/* STATS */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-6 about-stats"
          >

            {/* QUALITY */}
            <div className="about-stat">
              <div className="about-divider" />

              <p
                className="font-display text-2xl mb-1"
                style={{
                  color: "var(--charcoal)",
                }}
              >
                Quality
              </p>

              <p
                className="text-sm"
                style={{
                  color: "var(--charcoal-soft)",
                }}
              >
                Built with attention to detail
              </p>
            </div>

            {/* DESIGN */}
            <div className="about-stat">
              <div className="about-divider" />

              <p
                className="font-display text-2xl mb-1"
                style={{
                  color: "var(--charcoal)",
                }}
              >
                Design
              </p>

              <p
                className="text-sm"
                style={{
                  color: "var(--charcoal-soft)",
                }}
              >
                Made around your space
              </p>
            </div>

            {/* CRAFT */}
            <div className="about-stat">
              <div className="about-divider" />

              <p
                className="font-display text-2xl mb-1"
                style={{
                  color: "var(--charcoal)",
                }}
              >
                Craft
              </p>

              <p
                className="text-sm"
                style={{
                  color: "var(--charcoal-soft)",
                }}
              >
                Crafted at your doorstep
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}