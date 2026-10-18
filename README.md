# Wren & Oak — Furniture Showroom

A static, no-backend furniture showroom site built with React and Tailwind CSS (Vite).

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  main.jsx              # App entry point
  App.jsx                # Composes all page sections
  index.css              # Tailwind directives + brand CSS variables
  data/
    furnitureData.js     # Categories, products, testimonials, FAQ, nav links
  components/
    icons.jsx            # Inline SVG icon set (no external icon library needed)
    Placeholder.jsx       # Line-art furniture placeholder artwork
    Navbar.jsx
    Hero.jsx
    CategorySection.jsx
    ProductCard.jsx
    FeaturedProducts.jsx
    AboutSection.jsx
    WhyChooseUs.jsx
    CollectionSection.jsx
    CustomFurniture.jsx
    Gallery.jsx
    BestSellers.jsx
    Testimonials.jsx
    FAQ.jsx
    CTA.jsx
    Contact.jsx
    Footer.jsx
```

## Notes

- All product imagery is a placeholder (soft gradient + line-art icon) — swap `<Placeholder kind="..." tint={n} />`
  for a real `<img>` once you have photography.
- Prices in `src/data/furnitureData.js` are in ₹ — edit freely to match your real catalog.
- The cart and search icons in the navbar are UI-only, as requested — no backend, login or payment logic is wired up.
- The WhatsApp button in the CTA section links to a placeholder number (`+91 99999 99999`) — update it in
  `src/components/CTA.jsx`.
- The map in the Contact section is a stylised placeholder grid — swap it for a real Google Maps embed if you have
  an API key.
