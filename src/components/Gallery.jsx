import { useMemo, useState } from "react";

/* ------------------------------------------------------------------
   DATA (pehle ../data/galleryData.js me tha, ab yahin hai)
   Naya image add karna ho to count badha do, ya nayi category add karo.
   Images:  public/gallery/<prefix>-01.jpg, -02.jpg ...
   Videos:  public/videos/<name>.mp4
------------------------------------------------------------------- */

const categoryConfig = [
  { category: "Tea Table", prefix: "tea-table", label: "Tea Table", count: 6, video: "tea-table.mp4", videoTitle: "Tea Table Designs" },
  { category: "Bed", prefix: "bed", label: "Bed", count: 6, video: "bed.mp4", videoTitle: "Bed Designs" },
  { category: "Sofa", prefix: "sofa", label: "Sofa", count: 8, video: "sofa.mp4", videoTitle: "Sofa Designs" },
  { category: "TV Wall Unit", prefix: "tv-wall-unit", label: "TV Wall Unit", count: 5, video: "tv-wall-unit.mp4", videoTitle: "TV Wall Unit Designs" },
  { category: "Dressing Table with LED Mirror", prefix: "dressing-table", label: "Dressing Table with LED Mirror", count: 5, video: "dressing-table.mp4", videoTitle: "Dressing Table with LED Mirror" },
  { category: "Wardrobe", prefix: "wardrobe", label: "Wardrobe", count: 5, video: "wardrobe.mp4", videoTitle: "Wardrobe Designs" },
  { category: "Pooja Mandir Cabinet", prefix: "pooja-mandir", label: "Pooja Mandir Cabinet", count: 11, video: "pooja-mandir.mp4", videoTitle: "Pooja Mandir Cabinet" },
  { category: "Upholstered Bed Headboard", prefix: "headboard", label: "Upholstered Bed Headboard", count: 5, video: "headboard.mp4", videoTitle: "Upholstered Bed Headboard" },
  { category: "dining table", prefix: "dining-table", label: "Dining Table", count: 9, video: "dining-table.mp4", videoTitle: "Dining Table Designs" },
  { category: "Almirah", prefix: "almirah", label: "Almirah", count: 5, video: "almirah.mp4", videoTitle: "Almirah Designs" },
  { category: "Folding Almirah", prefix: "folding-almirah", label: "Folding Almirah", count: 5, video: "folding-almirah.mp4", videoTitle: "Folding Almirah Designs" },
];

const galleryCategories = ["All", ...categoryConfig.map((c) => c.category)];

const galleryImages = categoryConfig.flatMap((c) =>
  Array.from({ length: c.count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `${c.prefix}-${n}`,
      category: c.category,
      src: `/gallery/${c.prefix}-${n}.jpg`,
      alt: `${c.label} design ${i + 1}`,
      caption: c.label,
    };
  })
);

const galleryVideos = categoryConfig.map((c) => ({
  id: `${c.prefix}-video`,
  category: c.category,
  src: `/videos/${c.video}`,
  title: c.videoTitle,
}));

/* ------------------------------------------------------------------
   COMPONENTS
------------------------------------------------------------------- */

function GalleryImageCard({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="gallery-card group relative overflow-hidden rounded-2xl text-left"
      aria-label={`View ${item.caption}`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="gallery-card-media transition-transform duration-700 group-hover:scale-105"
      />

      <div className="gallery-card-overlay">
        <span>{item.caption}</span>
        <span aria-hidden="true">↗</span>
      </div>
    </button>
  );
}

function GalleryVideoCard({ video }) {
  const [videoError, setVideoError] = useState(false);

  return (
    <article className="gallery-card gallery-video-card overflow-hidden rounded-2xl">
      {!videoError ? (
        <video
          src={video.src}
          controls
          playsInline
          preload="metadata"
          className="gallery-card-media gallery-video-media"
          aria-label={video.title}
          onError={() => setVideoError(true)}
        >
          Your browser does not support video playback.
        </video>
      ) : (
        <div className="gallery-video-error">
          <span className="text-3xl" aria-hidden="true">▶</span>
          <p>Video could not be loaded</p>
          <p className="text-xs opacity-70">{video.src}</p>
        </div>
      )}

      <div className="gallery-video-caption">
        <p>VIDEO COLLECTION</p>
        <h3>{video.title}</h3>
      </div>
    </article>
  );
}

function GalleryLightbox({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption || "Furniture image"}
      onClick={onClose}
    >
      <button
        type="button"
        className="gallery-lightbox-close"
        onClick={onClose}
        aria-label="Close image"
      >
        ✕
      </button>

      <img
        src={item.src}
        alt={item.alt}
        onClick={(event) => event.stopPropagation()}
      />

      <p>{item.caption}</p>
    </div>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const displayItems = useMemo(() => {
    const images =
      activeCategory === "All"
        ? galleryImages
        : galleryImages.filter((item) => item.category === activeCategory);

    const videos =
      activeCategory === "All"
        ? galleryVideos
        : galleryVideos.filter((video) => video.category === activeCategory);

    // Selected category: us category ki images + uska video.
    if (activeCategory !== "All") {
      return [
        ...images.map((item) => ({ type: "image", key: item.id, item })),
        ...videos.map((video) => ({ type: "video", key: video.id, video })),
      ];
    }

    // All: har section ki images ke baad usi section ka ek video card.
    const combined = [];

    categoryConfig.forEach((section) => {
      images
        .filter((item) => item.category === section.category)
        .forEach((item) =>
          combined.push({ type: "image", key: item.id, item })
        );

      const sectionVideo = videos.find(
        (video) => video.category === section.category
      );

      if (sectionVideo) {
        combined.push({
          type: "video",
          key: sectionVideo.id,
          video: sectionVideo,
        });
      }
    });

    return combined;
  }, [activeCategory]);

  return (
    <section className="furniture-gallery">
      <div className="gallery-container">
        <header className="gallery-header">
          <p className="gallery-eyebrow">CRAFTED FOR YOUR HOME</p>
          <h2>Furniture Gallery</h2>
          <p className="gallery-description">
            Explore our furniture designs, styles and collections
            for every corner of your home.
          </p>
        </header>

        <div
          className="gallery-filters"
          aria-label="Filter furniture by category"
        >
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`gallery-filter ${
                activeCategory === category ? "active" : ""
              }`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {displayItems.map((entry) =>
            entry.type === "video" ? (
              <GalleryVideoCard key={entry.key} video={entry.video} />
            ) : (
              <GalleryImageCard
                key={entry.key}
                item={entry.item}
                onOpen={setSelectedImage}
              />
            )
          )}
        </div>

        {displayItems.length === 0 && (
          <p className="gallery-empty">No items found in this category.</p>
        )}
      </div>

      <GalleryLightbox
        item={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      <style>{`
        .furniture-gallery {
          background: #211d19;
          color: #f6f1e8;
          min-height: 400px;
          padding: 64px 0;
        }

        .gallery-container {
          width: min(1280px, calc(100% - 32px));
          margin: 0 auto;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .gallery-eyebrow {
          color: #d6b77a;
          font-size: 11px;
          letter-spacing: .28em;
          margin-bottom: 12px;
        }

        .gallery-header h2 {
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.2;
          font-weight: 600;
        }

        .gallery-description {
          max-width: 600px;
          margin: 14px auto 0;
          color: #c8bfb1;
          font-size: 14px;
          line-height: 1.8;
        }

        .gallery-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 32px;
        }

        .gallery-filter {
          border: 1px solid rgba(214, 183, 122, .3);
          border-radius: 999px;
          padding: 9px 16px;
          color: #e5dccf;
          background: transparent;
          font-size: 12px;
          cursor: pointer;
          transition: background .2s, color .2s, border-color .2s;
        }

        .gallery-filter:hover,
        .gallery-filter.active {
          background: #d6b77a;
          border-color: #d6b77a;
          color: #211d19;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          align-items: stretch;
        }

        .gallery-card {
          position: relative;
          display: block;
          width: 100%;
          min-width: 0;
          overflow: hidden;
          background: #302922;
          border: 1px solid rgba(214, 183, 122, .18);
          border-radius: 16px;
          text-align: left;
        }

        .gallery-card-media {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          background: #171411;
        }

        .gallery-card-overlay {
          position: absolute;
          inset: auto 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          padding: 28px 12px 12px;
          color: #fff;
          font-size: 12px;
          background: linear-gradient(
            0deg,
            rgba(20, 17, 14, .92),
            transparent
          );
          pointer-events: none;
        }

        .gallery-video-card {
          display: flex;
          flex-direction: column;
          align-self: stretch;
        }

        .gallery-video-media {
          flex: 1;
          min-height: 0;
          object-fit: cover;
        }

        .gallery-video-caption {
          padding: 12px;
          background: #29231d;
        }

        .gallery-video-caption p {
          color: #d6b77a;
          font-size: 9px;
          letter-spacing: .18em;
          margin-bottom: 5px;
        }

        .gallery-video-caption h3 {
          color: #f6f1e8;
          font-size: 13px;
          line-height: 1.5;
        }

        .gallery-video-error {
          aspect-ratio: 4 / 3;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
          padding: 16px;
          text-align: center;
          color: #f6f1e8;
          background: #171411;
          overflow-wrap: anywhere;
        }

        .gallery-empty {
          padding: 40px 0;
          text-align: center;
          color: #c8bfb1;
        }

        .gallery-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 24px;
          background: rgba(0, 0, 0, .94);
        }

        .gallery-lightbox img {
          display: block;
          max-width: 92vw;
          max-height: 82vh;
          object-fit: contain;
        }

        .gallery-lightbox p {
          color: #f6f1e8;
          text-align: center;
        }

        .gallery-lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(255,255,255,.3);
          border-radius: 50%;
          color: white;
          background: #29231d;
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-filter,
          .gallery-card-media {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}