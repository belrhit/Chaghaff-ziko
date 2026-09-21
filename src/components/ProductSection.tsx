import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Product } from '../types';

interface ProductSectionProps {
  product: Product;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  onGoToOrder: () => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  product,
  selectedSize,
  onSelectSize,
  onGoToOrder
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isHoverZoom, setIsHoverZoom] = useState<boolean>(false);
  const [zoomCoords, setZoomCoords] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      setCurrentSlide((prev) => (prev + 1) % product.images.length);
    } else if (diff < -45) {
      setCurrentSlide((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
    touchStartXRef.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Zoom-in effect applies to Slide 2 and Slide 3 (index 1 and 2)
    if (currentSlide === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomCoords({ x, y });
  };

  const currentImg = product.images[currentSlide];

  return (
    <section
      id="product-section"
      className="w-full min-h-screen py-24 px-4 sm:px-6 bg-[#000000] text-[#FFFFFF] flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Central Space: Slider / Carousel */}
        <div
          id="product-slider"
          className="relative w-full aspect-[4/5] bg-[#0c0c0e] rounded-3xl overflow-hidden border border-[#27272a] shadow-2xl select-none group"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            if (currentSlide > 0) setIsHoverZoom(true);
          }}
          onMouseLeave={() => setIsHoverZoom(false)}
        >
          {/* Main Display Image */}
          <img
            src={currentImg.src}
            alt={currentImg.alt}
            className={`w-full h-full object-cover transition-opacity duration-200 ${
              isHoverZoom && currentSlide > 0 ? 'opacity-0' : 'opacity-100'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Slide 2 & Slide 3: Zoom-in effect on hover / touch */}
          {currentSlide > 0 && isHoverZoom && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${currentImg.src})`,
                backgroundPosition: `${zoomCoords.x}% ${zoomCoords.y}%`,
                backgroundSize: '240%',
                backgroundRepeat: 'no-repeat'
              }}
            />
          )}

          {/* Slide 2 & 3 Zoom hint overlay */}
          {currentSlide > 0 && !isHoverZoom && (
            <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-md bg-[#000000]/70 border border-white/20 text-[10px] font-mono uppercase tracking-widest text-[#EDF2F4] pointer-events-none flex items-center gap-1.5">
              <ZoomIn className="w-3 h-3 text-white" />
              <span>Survoler pour zoomer</span>
            </div>
          )}

          {/* Carousel Arrows */}
          <button
            id="carousel-prev-btn"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + product.images.length) % product.images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-[#000000]/70 hover:bg-[#FFFFFF] text-white hover:text-black border border-[#27272a] transition cursor-pointer"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            id="carousel-next-btn"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % product.images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-[#000000]/70 hover:bg-[#FFFFFF] text-white hover:text-black border border-[#27272a] transition cursor-pointer"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide dots */}
          <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center items-center gap-2 pointer-events-none">
            {product.images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-6 bg-[#FFFFFF]' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Selector */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {product.images.map((img, idx) => (
            <button
              key={img.id}
              id={`thumb-btn-${idx}`}
              onClick={() => setCurrentSlide(idx)}
              className={`w-14 h-18 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                idx === currentSlide ? 'border-[#FFFFFF] scale-105' : 'border-[#27272a] opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>

        {/* Info Section (Visible cleanly below the slider) */}
        <div className="w-full mt-8 pt-6 border-t border-[#27272a] space-y-6">
          {/* T-shirt specs listed with simple dashes (NO checkmarks or bullet dots), exactly as requested: */}
          <div className="text-left space-y-2">
            <h3 className="font-heading text-2xl font-black uppercase text-white tracking-wider">
              {product.title}
            </h3>
            <div className="font-mono text-sm sm:text-base text-[#EDF2F4] space-y-1.5">
              <p>- Oversize Cropped</p>
              <p>- Le Tissu: Jerseyfix 100% Coton</p>
              <p>- 240 GSM</p>
              <p>- L'Impression: Sérigraphie</p>
            </div>
          </div>

          {/* Sizes available: M - L (styled as streetwear size buttons) */}
          <div className="text-left">
            <label className="block text-xs font-subheading font-bold uppercase tracking-[0.2em] text-[#EDF2F4] mb-2.5">
              Tailles disponibles :
            </label>
            <div className="grid grid-cols-2 gap-4">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    id={`size-btn-${size}`}
                    type="button"
                    onClick={() => onSelectSize(size)}
                    className={`py-4 px-4 rounded-xl border-2 font-heading text-xl font-black tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF] shadow-[0_4px_20px_rgba(255,255,255,0.25)] scale-[1.02]'
                        : 'bg-[#141417] text-[#FFFFFF] border-[#27272a] hover:border-[#EDF2F4]'
                    }`}
                  >
                    Taille {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price: 180 MAD. Delivery (Livraison): +35 MAD */}
          <div className="p-5 rounded-2xl bg-[#0c0c0e] border border-[#27272a] flex items-center justify-between text-left">
            <div>
              <span className="text-xs font-mono text-[#EDF2F4]/70 uppercase tracking-wider block">
                Prix
              </span>
              <span className="font-heading text-3xl font-black text-[#FFFFFF]">
                180 <span className="text-base font-mono">MAD</span>
              </span>
            </div>

            <div className="text-right border-l border-[#27272a] pl-5">
              <span className="text-xs font-mono text-[#EDF2F4]/70 uppercase tracking-wider block">
                Livraison
              </span>
              <span className="font-heading text-xl font-bold text-[#FFFFFF]">
                +35 <span className="text-sm font-mono">MAD</span>
              </span>
            </div>
          </div>

          {/* Button to jump smoothly to Section 3 Checkout */}
          <button
            id="product-to-order-btn"
            onClick={onGoToOrder}
            className="w-full py-4 px-6 rounded-xl bg-[#FFFFFF] text-[#000000] hover:bg-[#EDF2F4] font-heading text-base font-black uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          >
            Commander en Taille {selectedSize} →
          </button>
        </div>
      </div>
    </section>
  );
};
