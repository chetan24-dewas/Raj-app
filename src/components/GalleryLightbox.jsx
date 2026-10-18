import { useEffect } from "react";
import Placeholder from "./Placeholder.jsx";

/**
 * Shared lightbox for gallery imagery (Option A spec).
 * Pass either a real photo (src + alt) or a placeholder (kind + tint) — used
 * by the home Gallery section, which still renders Placeholder art rather
 * than real photography.
 */
export default function GalleryLightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Prevent background scroll while open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="gallery-lightbox-scrim"
      role="dialog"
      aria-modal="true"
      aria-label={item.label || item.alt || "Image preview"}
      onClick={onClose}
    >
      <button
        className="gallery-lightbox-close"
        aria-label="Close"
        onClick={onClose}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </svg>
      </button>

      <div className="gallery-lightbox-frame" onClick={(e) => e.stopPropagation()}>
        {(item.src || item.img) ? (
          <img src={item.src || item.img} alt={item.alt || item.label || ""} className="gallery-lightbox-img" />
        ) : (
          <div className="gallery-lightbox-placeholder">
            <Placeholder kind={item.kind} tint={item.tint} />
          </div>
        )}
        {(item.label || item.caption) && (
          <p className="gallery-lightbox-caption">{item.label || item.caption}</p>
        )}
      </div>

      <style>{`
        .gallery-lightbox-scrim {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(24, 20, 16, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: lightboxScrimIn 250ms ease-out both;
        }
        @keyframes lightboxScrimIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .gallery-lightbox-frame {
          position: relative;
          max-width: min(90vw, 1100px);
          max-height: 86vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: lightboxImgIn 250ms ease-out both;
        }
        @keyframes lightboxImgIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        .gallery-lightbox-img {
          max-width: 100%;
          max-height: 78vh;
          object-fit: contain;
          border-radius: 4px;
          display: block;
        }
        .gallery-lightbox-placeholder {
          position: relative;
          width: min(80vw, 640px);
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
        }
        .gallery-lightbox-caption {
          margin-top: 14px;
          color: #fbf6ee;
          font-size: 0.9rem;
          letter-spacing: 0.02em;
        }
        .gallery-lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fbf6ee;
          background: rgba(251, 246, 238, 0.08);
          transition: background 200ms ease;
        }
        .gallery-lightbox-close:hover {
          background: rgba(251, 246, 238, 0.18);
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-lightbox-scrim, .gallery-lightbox-frame { animation: none; }
        }
      `}</style>
    </div>
  );
}