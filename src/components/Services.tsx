import React, { useState } from 'react';
import { servicesData } from '../data/financeData';
import { ServiceItem } from '../types';
import { 
  UserCheck, Home, Briefcase, ShieldCheck, HeartPulse, Building2, TrendingUp,
  Check, ArrowUpRight, Sparkles
} from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'loan' | 'insurance' | 'property' | 'wealth'>('all');

  const filteredServices = activeCategory === 'all'
    ? servicesData
    : servicesData.filter((s) => s.category === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck className="w-6 h-6" />;
      case 'Home': return <Home className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Financial Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Financial Solutions
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Explore our range of competitive loan offerings, protective insurance coverage, and wealth management portfolios.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'loan', label: 'Loans & Capital' },
            { id: 'insurance', label: 'Insurance Advisory' },
            { id: 'property', label: 'Property Solutions' },
            { id: 'wealth', label: 'Wealth Management' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                activeCategory === tab.id
                  ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20'
                  : 'bg-white dark:bg-[#15171c] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#262930] hover:border-blue-500/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bento Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="bento-card p-6 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  {service.popular && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-100 dark:bg-red-950/90 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60">
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Highlights Bar */}
                {service.rate && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0a0b0d] border border-slate-100 dark:border-[#262930] mb-4 flex justify-between items-center text-xs">
                    <div>
                      <span className="bento-label block">Interest / Pricing</span>
                      <span className="font-extrabold text-red-600 dark:text-red-400 text-sm">{service.rate}</span>
                    </div>
                    {service.maxAmount && (
                      <div className="text-right">
                        <span className="bento-label block">Limit</span>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{service.maxAmount}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Feature checklist */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Button */}
              <button
                onClick={() => onSelectService(service.title)}
                className="w-full py-3 rounded-xl text-xs font-bold bg-slate-900 dark:bg-[#0a0b0d] hover:bg-red-600 dark:hover:bg-red-600 text-white transition-all flex items-center justify-center space-x-2 group/btn border border-slate-800 dark:border-[#262930]"
              >
                <span>Inquire For {service.title}</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

