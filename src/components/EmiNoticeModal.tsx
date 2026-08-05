import React from 'react';
import { X, Percent, CheckCircle, ArrowRight, Shield } from 'lucide-react';

interface EmiNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const EmiNoticeModal: React.FC<EmiNoticeModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-red-600 text-white">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">EMI Rate Guidance</h3>
              <p className="text-xs text-slate-400">Amzad Consultancy Hub & Advisory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center text-sm">
              <Shield className="w-4 h-4 text-red-600 mr-2" />
              Custom EMI Rate Estimator
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our full interactive multi-loan EMI calculation engine is scheduled for deployment in the upcoming feature module.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Current Standard Monthly Rates Reference</span>
            
            <div className="space-y-2 text-xs font-semibold">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60">
                <span>₹5 Lakh Personal Loan @ 10.5% (3 Yrs)</span>
                <span className="text-red-600 dark:text-red-400 font-extrabold">~₹16,250 / month</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60">
                <span>₹50 Lakh Home Loan @ 8.50% (20 Yrs)</span>
                <span className="text-red-600 dark:text-red-400 font-extrabold">~₹43,391 / month</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60">
                <span>₹25 Lakh Business Loan @ 11.50% (5 Yrs)</span>
                <span className="text-red-600 dark:text-red-400 font-extrabold">~₹54,982 / month</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-full py-3.5 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-md text-sm flex items-center justify-center space-x-2"
            >
              <span>Speak to Advisor for Custom EMI Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
