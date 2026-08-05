import React, { useState } from 'react';
import { Shield, Send, CheckCircle2, Phone, Mail, MapPin, User } from 'lucide-react';
import { LegalModalType } from './LegalModals';

interface FooterProps {
  onOpenLegalModal?: (type: LegalModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleLegalClick = (type: LegalModalType) => {
    if (onOpenLegalModal) {
      onOpenLegalModal(type);
    }
  };

  return (
    <footer className="bg-[#0a0b0d] text-slate-400 border-t border-[#262930] text-sm">
      
      {/* Top CTA Newsletter Bar */}
      <div className="border-b border-[#262930] bg-[#15171c]/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Subscribe to Financial Insights & Rate Alerts</h3>
            <p className="text-xs text-slate-400">Receive weekly updates on interest rate changes, loan offers, and financial advice from Md Amzad Khan.</p>
          </div>

          {subscribed ? (
            <div className="flex items-center space-x-2 text-emerald-400 text-sm font-bold bg-emerald-950/60 px-5 py-3 rounded-xl border border-emerald-800">
              <CheckCircle2 className="w-5 h-5" />
              <span>Thank you! You are now subscribed to rate alerts.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex w-full md:w-auto items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="px-4 py-3 rounded-xl bg-[#0a0b0d] border border-[#262930] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 w-full md:w-72"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white text-sm flex items-center space-x-1 flex-shrink-0 transition-colors"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center text-white shadow-md">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
                  AMZAD <span className="text-red-500 ml-1.5 font-bold">CONSULTANCY</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                  HUB & ADVISORY
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Amzad Consultancy Hub & Advisory is a premier financial technology and consultancy firm led by <strong className="text-white">Md Amzad Khan</strong>, helping personal borrowers, homebuyers, and business owners secure the lowest interest rate loans with zero hidden fees.
            </p>

            <div className="pt-2 text-xs space-y-1.5 text-slate-300">
              <p className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-red-500" /> <strong className="text-white">Founder & Principal Advisor:</strong> Md Amzad Khan</p>
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-red-500" /> <a href="tel:+918355882124" className="hover:text-red-400 font-semibold text-white">+91 8355882124</a></p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-red-500" /> <a href="mailto:amzadkhan369@gmail.com" className="hover:text-red-400 text-white">amzadkhan369@gmail.com</a></p>
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-red-500" /> <span className="text-white">Imampur, Bhagalpur, Bihar, India</span></p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="bento-label mb-4 border-b border-[#262930] pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#home" className="hover:text-red-400 transition-colors">Home Page</a></li>
              <li><a href="#services" className="hover:text-red-400 transition-colors">Financial Services</a></li>
              <li><a href="#tools" className="hover:text-red-400 transition-colors">Calculators & Tools</a></li>
              <li><button onClick={() => handleLegalClick('about')} className="hover:text-red-400 transition-colors text-left">About Us</button></li>
              <li><a href="#why-us" className="hover:text-red-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#testimonials" className="hover:text-red-400 transition-colors">Client Reviews</a></li>
              <li><a href="#faq" className="hover:text-red-400 transition-colors">FAQ & Support</a></li>
              <li><a href="#contact" className="hover:text-red-400 transition-colors">Contact Advisor</a></li>
            </ul>
          </div>

          {/* Loan & Advisory Services */}
          <div>
            <h4 className="bento-label mb-4 border-b border-[#262930] pb-2">
              Financial Products
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#services" className="hover:text-red-400 transition-colors">Personal Loans (@ 9.99%)</a></li>
              <li><a href="#services" className="hover:text-red-400 transition-colors">Home Loans (@ 7.50%)</a></li>
              <li><a href="#services" className="hover:text-red-400 transition-colors">Business Loans (@ 10.50%)</a></li>
              <li><a href="#services" className="hover:text-red-400 transition-colors">Health & Medical Insurance</a></li>
              <li><a href="#services" className="hover:text-red-400 transition-colors">Term Life Insurance</a></li>
              <li><a href="#services" className="hover:text-red-400 transition-colors">Property Advisory</a></li>
              <li><a href="#services" className="hover:text-red-400 transition-colors">Wealth Management</a></li>
            </ul>
          </div>

          {/* Legal Disclaimers */}
          <div>
            <h4 className="bento-label mb-4 border-b border-[#262930] pb-2">
              Compliance & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><button onClick={() => handleLegalClick('privacy')} className="hover:text-slate-200 transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => handleLegalClick('terms')} className="hover:text-slate-200 transition-colors text-left">Terms & Conditions</button></li>
              <li><button onClick={() => handleLegalClick('disclaimer')} className="hover:text-slate-200 transition-colors text-left">Interest Rate Disclosures</button></li>
              <li><button onClick={() => handleLegalClick('disclaimer')} className="hover:text-slate-200 transition-colors text-left">Security Standards</button></li>
              <li><button onClick={() => handleLegalClick('about')} className="hover:text-slate-200 transition-colors text-left">Regulatory License Info</button></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Note */}
        <div className="mt-12 pt-6 border-t border-[#262930] text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            *Disclaimer: Amzad Consultancy Hub & Advisory acts as a premier financial consultancy and corporate agent partnering with 15+ RBI-regulated banks and NBFCs across India. All loan approvals, final interest rates, and loan terms are subject to applicant eligibility, documentation verification, and lender credit assessment policies.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 border-t border-[#262930] pt-6">
          <p>© {new Date().getFullYear()} Amzad Consultancy Hub & Advisory. All rights reserved. Founded by Md Amzad Khan.</p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <button onClick={() => handleLegalClick('privacy')} className="hover:text-slate-400">Privacy</button>
            <span>•</span>
            <button onClick={() => handleLegalClick('terms')} className="hover:text-slate-400">Terms</button>
            <span>•</span>
            <button onClick={() => handleLegalClick('disclaimer')} className="hover:text-slate-400">Disclaimer</button>
          </div>
        </div>

      </div>
    </footer>
  );
};


