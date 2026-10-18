import { useEffect, useState } from "react";

/**
 * ============================================================
 * OPTION 3 — "BRASS LINE / SIGNATURE" PAGE LOADER
 * ============================================================
 * Fixed, full-viewport overlay shown on initial load. Sits above
 * the navbar (z-[9999] vs. the navbar's z-50) and blocks
 * interaction until it fades out. Self-contained: styling lives
 * in the scoped <style> block below, no other file is touched
 * besides the one-line mount in App.jsx.
 *
 * Sequence (normal motion):
 *   0ms    thin brass line starts drawing (scaleX 0 -> 1)
 *   700ms  line finishes drawing, brief brass glow pulses once
 *   650ms  "Raj Furniture" wordmark starts fading/scaling in
 *   1250ms wordmark fully visible
 *   ~1500ms  hold ends, whole overlay starts fading out
 *   ~2000ms  overlay unmounts, page is fully interactive
 *
 * Reduced motion: no draw/reveal animations — the line and
 * wordmark render fully visible immediately, held briefly, then
 * the overlay does a simple opacity fade-out.
 *
 * A safety timeout guarantees the loader can never get stuck.
 */

const LOADER_BG = "#1a140f"; // same deep warm-brown as the navbar
const LOADER_TEXT = "#f6f1e8"; // same fixed cream as the navbar

const NORMAL_HOLD_MS = 1500; // time before fade-out begins (normal motion)
const REDUCED_HOLD_MS = 500; // shorter static hold (reduced motion)
const FADE_MS = 500; // overlay fade-out duration
const SAFETY_TIMEOUT_MS = 4000; // hard cap so the loader can never get stuck

export default function Loader() {
  const [phase, setPhase] = useState("loading"); // "loading" -> "fading" -> "done"
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion (and keep it live if the user changes it
  // mid-load, though in practice this only matters before phase advances).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  // Advance loading -> fading after the hold period.
  useEffect(() => {
    if (phase !== "loading") return undefined;
    const holdMs = reducedMotion ? REDUCED_HOLD_MS : NORMAL_HOLD_MS;
    const t = setTimeout(() => setPhase("fading"), holdMs);
    return () => clearTimeout(t);
  }, [phase, reducedMotion]);

  // Advance fading -> done once the fade-out transition has had time to run.
  useEffect(() => {
    if (phase !== "fading") return undefined;
    const t = setTimeout(() => setPhase("done"), FADE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // Safety net: no matter what happens above, force the loader to start
  // fading after SAFETY_TIMEOUT_MS so it can never block the site forever.
  useEffect(() => {
    const safety = setTimeout(() => {
      setPhase((p) => (p === "done" ? p : "fading"));
    }, SAFETY_TIMEOUT_MS);
    return () => clearTimeout(safety);
  }, []);

  // Block scrolling/interaction with the page behind the loader while visible.
  useEffect(() => {
    if (phase === "done") return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [phase]);

  if (phase === "done") return null;

  const fading = phase === "fading";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Raj Furniture"
      className="loader-overlay"
      style={{
        backgroundColor: LOADER_BG,
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div className="loader-inner">
        <span
          aria-hidden="true"
          className={"loader-line " + (reducedMotion ? "loader-line--static" : "loader-line--draw")}
          style={{ background: "var(--brass, #b3925c)" }}
        />
        <span
          className={
            "loader-wordmark font-display " +
            (reducedMotion ? "loader-wordmark--static" : "loader-wordmark--reveal")
          }
        >
          <span style={{ color: LOADER_TEXT }}>Raj</span>{" "}
          <span style={{ color: "var(--brass, #b3925c)" }}>Furniture</span>
        </span>
      </div>

      <style>{`
        .loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .loader-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
        }
        .loader-line {
          display: block;
          width: 140px;
          height: 1.5px;
          transform-origin: center;
        }
        .loader-line--draw {
          transform: scaleX(0);
          animation:
            loaderLineDraw 700ms cubic-bezier(0.65, 0, 0.35, 1) forwards,
            loaderLineGlow 900ms ease-out 700ms 1;
        }
        .loader-line--static {
          transform: scaleX(1);
        }
        .loader-wordmark {
          font-size: 1.5rem;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }
        .loader-wordmark--reveal {
          opacity: 0;
          transform: scale(0.92);
          animation: loaderWordmarkIn 600ms cubic-bezier(0.22, 1, 0.36, 1) 650ms forwards;
        }
        .loader-wordmark--static {
          opacity: 1;
          transform: scale(1);
        }

        @keyframes loaderLineDraw {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes loaderLineGlow {
          0%   { box-shadow: 0 0 0 rgba(179, 146, 92, 0); }
          50%  { box-shadow: 0 0 14px rgba(179, 146, 92, 0.65); }
          100% { box-shadow: 0 0 0 rgba(179, 146, 92, 0); }
        }
        @keyframes loaderWordmarkIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .loader-line,
          .loader-wordmark {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}