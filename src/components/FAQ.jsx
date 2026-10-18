import { useState } from "react";
import { IconChevron } from "./icons.jsx";
import { faqs } from "../data/furnitureData.js";

function FAQItem({ item, open, onClick }) {
  return (
    <div className="border-b py-5" style={{ borderColor: "var(--line)" }}>
      <button onClick={onClick} className="w-full flex items-center justify-between text-left gap-4">
        <span className="font-display text-lg" style={{ color: "var(--charcoal)" }}>{item.q}</span>
        <IconChevron open={open} />
      </button>
      <div style={{ maxHeight: open ? "200px" : "0px", overflow: "hidden", transition: "max-height .35s ease" }}>
        <p className="pt-3 pr-8" style={{ color: "var(--charcoal-soft)" }}>{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="py-16 md:py-24 px-5 md:px-8" style={{ background: "var(--panel)" }}>
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl mb-10 text-center" style={{ color: "var(--charcoal)" }}>
          Frequently Asked Questions
        </h2>
        {faqs.map((f, i) => (
          <FAQItem key={f.q} item={f} open={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? -1 : i)} />
        ))}
      </div>
    </section>
  );
}
