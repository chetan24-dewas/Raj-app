
import { useEffect, useState } from "react";

const GOOGLE_REVIEW_LINK =
  "https://share.google/5AyGpO94nL5ZQmzXe";


function GoogleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.85z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.05l3.66 2.85c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("welcomePopupShown")) return;

    const onScroll = () => {
      if (window.scrollY > 250) {
        setOpen(true);
        sessionStorage.setItem("welcomePopupShown", "true");
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(20,17,14,0.72)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="rounded-2xl overflow-hidden flex flex-col sm:flex-row max-w-lg w-full relative"
        style={{ background: "var(--panel)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center text-sm z-10"
          style={{
            background: "var(--cream)",
            color: "var(--charcoal)",
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Left Side */}
        <div
          className="flex-1 p-7 flex flex-col items-start gap-2.5"
          style={{
            background:
              "linear-gradient(160deg, var(--charcoal), #3a3128)",
            color: "var(--cream)",
          }}
        >

          <h3 className="font-display text-lg m-0">
            Welcome to Raj Furniture
          </h3>

          <p
            className="text-sm m-0"
            style={{ opacity: 0.85 }}
          >
            Explore our latest furniture collection, offers and custom designs.
          </p>

          {/* Google Review */}
          <a
            href={GOOGLE_REVIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold px-4 py-2.5 rounded-full no-underline flex items-center gap-1.5"
            style={{
              background: "rgba(255,255,255,0.92)",
              color: "var(--charcoal)",
            }}
          >
            <GoogleIcon />
            Find us on Google Maps
          </a>
        </div>

        {/* Right Side */}
        <div className="flex-1 p-7 flex flex-col justify-center gap-2">
          <span
            style={{
              color: "var(--brass)",
              letterSpacing: 2,
              fontSize: 15,
            }}
          >
            ★★★★★
          </span>

          <p
            className="text-sm italic m-0"
            style={{ color: "var(--charcoal-soft)" }}
          >
            "Quality furniture, trusted service and honest pricing
            for every home."
          </p>

          <div
            className="text-xs font-bold not-italic mt-1"
            style={{ color: "var(--charcoal)" }}
          >
            — Yusuf
          </div>

          <div
            className="text-[11px] mt-1"
            style={{ color: "var(--charcoal-soft)" }}
          >
            Owner, Raj Furniture
          </div>
        </div>
      </div>
    </div>
  );
}
