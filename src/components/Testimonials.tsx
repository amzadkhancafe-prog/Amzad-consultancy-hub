import React from 'react';
import { testimonialsData } from '../data/financeData';
import { Star, Quote, CheckCircle2, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Real Stories From Satisfied Clients
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Discover how Amzad Consultancy Hub & Advisory helped individuals and businesses secure funding and lower interest rates.
          </p>
        </div>

        {/* Bento Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((t) => (
            <div
              key={t.id}
              className="bento-card p-6 md:p-8 flex flex-col justify-between group"
            >
              <div>
                {/* Quote Icon & Rating */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-500/20" />
                </div>

                {/* Content */}
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic mb-6">
                  "{t.content}"
                </p>
              </div>

              {/* User Bio Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-[#262930] flex items-center space-x-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-red-500/30"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{t.name}</h4>
                    {t.verified && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" title="Verified Customer" />}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{t.role} • {t.location}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60">
                    {t.serviceUsed}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

