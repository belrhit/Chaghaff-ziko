import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

const SINGLE_PRODUCT = {
  title: 'T-Shirt Oversize "Chaghaf"',
  price: 170,
  shipping: 35,
  sizes: ['M', 'L'],
  specs: [
    '- Oversize Cropped',
    '- Le Tissu: Jerseyfix 100% Coton',
    '- 240 GSM',
    "- L'Impression: Sérigraphie",
  ],
  image: {
    src: '/images/tshirt-black.jpg',
    alt: 'T-Shirt Oversize Chaghaf Noir',
  },
};

interface ProductSectionProps {
  selectedSize?: string;
  onSelectSize?: (size: string) => void;
  onGoToOrder?: () => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  selectedSize: externalSelectedSize,
  onSelectSize,
  onGoToOrder,
}) => {
  const [internalSize, setInternalSize] = useState<string>(SINGLE_PRODUCT.sizes[0]);
  const activeSize = externalSelectedSize ?? internalSize;

  const [isHoverZoom, setIsHoverZoom] = useState<boolean>(false);
  const [zoomCoords, setZoomCoords] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const handleSizeChange = (size: string) => {
    setInternalSize(size);
    onSelectSize?.(size);
  };

  const handleOrderClick = () => {
    if (onGoToOrder) {
      onGoToOrder();
    } else {
      document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomCoords({ x, y });
  };

  const { image } = SINGLE_PRODUCT;

  return (
    <section
      id="product-section"
      className="w-full min-h-screen py-24 px-4 sm:px-6 bg-[#000000] text-[#FFFFFF] flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Conteneur Image Unique */}
        <div
          id="product-image-container"
          className="relative w-full aspect-[4/5] bg-[#0c0c0e] rounded-3xl overflow-hidden border border-[#27272a] shadow-2xl select-none group cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoverZoom(true)}
          onMouseLeave={() => setIsHoverZoom(false)}
        >
          {/* Image Principale */}
          <img
            src={image.src}
            alt={image.alt}
            className={`w-full h-full object-cover transition-opacity duration-200 ${isHoverZoom ? 'opacity-0' : 'opacity-100'
              }`}
          />

          {/* Effet Zoom au survol */}
          {isHoverZoom && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${image.src})`,
                backgroundPosition: `${zoomCoords.x}% ${zoomCoords.y}%`,
                backgroundSize: '220%',
                backgroundRepeat: 'no-repeat',
              }}
            />
          )}

          {/* Badge indicateur de zoom */}
          {!isHoverZoom && (
            <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-md bg-[#000000]/70 border border-white/20 text-[10px] font-mono uppercase tracking-widest text-[#EDF2F4] pointer-events-none flex items-center gap-1.5">
              <ZoomIn className="w-3 h-3 text-white" />
              <span>Survoler pour zoomer</span>
            </div>
          )}
        </div>

        {/* Détails du produit */}
        <div className="w-full mt-8 pt-6 border-t border-[#27272a] space-y-6">
          <div className="text-left space-y-2">
            <h3 className="font-heading text-2xl font-black uppercase text-white tracking-wider">
              {SINGLE_PRODUCT.title}
            </h3>
            <div className="font-mono text-sm sm:text-base text-[#EDF2F4] space-y-1.5">
              {SINGLE_PRODUCT.specs.map((spec, i) => (
                <p key={i}>{spec}</p>
              ))}
            </div>
          </div>

          {/* Choix des tailles */}
          <div className="text-left">
            <label className="block text-xs font-subheading font-bold uppercase tracking-[0.2em] text-[#EDF2F4] mb-2.5">
              Tailles disponibles :
            </label>
            <div className="grid grid-cols-2 gap-4">
              {SINGLE_PRODUCT.sizes.map((size) => {
                const isSelected = activeSize === size;
                return (
                  <button
                    key={size}
                    id={`size-btn-${size}`}
                    type="button"
                    onClick={() => handleSizeChange(size)}
                    className={`py-4 px-4 rounded-xl border-2 font-heading text-xl font-black tracking-widest uppercase transition-all duration-200 cursor-pointer ${isSelected
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

          {/* Prix et livraison */}
          <div className="p-5 rounded-2xl bg-[#0c0c0e] border border-[#27272a] flex items-center justify-between text-left">
            <div>
              <span className="text-xs font-mono text-[#EDF2F4]/70 uppercase tracking-wider block">
                Prix
              </span>
              <span className="font-heading text-3xl font-black text-[#FFFFFF]">
                {SINGLE_PRODUCT.price} <span className="text-base font-mono">MAD</span>
              </span>
            </div>

            <div className="text-right border-l border-[#27272a] pl-5">
              <span className="text-xs font-mono text-[#EDF2F4]/70 uppercase tracking-wider block">
                Livraison
              </span>
              <span className="font-heading text-xl font-bold text-[#FFFFFF]">
                +{SINGLE_PRODUCT.shipping} <span className="text-sm font-mono">MAD</span>
              </span>
            </div>
          </div>

          {/* Bouton de commande */}
          <button
            id="product-to-order-btn"
            type="button"
            onClick={handleOrderClick}
            className="w-full py-4 px-6 rounded-xl bg-[#FFFFFF] text-[#000000] hover:bg-[#EDF2F4] font-heading text-base font-black uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          >
            Commander en Taille {activeSize} →
          </button>
        </div>
      </div>
    </section>
  );
};