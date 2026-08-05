import React from 'react';
import { statsData } from '../data/financeData';
import { Check, X, Award, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const comparisonItems = [
    {
      feature: 'Loan Approval Speed',
      amzad: 'Instant digital pre-approval in 3 mins',
      traditional: '7-14 business days waiting period',
    },
    {
      feature: 'Documentation Hassle',
      amzad: '100% paperless digital upload & doorstep assistance',
      traditional: 'Physical visits & multi-folder paperwork',
    },
    {
      feature: 'Interest Rate Match',
      amzad: 'Scans 15+ top banks & NBFCs for lowest available ROI',
      traditional: 'Limited strictly to single bank standard rates',
    },
    {
      feature: 'Hidden Fees Policy',
      amzad: 'Zero hidden charges, full upfront transparency',
      traditional: 'Undisclosed administrative or closing fees',
    },
    {
      feature: 'Dedicated Advisor',
      amzad: '1-on-1 personal financial advisor assigned for free',
      traditional: 'Generic customer service queue',
    },
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 relative bg-slate-900/40 dark:bg-[#0a0b0d] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Amzad Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Why Thousands Choose <span className="text-red-600 dark:text-red-500">Amzad Consultancy</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            We bridge borrowers and premier financial institutions with speed, integrity, and unrivaled interest rate savings.
          </p>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="bento-card p-6 text-center group"
            >
              <span className="bento-label block mb-1">Impact Metric</span>
              <div className="text-3xl sm:text-4xl font-black text-red-600 dark:text-red-400 mb-2 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">{stat.label}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Bento Comparison Matrix Table */}
        <div className="bento-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-[#262930]">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">How We Compare With Traditional Banks</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Clear comparison of processing efficiency and benefits</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white">
              Amzad Consultancy Guarantee
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-[#262930] text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold bento-label">Key Financial Parameters</th>
                  <th className="py-3 px-4 font-bold text-red-600 dark:text-red-400 bg-red-500/10 dark:bg-red-950/40 rounded-t-lg">Amzad Consultancy Hub</th>
                  <th className="py-3 px-4 font-bold bento-label">Traditional Bank Process</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#262930]">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#0a0b0d]/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-slate-200">{item.feature}</td>
                    <td className="py-4 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-red-500/5 dark:bg-red-950/20">
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{item.amzad}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{item.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

