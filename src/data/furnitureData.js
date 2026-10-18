// TEMP: img fields point to placeholder stock photos so the layout works out of
// the box. Once you have real photography, drop 4K images into
// /public/categories/ (e.g. sofas.jpg) and change each img value to
// "/categories/sofas.jpg" etc. See /public/categories/README.txt.
export const categories = [
  { name: "Sofas", kind: "sofa",img: "/categories/sofas.jpg" },
  { name: "Beds", kind: "bed",  img: "/categories/beds.jpg"},
  { name: "Dining", kind: "dining",  img: "/categories/dining.jpg" },
  { name: "Chairs", kind: "chair", img: "/categories/chairs.jpg" },
  { name: "Tables", kind: "table", img: "/categories/tables.jpg" },
  { name: "Wardrobes", kind: "wardrobe", img: "/categories/wardrobes.jpg" },
];

export const products = [
  { name: "Amara Three-Seat Sofa", cat: "Sofas", kind: "sofa", price: "₹68,500", desc: "...", tint: 0, img: "/products/amara-sofa.jpg" },
  { name: "Wilder Lounge Chair", cat: "Chairs", kind: "chair", price: "₹24,900", desc: "...", tint: 1, img: "/products/wilder-chair.jpg" },
  { name: "Kessler Platform Bed", cat: "Beds", kind: "bed", price: "₹52,000", desc: "...", tint: 2, img: "/products/kessler-bed.jpg" },
  { name: "Bramwell Dining Table", cat: "Dining", kind: "dining", price: "₹58,000", desc: "...", tint: 3, img: "/products/bramwell-dining.jpg" },
  { name: "Solen Coffee Table", cat: "Tables", kind: "table", price: "₹18,500", desc: "...", tint: 4, img: "/products/solen-table.jpg" },
  { name: "Marlow Wardrobe", cat: "Wardrobes", kind: "wardrobe", price: "₹64,000", desc: "...", tint: 5, img: "/products/marlow-wardrobe.jpg" },
  { name: "Fenwick Armchair", cat: "Chairs", kind: "chair", price: "₹21,000", desc: "...", tint: 1, img: "/products/fenwick-armchair.jpg" },
  { name: "Cove Dining Chair (Set of 2)", cat: "Dining", kind: "dining", price: "₹16,500", desc: "...", tint: 2, img: "/products/cove-chairs.jpg" },
];

export const bestSellers = [
  { name: "Amara Three-Seat Sofa", kind: "sofa", price: "₹68,500", tint: 0 },
  { name: "Kessler Platform Bed", kind: "bed", price: "₹52,000", tint: 2 },
  { name: "Elm Bookshelf", kind: "shelf", price: "₹27,800", tint: 3 },
  { name: "Fenwick Armchair", kind: "chair", price: "₹21,000", tint: 1 },
  { name: "Bramwell Dining Table", kind: "dining", price: "₹58,000", tint: 4 },
  { name: "Harlow Bedside Table", kind: "table", price: "₹9,400", tint: 5 },
];

export const galleryItems = [
  { label: "Living Room, Amara Set", kind: "living", tint: 0, img: "/gallery-home/living-room-amara.jpg" },
  { label: "Primary Bedroom, Kessler", kind: "bedroom", tint: 1, img: "/gallery-home/primary-bedroom-kessler.jpg" },
  { label: "Dining Corner, Bramwell", kind: "dining", tint: 2, img: "/gallery-home/dining-corner-bramwell.jpg" },
  { label: "Reading Nook, Fenwick", kind: "chair", tint: 3, img: "/gallery-home/reading-nook-fenwick.jpg" },
  { label: "Guest Bedroom, Linen", kind: "bed", tint: 4, img: "/gallery-home/guest-bedroom-linen.jpg" },
  { label: "Study Shelving, Elm", kind: "shelf", tint: 5, img: "/gallery-home/study-shelving-elm.jpg" },
  { label: "Dining Hall, Cove Chairs", kind: "dining", tint: 1, img: "/gallery-home/dining-hall-cove.jpg" },
  { label: "Family Room, Wilder", kind: "living", tint: 2, img: "/gallery-home/family-room-wilder.jpg" },
];

export const testimonials = [
  { name: "Ananya Rao", city: "Bengaluru", stars: 5, text: "The dining table we ordered was made exactly to our space, and the finish is even better in person than in the showroom photos." },
  { name: "Vikram Sen", city: "Pune", stars: 5, text: "Custom wardrobe fit our awkward corner perfectly. The team measured twice and it showed in the final install." },
  { name: "Priya Malhotra", city: "Indore", stars: 4, text: "Lovely craftsmanship on our sofa. Delivery took a little longer than expected, but the quality made up for it." },
];

export const faqs = [
  { q: "Do you provide custom furniture?", a: "Yes. Most pieces in our collection can be customised in size, material, colour and finish to match your space." },
  { q: "What materials do you use?", a: "We work primarily with kiln-dried hardwoods such as teak, sheesham and oak, alongside natural upholstery like linen, boucle and leather." },
  { q: "Do you provide delivery?", a: "Delivery is available across most major cities. Timelines depend on whether a piece is in stock or made to order." },
  { q: "Is installation available?", a: "Yes, our team handles assembly and placement for wardrobes, beds and modular pieces at no extra charge within city limits." },
  { q: "Do your products have a warranty?", a: "Every piece carries a two-year structural warranty covering frames, joinery and hardware." },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Furniture", href: "#furniture" },
  { label: "About", href: "#about" },
  { label: "Collections", href: "#collection" },
  { label: "Contact", href: "#contact" },
];
