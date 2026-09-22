import React from 'react';
import { ArrowDown } from 'lucide-react';
import heroLogo from '../assets/images/chaghaf_hero_logo_cropped.png';

interface HeroSectionProps {
  onScrollDown: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollDown }) => {
  return (
    <section
      id="hero-section"
      className="relative min-h-[calc(100vh-6.5rem)] sm:h-[calc(100vh-6.5rem)] w-full flex flex-col justify-between items-center px-4 bg-[#000000] text-[#FFFFFF] overflow-hidden select-none"
    >
      {/* Top spacing balancer */}
      <div className="pt-4 sm:pt-8" />

      {/* 
        ========================================================================
        LANDING / HERO SECTION: CENTER BRAND LOGO IMAGE
        Simple <img> tag so you can easily insert your exact logo image file.
        <!-- INSERT YOUR LOGO IMAGE FILE PATH OR URL IN THE `src` ATTRIBUTE BELOW -->
        ========================================================================
      */}
      <div className="flex-1 flex items-center justify-center my-auto w-full max-w-4xl px-4">
        <img
          id="hero-brand-logo-img"
          src={heroLogo}
          alt="CHAGHAF Logo"
          className="w-72 sm:w-88 md:w-[26rem] lg:w-[30rem] max-w-full mx-auto object-contain select-none transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Animated down arrow indicator at the bottom (text removed) */}
      <div className="pb-8 sm:pb-12 flex flex-col items-center">
        <button
          id="hero-scroll-indicator-btn"
          onClick={onScrollDown}
          className="group flex items-center justify-center p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-5 h-5 animate-bounce text-[#EDF2F4] group-hover:text-[#FFFFFF] transition-colors" />
        </button>
      </div>
    </section>
  );
};
