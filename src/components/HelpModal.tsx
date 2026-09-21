import React from 'react';
import { X, Instagram } from 'lucide-react';
import { BRAND_CONTACTS } from '../data/productData';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="help-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#000000]/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="help-modal-card"
        className="w-full max-w-md bg-[#000000] border-2 border-[#FFFFFF] rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.95)] text-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="help-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#141417] hover:bg-[#FFFFFF] text-white hover:text-black transition cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <h3 className="font-heading text-3xl font-black tracking-wider uppercase text-white mb-4">
          Aide
        </h3>

        {/* Exact message requested by the user */}
        <p className="text-sm sm:text-base text-[#EDF2F4] leading-relaxed mb-6 font-normal">
          Si vous rencontrez un problème, envoyez-nous un message sur notre Instagram.
        </p>

        {/* Direct Clickable Link/Button to @chaghaf.life */}
        <a
          id="modal-instagram-btn"
          href={BRAND_CONTACTS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between p-4 rounded-xl bg-[#141417] hover:bg-[#FFFFFF] text-white hover:text-black border border-[#27272a] transition duration-200 font-subheading font-bold text-xs sm:text-sm uppercase tracking-wider group"
        >
          <span className="flex items-center gap-3">
            <Instagram className="w-5 h-5 text-pink-400 group-hover:text-black transition-colors" />
            <span>{BRAND_CONTACTS.instagramHandle}</span>
          </span>
          <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  );
};
