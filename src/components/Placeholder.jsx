const glyphs = {
  sofa: <path d="M5 12v5a1 1 0 0 0 1 1h1v2M17 18v2M6 18h12M4 12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3H4v-3z M6 10V8.5a2 2 0 0 1 4 0V10M14 10V8.5a2 2 0 0 1 4 0V10" />,
  bed: <path d="M3 19v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 19v2M21 19v2M3 15h18M6 11V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" />,
  dining: <path d="M4 8h16l-1.5 4h-13L4 8zM9 12v7M15 12v7M6 8V6M18 8V6" />,
  chair: <path d="M7 4h10v7H7zM7 11v6M17 11v6M7 17h10v3H7zM7 21v0M17 21v0" />,
  table: <path d="M4 8h16M6 8v11M18 8v11M4 8l2-3h12l2 3" />,
  wardrobe: <path d="M6 3h12v18H6zM12 3v18M9 11v0M15 11v0" />,
  lamp: <path d="M9 4h6l2 5H7l2-5zM12 9v8M8 21h8M10 21l-1-4M14 21l1-4" />,
  shelf: <path d="M4 5h16M4 11h16M4 17h16M7 5v6M7 11v6M17 5v6M17 11v6" />,
  living: <path d="M4 20v-7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v7M13 20v-9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v9M4 20h18M8 9V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3" />,
  bedroom: <path d="M3 20v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 20h18M6 11V6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5M9 13h6" />,
  bath: <path d="M4 11V6a2 2 0 0 1 4 0M3 11h18v2a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-2zM7 21l1-2M17 21l-1-2" />,
};

const tints = ["#DCC9AB", "#C9B08A", "#B99A76", "#D8CBAE", "#C3A87F", "#AE8F68"];

/**
 * Stand-in furniture artwork used until real product photography is added.
 * Swap this component's usage for an <img> tag once real photos exist.
 */
export default function Placeholder({ kind, tint = 0, className = "" }) {
  return (
    <div
      className={"relative w-full h-full grain " + className}
      style={{ background: `linear-gradient(160deg, ${tints[tint % tints.length]}, var(--panel))` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="34%" height="34%" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal-soft)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
          {glyphs[kind]}
        </svg>
      </div>
    </div>
  );
}
