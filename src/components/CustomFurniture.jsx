const opts = [
  { label: "Size", text: "Scaled to your room's exact dimensions" },
  { label: "Colour", text: "Matched to your existing palette" },
  { label: "Material", text: "Timber, upholstery and finish of your choice" },
  { label: "Design", text: "Adjust arms, legs and proportions" },
];

export default function CustomFurniture() {
  const whatsappMessage = encodeURIComponent(
    "Hello Raj Furniture, I would like to enquire about your custom furniture. Please share more details."
  );

  const whatsappUrl = `https://wa.me/919406654752?text=${whatsappMessage}`;

  return (
    <section
      className="py-16 md:py-24 px-5 md:px-8"
      style={{ background: "var(--charcoal)" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <p
            className="text-sm font-medium mb-3"
            style={{ color: "var(--brass)" }}
          >
            Made to order
          </p>

          <h2
            className="font-display text-3xl md:text-4xl mb-5"
            style={{ color: "var(--cream)" }}
          >
            Custom Furniture, Built Around You
          </h2>

          <p
            className="mb-8"
            style={{ color: "var(--beige)" }}
          >
            Most pieces in our showroom can be remade to fit an odd-shaped
            alcove, a specific colour story, or simply your own taste. Tell us
            the room and we'll do the rest.
          </p>

          {/* WhatsApp Enquiry Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block px-7 py-3.5 rounded-full font-medium"
          >
            Enquire Now
          </a>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          {opts.map((o) => (
            <div
              key={o.label}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(246,241,232,0.06)",
                border: "1px solid rgba(246,241,232,0.15)",
              }}
            >
              <p
                className="font-display text-lg mb-1"
                style={{ color: "var(--cream)" }}
              >
                {o.label}
              </p>

              <p
                className="text-sm"
                style={{ color: "var(--beige)" }}
              >
                {o.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}