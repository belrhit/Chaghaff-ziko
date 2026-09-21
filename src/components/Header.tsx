import React, { useState, useEffect } from 'react';
import { HelpCircle, Instagram, Phone } from 'lucide-react';
import { BRAND_CONTACTS } from '../data/productData';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenHelp }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#000000]/90 backdrop-blur-md border-b border-[#27272a] py-3.5'
          : 'bg-gradient-to-b from-[#000000]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Name / Logo Left */}
        <button
          id="nav-logo-btn"
          onClick={() => onNavigate('hero-section')}
          className="font-brand text-2xl sm:text-3xl font-extrabold tracking-[0.18em] text-[#FFFFFF] hover:text-[#EDF2F4] transition-colors cursor-pointer focus:outline-none uppercase"
          aria-label="CHAGHAF Home"
        >
          CHAGHAF
        </button>

        {/* Navigation Links: "Home", "Product", "Aide" */}
        <nav className="flex items-center gap-6 sm:gap-10 text-xs sm:text-sm font-subheading font-bold uppercase tracking-[0.2em] text-[#EDF2F4]">
          <button
            id="nav-home-btn"
            onClick={() => onNavigate('hero-section')}
            className="hover:text-[#FFFFFF] transition-colors cursor-pointer relative py-1 hover:underline underline-offset-8"
          >
            Home
          </button>

          <button
            id="nav-product-btn"
            onClick={() => onNavigate('product-section')}
            className="hover:text-[#FFFFFF] transition-colors cursor-pointer relative py-1 hover:underline underline-offset-8"
          >
            Product
          </button>

          <button
            id="nav-aide-btn"
            onClick={onOpenHelp}
            className="hover:text-[#FFFFFF] transition-colors cursor-pointer relative py-1 text-[#FFFFFF] flex items-center gap-1.5"
          >
            <span>Aide</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
