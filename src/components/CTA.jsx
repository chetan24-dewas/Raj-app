import { IconWhatsapp } from "./icons.jsx";

export default function CTA() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8">
      <div className="max-w-5xl mx-auto text-center rounded-[2.5rem] px-8 py-16" style={{ background: "var(--charcoal)" }}>
        <h2 className="font-display text-3xl md:text-5xl mb-5" style={{ color: "var(--cream)" }}>
          Let's Create Your Perfect Space
        </h2>
        <p className="max-w-lg mx-auto mb-9" style={{ color: "var(--beige)" }}>
          From stylish furniture to reliable electronics and quality hardware, we bring everything you need for your home and everyday spaces under one roof. Visit our showroom and explore our range, or get in touch with us to find the right products for your needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#contact" className="btn-primary px-7 py-3.5 rounded-full font-medium">
            Contact Us
          </a>
          <a
            href="https://wa.me/919406654752"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-full font-medium flex items-center gap-2"
            style={{ background: "#3FA24A", color: "#fff" }}
          >
            <IconWhatsapp size={18} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
