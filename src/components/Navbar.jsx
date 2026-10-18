import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  IconMenu,
  IconClose,
  IconPhone,
  IconWhatsapp,
} from "./icons.jsx";

/* ============================================================
   LOGO
   LOGO_SRC       -> used on the DARK theme
   LOGO_SRC_LIGHT -> used on the LIGHT theme
   If your logo is light-coloured, make a dark version and put it
   in /public/logo/ then change LOGO_SRC_LIGHT below.
   ============================================================ */

const LOGO_SRC = ""; // add /logo/raj-furniture-logo.png and set path here
const LOGO_SRC_LIGHT = "";

const WHATSAPP_NUMBER = "919406654752";
const CALL_NUMBER = "+919406654752";

const WHATSAPP_MESSAGE =
  "Hello Raj Furniture, I would like to book an appointment and know more about your furniture collection.";

const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const CALL_HREF = `tel:${CALL_NUMBER}`;

const NAV_LINKS = [
  { label: "Home", hash: "home" },
  { label: "About", hash: "about" },
  { label: "Collection", hash: "collection" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", hash: "contact" },
];

/* ============================================================
   THEME HOOK
   ============================================================ */

function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("raj-theme", theme);
    } catch (e) {
      /* storage blocked — ignore */
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return [theme, toggle];
}

/* ============================================================
   THEME TOGGLE
   ============================================================ */

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={onToggle}
      className={`theme-toggle ${isDark ? "is-dark" : ""}`}
    >
      <span className="theme-toggle-thumb">
        <span className="theme-icon theme-icon-sun"><SunIcon /></span>
        <span className="theme-icon theme-icon-moon"><MoonIcon /></span>
      </span>
    </button>
  );
}

/* ============================================================
   LOGO COMPONENT
   ============================================================ */

function Logo({ theme }) {
  const src = theme === "dark" ? LOGO_SRC : LOGO_SRC_LIGHT;

  if (src) {
    return (
      <img
        src={src}
        alt="Raj Furniture"
        className="h-16 md:h-20 lg:h-[76px] w-auto object-contain"
      />
    );
  }

  return (
    <span className="flex flex-col leading-none">
      <span
        className="font-display text-xl md:text-2xl tracking-tight whitespace-nowrap"
        style={{ color: "var(--nav-text)" }}
      >
        Raj <span style={{ color: "var(--nav-accent)" }}>Furniture</span>
      </span>
      <span
        aria-hidden="true"
        className="mt-1.5 h-[1.5px] w-10"
        style={{ background: "var(--nav-accent)" }}
      />
    </span>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */

export default function Navbar() {
  const [theme, toggleTheme] = useTheme();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderFade, setLoaderFade] = useState(false);

  const [activeHash, setActiveHash] = useState("home");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const location = useLocation();
  const isHome = location.pathname === "/";

  const observerRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  /* ---------- Loader ---------- */

  useEffect(() => {
    const fadeTimer = setTimeout(() => setLoaderFade(true), 1800);
    const hideTimer = setTimeout(() => setLoaderVisible(false), 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  /* ---------- Scroll ---------- */

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- Scroll spy ---------- */

  useEffect(() => {
    if (!isHome) return undefined;

    const ids = ["home", "about", "collection", "furniture", "contact"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (sections.length === 0) return undefined;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveHash(visible.target.id);
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [isHome]);

  /* ---------- Active link ---------- */

  const isLinkActive = (link) => {
    if (link.to) return location.pathname === link.to;
    return isHome && activeHash === link.hash;
  };

  const activeIndex = NAV_LINKS.findIndex(isLinkActive);

  /* ---------- Sliding indicator ---------- */

  const measure = (index) => {
    const el = itemRefs.current[index];
    const container = listRef.current;

    if (!el || !container) return;

    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    setIndicator({
      left: elRect.left - containerRect.left,
      width: elRect.width,
      opacity: 1,
    });
  };

  const refreshIndicator = () => {
    const target = hoveredIndex !== null ? hoveredIndex : activeIndex;

    if (target === -1) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    measure(target);
  };

  useLayoutEffect(() => {
    refreshIndicator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredIndex, activeIndex, location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", refreshIndicator);
    return () => window.removeEventListener("resize", refreshIndicator);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredIndex, activeIndex]);

  /* ---------- Link href ---------- */

  const linkHref = (link) => {
    if (link.to) return link.to;
    return isHome ? `#${link.hash}` : `/#${link.hash}`;
  };

  return (
    <>
      {/* ======================== LOADER ======================== */}

      {loaderVisible && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${
            loaderFade ? "loader-fade-out" : ""
          }`}
          style={{ background: "var(--nav-bg)" }}
          aria-label="Loading Raj Furniture"
        >
          <div className="flex flex-col items-center">
            <div className="loader-logo">
              {LOGO_SRC ? (
                <img
                  src={theme === "dark" ? LOGO_SRC : LOGO_SRC_LIGHT}
                  alt="Raj Furniture"
                  className="h-10 md:h-12 w-auto object-contain"
                />
              ) : (
                <div
                  className="font-display text-2xl md:text-3xl tracking-tight whitespace-nowrap"
                  style={{ color: "var(--nav-text)" }}
                >
                  Raj <span style={{ color: "var(--nav-accent)" }}>Furniture</span>
                </div>
              )}
            </div>

            <div
              className="loader-line mt-4"
              aria-hidden="true"
              style={{ background: "var(--nav-accent)" }}
            />
          </div>
        </div>
      )}

      {/* ======================== NAVBAR ======================== */}

      <header
        className={`nav-header fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${
          scrolled ? "is-scrolled" : ""
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 md:px-8 h-20 md:h-24 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            aria-label="Raj Furniture home"
            className="shrink-0 flex items-center"
          >
            <Logo theme={theme} />
          </Link>

          {/* ---------------- DESKTOP ---------------- */}

          <div className="hidden md:flex items-center gap-6">
            <ul
              ref={listRef}
              className="relative flex items-center gap-7"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {NAV_LINKS.map((link, i) => {
                const active = isLinkActive(link);
                const cls = `nav-link ${active ? "is-active" : ""}`;

                return (
                  <li
                    key={link.label}
                    ref={(el) => (itemRefs.current[i] = el)}
                    onMouseEnter={() => setHoveredIndex(i)}
                  >
                    {link.to ? (
                      <Link to={link.to} className={cls}>
                        {link.label}
                      </Link>
                    ) : (
                      <a href={linkHref(link)} className={cls}>
                        {link.label}
                      </a>
                    )}
                  </li>
                );
              })}

              {/* Sliding underline */}
              <span
                aria-hidden="true"
                className="nav-underline absolute -bottom-1.5 h-[2px] rounded-full pointer-events-none"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity,
                }}
              />
            </ul>

            {/* Theme + Call + WhatsApp */}
            <div
              className="flex items-center gap-2 pl-3 shrink-0"
              style={{ borderLeft: "1px solid var(--nav-line)" }}
            >
              <ThemeToggle theme={theme} onToggle={toggleTheme} />

              <a
                href={CALL_HREF}
                aria-label="Call Raj Furniture"
                className="nav-call w-9 h-9 rounded-full flex items-center justify-center"
              >
                <IconPhone size={17} />
              </a>

              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book an appointment on WhatsApp"
                className="nav-cta flex items-center gap-2 pl-3 pr-4 py-2 rounded-full text-sm font-bold whitespace-nowrap"
              >
                <IconWhatsapp size={16} />
                WhatsApp
              </a>
            </div>
          </div>

          {/* ---------------- MOBILE BAR ---------------- */}

          <div className="md:hidden flex items-center gap-3 shrink-0">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />

            <button
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              style={{ color: "var(--nav-text)" }}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </nav>

        {/* ---------------- MOBILE MENU ---------------- */}

        {open && (
          <div
            className="md:hidden px-5 pb-6 pt-2 border-t nav-mobile-panel"
            style={{
              borderColor: "var(--nav-line)",
              backgroundColor: "var(--nav-bg)",
            }}
          >
            <ul className="flex flex-col gap-1 pt-4 text-lg font-display">
              {NAV_LINKS.map((link, i) => {
                const active = isLinkActive(link);
                const color = active ? "var(--nav-accent)" : "var(--nav-text)";

                return (
                  <li
                    key={link.label}
                    className="py-2 border-b nav-mobile-item"
                    style={{
                      borderColor: "var(--nav-line)",
                      animationDelay: `${i * 60}ms`,
                    }}
                  >
                    {link.to ? (
                      <Link
                        to={link.to}
                        onClick={() => setOpen(false)}
                        style={{ color }}
                        className="font-semibold"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={linkHref(link)}
                        onClick={() => setOpen(false)}
                        style={{ color }}
                        className="font-semibold"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3 mt-5">
              <a
                href={CALL_HREF}
                className="nav-call flex items-center justify-center gap-2 flex-1 py-3 rounded-full text-sm font-bold"
              >
                <IconPhone size={16} />
                Call
              </a>

              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="nav-cta flex items-center justify-center gap-2 flex-1 py-3 rounded-full text-sm font-bold"
              >
                <IconWhatsapp size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* ======================== STYLES ======================== */}

        <style>{`

          /* ---------- Header ---------- */

          .nav-header {
            background-color: color-mix(in srgb, var(--nav-bg) 92%, transparent);
            border-bottom: 1px solid color-mix(in srgb, var(--nav-accent) 16%, transparent);
            transition: background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.3s ease;
          }

          .nav-header.is-scrolled {
            background-color: color-mix(in srgb, var(--nav-bg) 97%, transparent);
            border-bottom-color: var(--nav-line);
            box-shadow: 0 8px 28px -14px rgba(0, 0, 0, 0.45);
          }

          /* ---------- Links ---------- */

          .nav-link {
            display: block;
            font-weight: 700;
            font-size: 13px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 4px 0;
            color: var(--nav-text-soft);
            transition: color 0.3s ease;
          }

          .nav-link:hover,
          .nav-link.is-active {
            color: var(--nav-accent);
          }

          .nav-underline {
            background: var(--nav-accent);
            box-shadow: 0 0 8px color-mix(in srgb, var(--nav-accent) 55%, transparent);
            transition:
              left 0.45s cubic-bezier(0.65, 0, 0.35, 1),
              width 0.45s cubic-bezier(0.65, 0, 0.35, 1),
              opacity 0.25s ease;
          }

          /* ---------- Call + WhatsApp ---------- */

          .nav-call {
            color: var(--nav-text);
            border: 1px solid var(--nav-accent);
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .nav-call:hover {
            background: var(--nav-accent);
            color: var(--nav-cta-text);
          }

          .nav-cta {
            background: var(--nav-cta-bg);
            color: var(--nav-cta-text);
            transition: transform 0.3s ease, filter 0.3s ease;
          }

          .nav-cta:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
          }

          /* ---------- Theme toggle ---------- */

          .theme-toggle {
            position: relative;
            flex: none;
            width: 54px;
            height: 28px;
            padding: 0;
            border-radius: 999px;
            border: 1px solid var(--nav-accent);
            background: color-mix(in srgb, var(--nav-accent) 12%, transparent);
            cursor: pointer;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
          }

          .theme-toggle:hover {
            box-shadow: 0 0 10px color-mix(in srgb, var(--nav-accent) 50%, transparent);
          }

          .theme-toggle:focus-visible {
            outline: 2px solid var(--nav-accent);
            outline-offset: 3px;
          }

          .theme-toggle-thumb {
            position: absolute;
            top: 3px;
            left: 0;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--nav-accent);
            transform: translateX(4px);
            transition: transform 0.35s cubic-bezier(0.65, 0, 0.35, 1);
          }

          .theme-toggle.is-dark .theme-toggle-thumb {
            transform: translateX(28px);
          }

          .theme-icon {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--nav-cta-text);
            transition: opacity 0.25s ease, transform 0.4s ease;
          }

          .theme-icon-sun  { opacity: 1; transform: rotate(0deg); }
          .theme-icon-moon { opacity: 0; transform: rotate(-90deg); }

          .theme-toggle.is-dark .theme-icon-sun  { opacity: 0; transform: rotate(90deg); }
          .theme-toggle.is-dark .theme-icon-moon { opacity: 1; transform: rotate(0deg); }

          /* ---------- Loader ---------- */

          .loader-logo {
            opacity: 0;
            transform: scale(0.94);
            animation: loaderLogoReveal 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms forwards;
          }

          @keyframes loaderLogoReveal {
            0%   { opacity: 0; transform: scale(0.94); }
            100% { opacity: 1; transform: scale(1); }
          }

          .loader-line {
            width: 140px;
            height: 2px;
            transform: scaleX(0);
            transform-origin: center;
            opacity: 0;
            animation:
              loaderLineReveal 850ms cubic-bezier(0.65, 0, 0.35, 1) 300ms forwards,
              loaderGlow 400ms ease-out 1050ms forwards;
          }

          @keyframes loaderLineReveal {
            0%   { transform: scaleX(0); opacity: 0; }
            20%  { opacity: 1; }
            100% { transform: scaleX(1); opacity: 1; }
          }

          @keyframes loaderGlow {
            0%   { box-shadow: 0 0 6px rgba(179,146,92,0.25); }
            50%  { box-shadow: 0 0 16px rgba(179,146,92,0.65); }
            100% { box-shadow: 0 0 8px rgba(179,146,92,0.35); }
          }

          .loader-fade-out {
            opacity: 0;
            pointer-events: none;
            transition: opacity 400ms cubic-bezier(0.4, 0, 1, 1);
          }

          /* ---------- Mobile nav ---------- */

          .nav-mobile-panel {
            animation: navMobileIn 0.28s ease-out both;
          }

          @keyframes navMobileIn {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .nav-mobile-item {
            animation: navItemIn 0.35s ease-out both;
          }

          @keyframes navItemIn {
            from { opacity: 0; transform: translateX(-8px); }
            to   { opacity: 1; transform: translateX(0); }
          }

          /* ---------- Reduced motion ---------- */

          @media (prefers-reduced-motion: reduce) {
            .loader-logo,
            .loader-line {
              animation: none;
              opacity: 1;
              transform: none;
            }

            .loader-fade-out { transition: none; }

            .nav-mobile-panel,
            .nav-mobile-item { animation: none; }

            .theme-toggle-thumb,
            .theme-icon,
            .nav-header { transition: none; }
          }

        `}</style>
      </header>
    </>
  );
}