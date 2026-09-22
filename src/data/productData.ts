import { Product } from '../types';
import tshirtBack from '../assets/images/chaghaf_tshirt_back_1789839327913.jpg';
import tshirtDetail from '../assets/images/chaghaf_tshirt_detail_1789839339078.jpg';

export const CHAGHAF_PRODUCT: Product = {
  id: 'chg-tshirt-01',
  title: 'CHAGHAF T-SHIRT',
  tagline: 'COLLECTION 01',
  price: 160, // 160 MAD
  originalPrice: 250,
  shippingCost: 35, // +35 MAD Livraison
  shippingLabel: 'Livraison (+35 MAD)',
  currency: 'MAD',
  description: 'CHAGHAF Streetwear T-Shirt.',
  fabricSpecs: [
    'Oversize Cropped',
    'Le Tissu: Jerseyfix 100% Coton',
    '240 GSM',
    "L'Impression: Sérigraphie"
  ],
  sizes: ['M', 'L'], // Sizes: M - L
  images: [
    {
      id: 'img-1',
      src: tshirtBack,
      alt: 'CHAGHAF T-Shirt - Back',
      label: '01'
    },
    {
      id: 'img-2',
      src: tshirtDetail,
      alt: 'CHAGHAF T-Shirt - Detail',
      label: '02'
    }
  ],
  inStock: true,
  stockCount: 15
};

export const BRAND_CONTACTS = {
  instagram: 'https://instagram.com/chaghaf.life',
  instagramHandle: '@chaghaf.life',
  email: 'your-email@example.com' // Configurable owner email
};
