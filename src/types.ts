export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  label: string;
}

export interface Product {
  id: string;
  title: string;
  tagline: string;
  price: number;
  originalPrice: number;
  shippingCost: number;
  shippingLabel: string;
  currency: string;
  description: string;
  fabricSpecs: string[];
  sizes: string[];
  images: ProductImage[];
  inStock: boolean;
  stockCount: number;
}

export interface OrderFormData {
  fullName: string;      // Smia w Lknia
  phone: string;         // Telephone
  city: string;          // Lmdina
  address: string;       // Ladresse
  selectedSize: string;
  quantity: number;
}

export interface ConfirmedOrder {
  orderId: string;
  orderDate: string;
  customer: OrderFormData;
  product: {
    title: string;
    size: string;
    quantity: number;
    price: number;
    shipping: number;
    total: number;
  };
}
