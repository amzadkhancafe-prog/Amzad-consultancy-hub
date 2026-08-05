import React from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 no-print">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918355882124?text=Hi%20Md%20Amzad%20Khan%2C%20I%20would%20like%20to%20inquire%20about%20a%20loan%20consultation"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200 group relative"
        aria-label="WhatsApp Now"
        title="WhatsApp Now (+91 8355882124)"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-bold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          WhatsApp Now
        </span>
      </a>

      {/* Call Button */}
      <a
        href="tel:+918355882124"
        className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200 group relative"
        aria-label="Call Now"
        title="Call Now (+91 8355882124)"
      >
        <Phone className="w-5 h-5" />
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-bold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          Call Now
        </span>
      </a>

      {/* Email Button */}
      <a
        href="mailto:amzadkhan369@gmail.com"
        className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200 group relative"
        aria-label="Email Us"
        title="Email amzadkhan369@gmail.com"
      >
        <Mail className="w-5 h-5" />
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-bold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          Email Us
        </span>
      </a>
    </div>
  );
};
