import React from 'react';
import { featureCardsData } from '../data/financeData';
import { Zap, Percent, Lock, Headphones, ShieldCheck, Sparkles } from 'lucide-react';

export const Features: React.FC = () => {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'Percent': return <Percent className="w-6 h-6 text-red-600 dark:text-red-400" />;
      case 'Lock': return <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'Headphones': return <Headphones className="w-6 h-6 text-red-600 dark:text-red-400" />;
      default: return <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section id="features" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Financial Leaders Trust Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Designed For Modern Financial Efficiency
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Experience seamless financial services powered by automated approvals, verified bank networks, and expert personal guidance.
          </p>
        </div>

        {/* Bento Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCardsData.map((feature) => (
            <div
              key={feature.id}
              className="bento-card p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0a0b0d] border border-slate-100 dark:border-[#262930] group-hover:scale-105 transition-transform">
                    {getFeatureIcon(feature.iconName)}
                  </div>
                  {feature.badge && (
                    <span className="bento-label px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#0a0b0d] border border-slate-200 dark:border-[#262930]">
                      {feature.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#262930] flex items-center text-xs font-bold text-red-600 dark:text-red-400">
                <span>Learn how it works</span>
                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

