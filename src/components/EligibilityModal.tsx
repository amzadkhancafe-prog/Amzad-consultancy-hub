import React, { useState } from 'react';
import { X, CheckCircle, Calculator, ArrowRight, ShieldCheck, IndianRupee } from 'lucide-react';
import { EligibilityFormData } from '../types';

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyForLoan: (loanDetails: string) => void;
}

export const EligibilityModal: React.FC<EligibilityModalProps> = ({ isOpen, onClose, onApplyForLoan }) => {
  const [formData, setFormData] = useState<EligibilityFormData>({
    employmentType: 'salaried',
    monthlyIncome: '50000',
    existingEmi: '5000',
    desiredLoanType: 'Personal Loan',
    creditScoreRange: '750+',
  });

  const [calculatedResult, setCalculatedResult] = useState<{
    eligibleAmount: number;
    estimatedEmi: number;
    approvalChance: string;
    suggestedTenureMonths: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const income = parseFloat(formData.monthlyIncome) || 0;
    const emi = parseFloat(formData.existingEmi) || 0;

    // Financial rule of thumb calculation (FOIR: ~50% of net income available for EMIs)
    const availableForNewEmi = Math.max(0, income * 0.5 - emi);
    const tenureMonths = formData.desiredLoanType === 'Home Loan' ? 240 : 60;
    const rateAnnual = formData.desiredLoanType === 'Home Loan' ? 0.085 : 0.115;
    const rateMonthly = rateAnnual / 12;

    // Loan capacity formula
    let maxLoan = 0;
    if (rateMonthly > 0 && availableForNewEmi > 0) {
      maxLoan = availableForNewEmi * ((Math.pow(1 + rateMonthly, tenureMonths) - 1) / (rateMonthly * Math.pow(1 + rateMonthly, tenureMonths)));
    }

    let chance = 'High (95%+)';
    if (formData.creditScoreRange === '650-700') chance = 'Moderate (75%)';
    if (formData.creditScoreRange === 'Below 650') chance = 'Special Advisor Review Needed';

    setCalculatedResult({
      eligibleAmount: Math.round(maxLoan / 5000) * 5000,
      estimatedEmi: Math.round(availableForNewEmi),
      approvalChance: chance,
      suggestedTenureMonths: tenureMonths,
    });
  };

  const handleApplyWithResult = () => {
    if (!calculatedResult) return;
    const details = `${formData.desiredLoanType} - Estimated Eligibility: ₹${calculatedResult.eligibleAmount.toLocaleString('en-IN')} (Monthly Income: ₹${Number(formData.monthlyIncome).toLocaleString('en-IN')})`;
    onApplyForLoan(details);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-red-600 text-white">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Check Loan Eligibility</h3>
              <p className="text-xs text-slate-400">Instant soft eligibility calculation - Zero credit score impact</p>
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
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Employment Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Employment Type
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="salaried">Salaried Employee</option>
                  <option value="self-employed">Self-Employed Professional</option>
                  <option value="business">Business Owner / MSME</option>
                </select>
              </div>

              {/* Loan Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Desired Loan Product
                </label>
                <select
                  value={formData.desiredLoanType}
                  onChange={(e) => setFormData({ ...formData, desiredLoanType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Home Loan">Home Loan</option>
                  <option value="Business Loan">Business Loan</option>
                  <option value="Property Loan">Loan Against Property</option>
                </select>
              </div>

              {/* Monthly Income */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Net Monthly Income (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="10000"
                    step="1000"
                    value={formData.monthlyIncome}
                    onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                    required
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="e.g. 50000"
                  />
                </div>
              </div>

              {/* Existing EMIs */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Existing Monthly EMIs (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={formData.existingEmi}
                    onChange={(e) => setFormData({ ...formData, existingEmi: e.target.value })}
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="e.g. 5000"
                  />
                </div>
              </div>

            </div>

            {/* Credit Score Band */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Estimated Credit Score
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['750+', '650-700', 'Below 650'].map((score) => (
                  <button
                    type="button"
                    key={score}
                    onClick={() => setFormData({ ...formData, creditScoreRange: score })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      formData.creditScoreRange === score
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-md shadow-red-600/20 text-sm flex items-center justify-center space-x-2"
            >
              <span>Calculate My Loan Eligibility</span>
              <Calculator className="w-4 h-4" />
            </button>
          </form>

          {/* Results Display Box */}
          {calculatedResult && (
            <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center space-x-2 text-red-700 dark:text-red-400 font-bold text-sm">
                <CheckCircle className="w-5 h-5 text-red-600" />
                <span>Eligibility Assessment Complete</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-red-100 dark:border-slate-700">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Estimated Loan Eligibility</span>
                  <span className="text-2xl font-black text-red-600 dark:text-red-400">
                    ₹{calculatedResult.eligibleAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-red-100 dark:border-slate-700">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Approval Probability</span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {calculatedResult.approvalChance}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Suggested Tenure: {calculatedResult.suggestedTenureMonths / 12} Years</span>
                <span>Max Safe Monthly EMI: ₹{calculatedResult.estimatedEmi.toLocaleString('en-IN')}</span>
              </div>

              <button
                onClick={handleApplyWithResult}
                className="w-full py-3 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white text-sm flex items-center justify-center space-x-2 shadow-md"
              >
                <span>Proceed to Claim Instant Loan Offer</span>
                <ArrowRight className="w-4 h-4 text-red-400" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
