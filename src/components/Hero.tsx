import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Percent, Star, Award, TrendingUp, Sparkles, MessageCircle, Phone } from 'lucide-react';

interface HeroProps {
  onOpenEligibility: () => void;
  onOpenEmiNotice: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEligibility, onOpenEmiNotice }) => {
  return (
    <section id="home" className="relative pt-6 pb-14 md:pt-12 md:pb-20 overflow-hidden">
      {/* Background Bento Grid Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-red-500/10 dark:bg-red-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid Layout Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Hero Bento Card (Left - 7 cols) */}
          <div className="lg:col-span-7 bento-card p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            {/* Top Badge Pill */}
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Amzad Consultancy Hub & Advisory</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Empowering Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-blue-600">Financial Growth</span> Under Trusted Guidance
              </h1>

              {/* Subheading */}
              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                Led by <strong className="text-slate-900 dark:text-white font-bold">Md Amzad Khan</strong>. Tailored personal loans, low-ROI home loans, business capital, and financial advisory with instant bank approvals across 15+ partner lenders.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onOpenEligibility}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/30 hover:shadow-red-600/40 transition-all flex items-center justify-center space-x-2 text-sm sm:text-base transform hover:-translate-y-0.5"
              >
                <span>Check Eligibility</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="https://wa.me/918355882124?text=Hi%20Md%20Amzad%20Khan%2C%20I%20would%20like%20to%20inquire%20about%20a%20loan%20consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center justify-center space-x-2 text-sm sm:text-base shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp Now</span>
              </a>

              <a
                href="tel:+918355882124"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-slate-100 dark:bg-[#1a1d24] text-slate-900 dark:text-white border border-slate-200 dark:border-[#262930] hover:bg-slate-200 dark:hover:bg-[#20242d] transition-all flex items-center justify-center space-x-2 text-sm sm:text-base shadow-sm"
              >
                <Phone className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-[#262930]">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>✔ Secure</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>✔ Trusted Advisor</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>✔ Fast Approval</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>✔ No Hidden Charges</span>
              </div>
            </div>
          </div>

          {/* Right Bento Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Rates Bento Card */}
            <div className="bento-card p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#262930]">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-red-600/10 dark:bg-red-600/20 text-red-600 dark:text-red-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">Current Starting Rates</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Verified Bank Rate Index</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
                  Live Rates
                </span>
              </div>

              {/* Rate List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a0b0d] border border-slate-100 dark:border-[#262930] hover:border-blue-500/30 transition-colors">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">🏠 Home Loans</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Up to ₹2 Crore</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block">Lowest ROI</span>
                    <span className="text-base font-black text-red-600 dark:text-red-400">7.50% p.a.</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a0b0d] border border-slate-100 dark:border-[#262930] hover:border-blue-500/30 transition-colors">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">👤 Personal Loans</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Up to ₹40 Lakh</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block">Instant Disbursal</span>
                    <span className="text-base font-black text-red-600 dark:text-red-400">9.99% p.a.</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a0b0d] border border-slate-100 dark:border-[#262930] hover:border-blue-500/30 transition-colors">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">🏢 Business Loans</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Up to ₹5 Crore</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block">No Collateral</span>
                    <span className="text-base font-black text-red-600 dark:text-red-400">10.50% p.a.</span>
                  </div>
                </div>
              </div>

              {/* Rating Footer */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="ml-1 font-bold text-slate-900 dark:text-white">4.9 / 5.0</span>
                </div>
                <span className="text-slate-500 dark:text-slate-400 font-medium">(5000+ Happy Clients)</span>
              </div>
            </div>

            {/* Mini Bento Stats Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bento-card p-4 flex items-center space-x-3">
                <div className="p-2.5 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="bento-label block">Fast Approval</span>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white">&lt; 24 Hours</p>
                </div>
              </div>

              <div className="bento-card p-4 flex items-center space-x-3">
                <div className="p-2.5 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="bento-label block">Satisfaction</span>
                  <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400">98% Rating</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};


