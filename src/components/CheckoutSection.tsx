import React, { useState } from 'react';
import { Product } from '../types';
import { CheckCircle, User, Phone, MapPin } from 'lucide-react';

interface CheckoutSectionProps {
  product?: Product;
  selectedSize: string;
}

export const CheckoutSection: React.FC<CheckoutSectionProps> = ({
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, selectedSize }));
  }, [selectedSize]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '5bf831b4-1252-4f8d-8c73-36618dddcd97',
          subject: `Nouvelle Commande CHAGHAF - ${formData.fullName}`,
          from_name: 'Boutique CHAGHAF',
          Nom_Complet: formData.fullName,
          Téléphone: formData.phone,
          Ville: formData.city,
          Adresse: formData.address,
          Taille: formData.selectedSize,
          Article: 'T-Shirt Oversize "Chaghaf"',
          Prix: '170 MAD',
          Livraison: '35 MAD',
          Total_A_Payer: '205 MAD',
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ ...formData, fullName: '', phone: '', city: '', address: '' });
      } else {
        alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion. Vérifiez votre réseau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="checkout-section"
      className="w-full py-20 px-4 bg-[#0A0A0C] text-[#FFFFFF] border-t border-[#1C1C20] flex justify-center items-center"
    >
      <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center">
        {/* En-tête */}
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

        {/* Résumé des prix */}
        <div className="w-full mb-8 p-5 sm:p-6 rounded-2xl bg-[#121215] border border-[#27272a] shadow-2xl text-left space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
            <span className="text-sm font-medium text-[#EDF2F4]/80">Prix de l'article</span>
            <span className="font-mono text-base font-bold text-white">170 MAD</span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
            <span className="text-sm font-medium text-[#EDF2F4]/80">Livraison partout au Maroc</span>
            <span className="font-mono text-base font-bold text-[#EDF2F4]">35 MAD</span>
          </div>

          <div className="flex items-center justify-between pt-1 text-lg sm:text-xl font-heading font-black">
            <span className="text-white uppercase tracking-wider">Total à payer</span>
            <span className="text-[#FFFFFF] bg-white/10 px-3 py-1 rounded-lg border border-white/20">
              205 MAD
            </span>
          </div>
        </div>

        {/* Message de succès */}
        {isSubmitted && (
          <div className="w-full mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-sm flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Votre commande a été confirmée avec succès ! Nous vous contacterons bientôt.</span>
          </div>
        )}

        {/* Formulaire */}
        {!isSubmitted && (
          <form id="checkout-order-form" onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Nom */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-subheading font-bold uppercase tracking-[0.15em] text-[#EDF2F4]">
                Nom Complet <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EDF2F4]/40" />
                <input
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

            {/* Téléphone */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-subheading font-bold uppercase tracking-[0.15em] text-[#EDF2F4]">
                Numéro de Téléphone <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EDF2F4]/40" />
                <input
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
              <label className="block text-xs font-subheading font-bold uppercase tracking-[0.15em] text-[#EDF2F4]">
                Ville <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EDF2F4]/40" />
                <input
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

            {/* Adresse */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-subheading font-bold uppercase tracking-[0.15em] text-[#EDF2F4]">
                Adresse Complète (Quartier, N°, Rue) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Ex: N° 12, Rue Ibn Battouta, Quartier Maarif"
                className="w-full px-4 py-3.5 rounded-xl bg-[#141417] border border-[#27272a] text-white placeholder:text-[#EDF2F4]/30 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-sm transition-all"
              />
            </div>

            {/* Taille */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-subheading font-bold uppercase tracking-[0.15em] text-[#EDF2F4]">
                Taille Sélectionnée
              </label>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#141417] border border-[#27272a]">
                <span className="font-heading text-lg font-black text-white">
                  Taille {formData.selectedSize}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl bg-[#FFFFFF] text-[#000000] font-heading text-lg sm:text-xl font-black uppercase tracking-wider transition-all duration-200 shadow-xl border-2 border-white mt-6
                ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#EDF2F4] cursor-pointer hover:scale-[1.01] active:scale-[0.99]'}`}
            >
              {isLoading ? 'Envoi en cours...' : 'Confirmer la commande'}
            </button>
          </form>
        )}

        <p className="mt-6 text-sm font-heading font-medium tracking-widest text-center text-[#EDF2F4]/60 uppercase select-none">
          chaghaf for life
        </p>
      </div>
    </section>
  );
};