
import { useEffect, useRef, useState } from "react";

import Placeholder from "./Placeholder.jsx";

import { galleryItems } from "../data/furnitureData.js";

import GalleryLightbox from "./GalleryLightbox.jsx";

function HomeGalleryItem({ item, spanClass, onOpen }) {
  const [seen, setSeen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <button
      type="button"
      ref={ref}
      onClick={() => onOpen(item)}
      className={"gallery-item rounded-2xl text-left " + spanClass}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "scale(1)" : "scale(0.97)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      aria-label={`View ${item.label}`}
    >
      <div className="art absolute inset-0">
        {(item.src || item.img) && !imgError ? (
          <img
            src={item.src || item.img}
            alt={item.alt || item.label || ""}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <Placeholder kind={item.kind} tint={item.tint} />
        )}
      </div>

      <span className="gallery-item-corner" aria-hidden="true" />

      <div
        className="gallery-caption absolute inset-0 flex items-end p-4"
        style={{
          background:
            "linear-gradient(0deg, rgba(40,34,29,0.7), transparent 60%)",
        }}
      >
        <p className="text-sm font-medium text-[#F6F1E8]">
          {item.label}
        </p>
      </div>
    </button>
  );
}

export default function Gallery() {
  const [lightboxItem, setLightboxItem] = useState(null);

  return (
    <section className="py-16 md:py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p
            className="text-sm font-medium mb-2"
            style={{ color: "var(--clay)" }}
          >
            Real spaces
          </p>

          <h2
            className="font-display text-3xl md:text-4xl"
            style={{ color: "var(--charcoal)" }}
          >
            Furniture Gallery
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {galleryItems.map((g, i) => (
            <HomeGalleryItem
              key={g.label}
              item={g}
              spanClass={i % 5 === 0 ? "row-span-2" : ""}
              onOpen={setLightboxItem}
            />
          ))}
        </div>
      </div>

      {lightboxItem && (
        <GalleryLightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />
      )}

      <style>{`
        .gallery-item {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          padding: 0;
          border: none;
          background: none;
          font: inherit;
          cursor: pointer;
          overflow: hidden;
        }

        .gallery-item .art {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .gallery-item .art img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 500ms ease;
        }

        .gallery-item:hover .art img {
          transform: scale(1.04);
        }

        .gallery-item-corner {
          position: absolute;
          top: 12px;
          left: 12px;
          width: 22px;
          height: 22px;
          pointer-events: none;
          z-index: 2;
        }

        .gallery-item-corner::before,
        .gallery-item-corner::after {
          content: "";
          position: absolute;
          background: var(--brass);
          transition: transform 200ms ease-out;
        }

        .gallery-item-corner::before {
          top: 0;
          left: 0;
          width: 100%;
          height: 1.5px;
          transform: scaleX(0);
          transform-origin: left;
        }

        .gallery-item-corner::after {
          top: 0;
          left: 0;
          width: 1.5px;
          height: 100%;
          transform: scaleY(0);
          transform-origin: top;
        }

        .gallery-item:hover .gallery-item-corner::before,
        .gallery-item:focus-visible .gallery-item-corner::before {
          transform: scaleX(1);
        }

        .gallery-item:hover .gallery-item-corner::after,
        .gallery-item:focus-visible .gallery-item-corner::after {
          transform: scaleY(1);
        }

        .gallery-caption {
          z-index: 2;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-item {
            transition: none !important;
          }

          .gallery-item .art img {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

