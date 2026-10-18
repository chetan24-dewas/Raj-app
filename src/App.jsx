import { useEffect } from "react";
import WelcomePopup from './components/WelcomePopup.jsx';


import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import Hero from "./components/Hero.jsx";

import CategorySection from "./components/CategorySection.jsx";

import FeaturedProducts from "./components/FeaturedProducts.jsx";

import AboutSection from "./components/AboutSection.jsx";

import WhyChooseUs from "./components/WhyChooseUs.jsx";

import CollectionSection from "./components/CollectionSection.jsx";

import CustomFurniture from "./components/CustomFurniture.jsx";

import Gallery from "./components/Gallery.jsx";

import BestSellers from "./components/BestSellers.jsx";

import Testimonials from "./components/Testimonials.jsx";

import FAQ from "./components/FAQ.jsx";

import CTA from "./components/CTA.jsx";

import Contact from "./components/Contact.jsx";

import Footer from "./components/Footer.jsx";

import GalleryPage from "./components/GalleryPage.jsx";

import Loader from "./components/Loader.jsx";

// Resets scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Original home page
function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <AboutSection />
      <WhyChooseUs />
      <CollectionSection />
      <CustomFurniture />
      <Gallery />
      {/* <BestSellers /> */}
      <Testimonials />
      <FAQ />
      <CTA />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <div>
      <Loader />
      <ScrollToTop />
      <Navbar />
      <WelcomePopup />

      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      </Routes>

      <Footer />
    </div>
  );
}