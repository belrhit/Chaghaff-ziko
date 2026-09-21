import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductImage } from '../types';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ProductImage[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onSelectIndex
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1.75);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  if (!isOpen) return null;

  const currentImg = images[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.75 : prev === 1.75 ? 2.5 : 1));
  };

  return (
    <div
      id="image-zoom-overlay"
      className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Controls Bar */}
      <div
        className="flex items-center justify-between z-20 text-[#FFFFFF]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="font-brand text-xl font-bold tracking-widest text-[#FFFFFF]">
            CHAGHAF
          </span>
          <span className="text-[#EDF2F4]/40">•</span>
          <span className="text-xs font-mono uppercase tracking-wider text-[#EDF2F4]">
            {currentImg.label} ({currentIndex + 1}/{images.length})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="zoom-level-toggle-btn"
            onClick={toggleZoom}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141417] hover:bg-[#EDF2F4] text-xs font-mono text-[#EDF2F4] hover:text-[#000000] border border-[#27272a] transition cursor-pointer"
            title="Toggle zoom multiplier"
          >
            {zoomLevel > 1 ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
            <span>{zoomLevel}x</span>
          </button>

          <button
            id="zoom-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#141417] hover:bg-[#EDF2F4] text-[#FFFFFF] hover:text-[#000000] border border-[#27272a] transition cursor-pointer"
            aria-label="Close zoom preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative flex-1 w-full max-w-5xl mx-auto my-2 flex items-center justify-center overflow-hidden cursor-crosshair rounded-2xl bg-[#09090b] border border-[#222228]"
        onClick={(e) => {
          e.stopPropagation();
          toggleZoom();
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Previous Button */}
        <button
          id="zoom-prev-btn"
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-20 p-3 rounded-xl bg-[#000000]/80 hover:bg-[#FFFFFF] text-white hover:text-black border border-[#27272a] shadow-2xl transition cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Zoomed Image */}
        <div className="w-full h-full flex items-center justify-center select-none overflow-hidden p-2">
          <img
            src={currentImg.src}
            alt={currentImg.alt}
            className="max-w-full max-h-[75vh] object-contain transition-transform duration-150 ease-out will-change-transform rounded-lg"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: `${position.x}% ${position.y}%`
            }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Next Button */}
        <button
          id="zoom-next-btn"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-20 p-3 rounded-xl bg-[#000000]/80 hover:bg-[#FFFFFF] text-white hover:text-black border border-[#27272a] shadow-2xl transition cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div
        className="flex items-center justify-center gap-3 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, idx) => (
          <button
            key={img.id}
            id={`zoom-thumb-${idx}`}
            onClick={() => onSelectIndex(idx)}
            className={`relative w-14 h-18 sm:w-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
              idx === currentIndex
                ? 'border-[#FFFFFF] scale-105 shadow-lg shadow-white/10'
                : 'border-[#27272a] opacity-50 hover:opacity-100'
            }`}
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
