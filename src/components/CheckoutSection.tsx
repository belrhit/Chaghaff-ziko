import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, CheckCircle, Send, User, Phone, MapPin } from 'lucide-react';

interface CheckoutSectionProps {
  product: Product;
  selectedSize: string;
}

export const CheckoutSection: React.FC<CheckoutSectionProps> = ({
  product,
  selectedSize,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    selectedSize: selectedSize || 'M',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Sync selectedSize from prop if it changes
  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, selectedSize }));
  }, [selectedSize]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    // Generate email body and open mail client
    e.preventDefault();

    const subject = encodeURIComponent(`Nouvelle Commande CHAGHAF - ${formData.fullName}`);
    const body = encodeURIComponent(
      `DÉTAILS DE LA COMMANDE CHAGHAF:\n\n` +
      `• Nom Complet: ${formData.fullName}\n` +
      `• Numéro de Téléphone: ${formData.phone}\n` +
      `• Ville: ${formData.city}\n` +
      `• Adresse Complète: ${formData.address}\n` +
      `• Taille Choisie: ${formData.selectedSize}\n\n` +
      `RÉSUMÉ DU TARIF:\n` +
      `• Prix Produit: 170 MAD\n` +
      `• Frais de Livraison: 35 MAD\n` +
      `• TOTAL À PAYER À LA LIVRAISON: 205 MAD\n\n` +
      `Date: ${new Date().toLocaleDateString('fr-FR')}`
    );

    // Trigger user mail client
    window.location.href = `mailto:chaghafforlife@gmail.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  return (
    <section
      id="checkout-section"
      className="w-full py-20 px-4 bg-[#0A0A0C] text-[#FFFFFF] border-t border-[#1C1C20] flex justify-center items-center"
    >
      <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Section Heading */}
        <div className="mb-10 space-y-2">
          <span className="text-xs font-mono tracking-[0.2em] text-[#EDF2F4]/60 uppercase">
            Paiement Cash à la Livraison
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            Commander Maintenant
          </h2>
          <p className="text-sm text-[#EDF2F4]/70 max-w-md mx-auto">
            Remplissez vos informations pour finaliser votre commande. Aucun paiement en ligne requis, réglez en espèces à la livraison.
          </p>
        </div>

        {/* Pricing Summary Box (Prominent Breakdown: 180 MAD + 35 MAD = 215 MAD) */}
        <div className="w-full mb-8 p-5 sm:p-6 rounded-2xl bg-[#121215] border border-[#27272a] shadow-2xl text-left space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
            <span className="text-sm font-medium text-[#EDF2F4]/80">Prix de l'article</span>
            <span className="font-mono text-base font-bold text-white">180 MAD</span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
            <span className="text-sm font-medium text-[#EDF2F4]/80">Livraison partout au Maroc</span>
            <span className="font-mono text-base font-bold text-[#EDF2F4]">35 MAD</span>
          </div>

          <div className="flex items-center justify-between pt-1 text-lg sm:text-xl font-heading font-black">
            <span className="text-white uppercase tracking-wider">Total à payer</span>
            <span className="text-[#FFFFFF] bg-white/10 px-3 py-1 rounded-lg border border-white/20">
              215 MAD
            </span>
          </div>
        </div>

        {/* Success message banner if user submitted */}
        {isSubmitted && (
          <div className="w-full mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-sm flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Votre client de messagerie s'est ouvert pour envoyer votre commande !</span>
          </div>
        )}

        {/* Order Form connected to Email (mailto:chaghafforlife@gmail.com) */}
        <form
          id="checkout-order-form"
          onSubmit={handleSubmit}
          className="w-full space-y-4"
        >
          {/* Nom Complet */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="fullName"
              className="block text-xs font-subheading font-bold uppercase tracking-[0.15em] text-[#EDF2F4]"
            >
              Nom Complet <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EDF2F4]/40" />
              <input
                id="checkout-input-fullname"
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ex: Amine Benali"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#141417] border border-[#27272a] text-white placeholder:text-[#EDF2F4]/30 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-sm transition-all"
              />
            </div>
          </div>

          {/* Numéro de Téléphone */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="phone"
              className="block text-xs font-subheading font-bold uppercase tracking-[0.15em] text-[#EDF2F4]"
            >
              Numéro de Téléphone <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EDF2F4]/40" />
              <input
                id="checkout-input-phone"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex: 06 12 34 56 78"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#141417] border border-[#27272a] text-white placeholder:text-[#EDF2F4]/30 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-sm transition-all"
              />
            </div>
          </div>

          {/* Ville */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="city"
              className="block text-xs font-subheading font-bold uppercase tracking-[0.15em] text-[#EDF2F4]"
            >
              Ville <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EDF2F4]/40" />
              <input
                id="checkout-input-city"
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="Ex: Casablanca, Rabat, Marrakech..."
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#141417] border border-[#27272a] text-white placeholder:text-[#EDF2F4]/30 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-sm transition-all"
              />
            </div>
          </div>

          {/* Adresse Complète */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="address"
              className="block text-xs font-subheading font-bold uppercase tracking-[0.15em] text-[#EDF2F4]"
            >
              Adresse Complète (Quartier, N°, Rue) <span className="text-red-400">*</span>
            </label>
            <input
              id="checkout-input-address"
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Ex: N° 12, Rue Ibn Battouta, Quartier Maarif"
              className="w-full px-4 py-3.5 rounded-xl bg-[#141417] border border-[#27272a] text-white placeholder:text-[#EDF2F4]/30 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-sm transition-all"
            />
          </div>

          {/* Selected Size (automatically pulled from the product section) */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-subheading font-bold uppercase tracking-[0.15em] text-[#EDF2F4]">
              Taille Sélectionnée
            </label>
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#141417] border border-[#27272a]">
              <span className="font-heading text-lg font-black text-white">
                Taille {formData.selectedSize}
              </span>
              <span className="text-xs font-mono text-[#EDF2F4]/60">
                (Sélectionnée dans la fiche produit)
              </span>
            </div>
            {/* Hidden input for mailto submission */}
            <input
              type="hidden"
              id="hidden-selected-size"
              name="Taille_selectionnee"
              value={formData.selectedSize}
            />
          </div>

          {/* Additional details sent with email */}
          <input type="hidden" name="Article" value="CHAGHAF Streetwear T-Shirt (Oversize Cropped, 240 GSM)" />
          <input type="hidden" name="Prix" value="180 MAD" />
          <input type="hidden" name="Livraison" value="35 MAD" />
          <input type="hidden" name="Total_A_Payer" value="215 MAD" />

          {/* Submit Button: "Confirmer la commande" (Bold, blocky, and prominent) */}
          <button
            id="checkout-submit-btn"
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-[#FFFFFF] text-[#000000] hover:bg-[#EDF2F4] font-heading text-lg sm:text-xl font-black uppercase tracking-wider transition-all duration-200 shadow-xl cursor-pointer hover:scale-[1.01] active:scale-[0.99] mt-6 border-2 border-white"
          >
            Confirmer la commande
          </button>
        </form>

        {/* Centered brand text below button */}
        <p id="checkout-brand-tagline" className="mt-6 text-sm font-heading font-medium tracking-widest text-center text-[#EDF2F4]/60 uppercase select-none">
          chaghaf for life
        </p>
      </div>
    </section>
  );
};
