
import { navLinks, categories } from "../data/furnitureData.js";

const PHONES = ["9406654752"];

const WHATSAPP_NUMBER = "9406654752";



function WhatsappIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      {...props}
    >
      <circle cx="12" cy="12" r="12" fill="#25D366" />

      <path
        fill="#fff"
        d="M12 4.5c-4.14 0-7.5 3.36-7.5 7.5 0 1.32.35 2.56.96 3.63L4.5 19.5l3.99-1.05a7.46 7.46 0 0 0 3.51.87c4.14 0 7.5-3.36 7.5-7.5S16.14 4.5 12 4.5zm4.36 10.62c-.18.5-.9.92-1.46 1.03-.39.08-.9.14-2.6-.56-2.18-.9-3.6-3.1-3.71-3.24-.11-.15-.88-1.17-.88-2.23s.55-1.58.75-1.8c.18-.2.4-.25.53-.25h.38c.13 0 .3-.02.46.35.18.42.6 1.46.65 1.56.05.1.08.22.02.36-.06.14-.09.22-.18.34-.09.12-.19.27-.27.36-.09.1-.18.2-.08.4.11.2.48.79 1.03 1.28.71.63 1.3.83 1.5.92.15.07.24.06.33-.04.09-.1.4-.47.51-.63.11-.16.22-.13.37-.08.15.05.95.45 1.11.53.16.08.27.12.31.19.05.07.05.4-.13.9z"
      />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M4 4.5h4l2 5-2.5 1.5a11 11 0 0 0 5.5 5.5l1.5-2.5 5 2v4c0 1-1 1.5-2 1.5C10.5 21 3 13.5 3 6.5c0-1 .5-2 1-2z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="pt-0 pb-8 px-5 md:px-8"
      style={{ background: "var(--charcoal)" }}
    >
      {/* Top tier: CTA */}
      <div
        className="py-11 px-5 text-center"
        style={{ background: "var(--wood, #A9713F)" }}
      >
        <div className="max-w-xl mx-auto">
          <p
            className="text-sm mb-2"
            style={{ color: "rgba(246,241,232,0.85)" }}
          >
            Looking for custom furniture?
          </p>

          <h3
            className="font-display text-2xl md:text-3xl mb-5"
            style={{ color: "var(--cream)" }}
          >
            Call us directly — we're happy to help.
          </h3>

          <a
            href={`tel:+91${PHONES[0]}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium"
            style={{
              background: "var(--charcoal)",
              color: "var(--cream)",
            }}
          >
            <PhoneIcon />
            Call {PHONES[0]}
          </a>
        </div>
      </div>

      {/* Bottom tier: links */}
      <div className="max-w-7xl mx-auto pt-10">
        <div
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10"
          style={{ color: "var(--beige)" }}
        >
          {/* Brand */}
          <div>
            <p
              className="font-display text-2xl mb-3"
              style={{ color: "var(--cream)" }}
            >
              Raj Furniture
            </p>

            <p className="text-sm">
              Quality furniture crafted for your home, made with care and
              delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p
              className="font-display text-base mb-4"
              style={{ color: "var(--cream)" }}
            >
              Quick Links
            </p>

            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="footer-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <p
              className="font-display text-base mb-4"
              style={{ color: "var(--cream)" }}
            >
              Categories
            </p>

            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.name}>
                  <a href="#products" className="footer-link">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="font-display text-base mb-4"
              style={{ color: "var(--cream)" }}
            >
              Contact
            </p>

            <ul className="space-y-2 text-sm mb-4">
              {PHONES.map((p) => (
                <li key={p}>
                  <a href={`tel:+91${p}`} className="footer-link">
                    {p}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/91${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex items-center justify-center w-9 h-9 rounded-full"
                style={{
                  background: "rgba(246,241,232,0.08)",
                }}
              >
                <WhatsappIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs"
          style={{
            borderTop: "1px solid rgba(246,241,232,0.15)",
            color: "rgba(228,214,192,0.7)",
          }}
        >
          <p>
            © {new Date().getFullYear()} Raj Furniture. All
            rights reserved.
          </p>

          <p>
            Designed for local service — details shown for illustration.
          </p>
        </div>
      </div>
    </footer>
  );
}

