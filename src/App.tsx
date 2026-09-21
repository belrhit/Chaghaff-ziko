import React, { useState } from 'react';
import { Header } from './components/Header';
import { AnnouncementBar } from './components/AnnouncementBar';
import { HeroSection } from './components/HeroSection';
import { ProductSection } from './components/ProductSection';
import { CheckoutSection } from './components/CheckoutSection';
import { Footer } from './components/Footer';
import { HelpModal } from './components/HelpModal';
import { CHAGHAF_PRODUCT } from './data/productData';

export default function App() {
  const [selectedSize, setSelectedSize] = useState<string>('M'); // Sizes: M - L
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col selection:bg-[#FFFFFF] selection:text-[#000000]">
      {/* Fixed Navbar at top with Home, Product, Aide */}
      <Header
        onNavigate={scrollToSection}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Animated Scrolling Announcement Bar (Marquee) just below fixed navigation bar */}
      <AnnouncementBar />

      {/* Main Flow: 3 Sections */}
      <main className="flex-1 flex flex-col">
        {/* Section 1: Landing / Hero Section (Extremely Minimal, 100vh, centered logo with <!-- PUT YOUR LOGO IMAGE URL HERE -->) */}
        <HeroSection onScrollDown={() => scrollToSection('product-section')} />

        {/* Section 2: Product Section (Slider Focus, Slide 1 main only, Slide 2 & 3 hover zoom, dashes specs, M-L buttons, 180 + 35 MAD) */}
        <ProductSection
          product={CHAGHAF_PRODUCT}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          onGoToOrder={() => scrollToSection('checkout-section')}
        />

        {/* Section 3: Checkout / Order Form (Linked to Email mailto:your-email@example.com, Prix 180 + 35 = 215 MAD) */}
        <CheckoutSection
          product={CHAGHAF_PRODUCT}
          selectedSize={selectedSize}
        />
      </main>

      {/* Minimal Streetwear Footer */}
      <Footer onOpenHelp={() => setIsHelpOpen(true)} />

      {/* Aide Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
