import React from 'react';

export const AnnouncementBar: React.FC = () => {
  const items = [
    'NEW DROP AVAILABLE NOW',
    'LIVRAISON PARTOUT AU MAROC',
    'STREETWEAR'
  ];

  return (
    <div id="announcement-marquee-container" className="w-full pt-20 bg-black z-30">
      <div
        id="announcement-marquee-banner"
        className="w-full bg-brand-gray text-brand-black border-b border-black overflow-hidden py-2"
      >
        <div className="flex whitespace-nowrap animate-marquee select-none">
          {/* Loop 1 */}
          <div className="flex items-center shrink-0 uppercase text-xs font-bold tracking-widest font-heading">
            {items.map((text, idx) => (
              <React.Fragment key={`set1-${idx}`}>
                <span className="px-6">{text}</span>
                <span className="text-sm select-none">•</span>
              </React.Fragment>
            ))}
          </div>

          {/* Loop 2 for seamless infinite scrolling */}
          <div className="flex items-center shrink-0 uppercase text-xs font-bold tracking-widest font-heading" aria-hidden="true">
            {items.map((text, idx) => (
              <React.Fragment key={`set2-${idx}`}>
                <span className="px-6">{text}</span>
                <span className="text-sm select-none">•</span>
              </React.Fragment>
            ))}
          </div>

          {/* Loop 3 */}
          <div className="flex items-center shrink-0 uppercase text-xs font-bold tracking-widest font-heading" aria-hidden="true">
            {items.map((text, idx) => (
              <React.Fragment key={`set3-${idx}`}>
                <span className="px-6">{text}</span>
                <span className="text-sm select-none">•</span>
              </React.Fragment>
            ))}
          </div>

          {/* Loop 4 for ultra-wide screen coverage */}
          <div className="flex items-center shrink-0 uppercase text-xs font-bold tracking-widest font-heading" aria-hidden="true">
            {items.map((text, idx) => (
              <React.Fragment key={`set4-${idx}`}>
                <span className="px-6">{text}</span>
                <span className="text-sm select-none">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
