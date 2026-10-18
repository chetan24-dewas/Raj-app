
import { useEffect, useRef, useState } from "react";
import {
  IconPhone,
  IconMail,
  IconPin,
  IconClock,
} from "./icons.jsx";

// Google Maps location: New Raj Steel Furniture
const DIRECTIONS_HREF =
  "https://www.google.com/maps/dir/?api=1&destination=New+Raj+Steel+Furniture&destination_place_id=0x91fdac4bd99f9ebe";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.5937014621045!2d76.0527288753121!3d22.965185779214067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396317916c689147%3A0x91fdac4bd99f9ebe!2sNew%20Raj%20Steel%20Furniture!5e0!3m2!1sen!2sin!4v1792321858886!5m2!1sen!2sin";

export default function Contact() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const iconStyle = {
    background: "var(--cream)",
  };

  const textStyle = {
    color: "var(--charcoal)",
  };

  const mutedStyle = {
    color: "var(--charcoal-soft)",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="px-5 py-16 md:px-8 md:py-24"
      style={{ background: "var(--panel)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p
            className="mb-2 text-sm font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--clay)" }}
          >
            Visit or reach out
          </p>

          <h2
            className="font-display text-3xl md:text-4xl"
            style={textStyle}
          >
            Visit Our Showroom
          </h2>

          <p className="mt-3 text-sm md:text-base" style={mutedStyle}>
            Impressive Lines. Exceptional Craftsmanship.
          </p>
        </div>

        <div
          className="relative isolate overflow-hidden rounded-[1.5rem]"
          style={{
            minHeight: "560px",
            border: "1px solid var(--line)",
            background: "var(--cream)",
          }}
        >
          {/* Actual interactive Google Map */}
          <iframe
            title="New Raj Steel Furniture location on Google Maps"
            src={MAP_EMBED_URL}
            width="100%"
            height="560"
            style={{
              display: "block",
              width: "100%",
              height: "560px",
              border: 0,
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />

          {/* Contact Information Card */}
          <div
            className="absolute left-4 right-4 top-4 max-w-[380px] rounded-2xl p-5 sm:left-6 sm:right-auto sm:top-6 sm:p-6"
            style={{
              background: "rgba(246,241,232,0.96)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: "0 20px 40px -20px rgba(40,34,29,0.4)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <p
              className="mb-1 text-sm font-medium"
              style={{ color: "var(--clay)" }}
            >
              We would love to see you
            </p>

            <h3
              className="mb-5 font-display text-2xl"
              style={textStyle}
            >
              Contact Us
            </h3>

            <div className="space-y-4">
              {/* Phone */}
              <a
                href="tel:+919406654752"
                className="group flex items-start gap-3"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={iconStyle}
                >
                  <IconPhone size={18} />
                </span>

                <span>
                  <span className="block font-medium" style={textStyle}>
                    Phone
                  </span>
                  <span className="block text-sm" style={mutedStyle}>
                    +91 94066 54752
                  </span>
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:Yhfurniturewala@gmail.com"
                className="group flex items-start gap-3"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={iconStyle}
                >
                  <IconMail size={18} />
                </span>

                <span className="min-w-0">
                  <span className="block font-medium" style={textStyle}>
                    Email
                  </span>
                  <span
                    className="block break-all text-sm"
                    style={mutedStyle}
                  >
                    Yhfurniturewala@gmail.com
                  </span>
                </span>
              </a>

              {/* Address */}
              <a
                href={DIRECTIONS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={iconStyle}
                >
                  <IconPin size={18} />
                </span>

                <span>
                  <span className="block font-medium" style={textStyle}>
                    Our Location
                  </span>
                  <span className="block text-sm" style={mutedStyle}>
                    New Raj Steel Furniture
                  </span>
                  <span
                    className="mt-1 block text-xs font-medium"
                    style={{ color: "var(--clay)" }}
                  >
                    View location on Google Maps ↗
                  </span>
                </span>
              </a>

              {/* Business Hours */}
              <div className="flex items-start gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={iconStyle}
                >
                  <IconClock size={18} />
                </span>

                <span>
                  <span className="block font-medium" style={textStyle}>
                    Business Hours
                  </span>
                  <span className="block text-sm" style={mutedStyle}>
                    Mon–Sat, 10:00 AM – 8:00 PM
                  </span>
                </span>
              </div>
            </div>

            {/* Directions button inside the card */}
            <a
              href={DIRECTIONS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                background: "var(--charcoal)",
                color: "var(--cream)",
                outlineColor: "var(--clay)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--clay)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--charcoal)";
              }}
            >
              Get Directions
              <span aria-hidden="true">↗</span>
            </a>
        
          </div>
        </div>
      </div>
    </section>
  );
}