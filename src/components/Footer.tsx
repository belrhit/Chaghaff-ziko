import React from 'react';
import { Instagram, HelpCircle } from 'lucide-react';
import { BRAND_CONTACTS } from '../data/productData';

interface FooterProps {
  onOpenHelp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHelp }) => {
  return (
    <footer className="w-full bg-[#000000] border-t border-[#27272a] py-10 text-[#EDF2F4]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <span className="font-brand text-2xl font-black tracking-widest text-[#FFFFFF] uppercase">
            CHAGHAF
          </span>
          <p className="text-xs font-mono text-[#EDF2F4]/60 mt-1">
            Urban Streetwear. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#EDF2F4] hover:text-white transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Aide</span>
          </button>

          <a
            href={BRAND_CONTACTS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#EDF2F4] hover:text-white transition cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>{BRAND_CONTACTS.instagramHandle}</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
