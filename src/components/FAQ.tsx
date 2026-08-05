import React, { useState } from 'react';
import { faqData } from '../data/financeData';
import { ChevronDown, Search, Sparkles } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('f1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFaqs = faqData.filter((item) => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base">
            Find instant answers regarding loan interest rates, application processes, documentation, and insurance terms.
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search loan rates, eligibility, documents..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-[#15171c] border border-slate-200 dark:border-[#262930] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm font-medium shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'loans', label: 'Loans & EMI' },
              { id: 'insurance', label: 'Insurance' },
              { id: 'general', label: 'General & Fees' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                    : 'bg-white dark:bg-[#15171c] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#262930] hover:border-blue-500/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bento-card">
              <p className="text-slate-500 font-medium">No matching questions found for "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-3 text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bento-card overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 text-left font-bold text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    <div className={`p-1.5 rounded-full bg-slate-100 dark:bg-[#0a0b0d] border border-slate-200 dark:border-[#262930] transition-transform duration-200 ${isOpen ? 'rotate-180 bg-red-100 dark:bg-red-950 text-red-600' : ''}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-[#262930] pt-4 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};

