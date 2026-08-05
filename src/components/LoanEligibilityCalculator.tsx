import React, { useState, useMemo } from 'react';
import {
  IndianRupee,
  UserCheck,
  Briefcase,
  Calendar,
  Percent,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Printer,
  Download,
  Sparkles,
  ShieldCheck,
  Info,
  ArrowRight,
  Sliders,
  Award,
  HelpCircle
} from 'lucide-react';

export const LoanEligibilityCalculator: React.FC<{ onApplyForLoan?: (details: string) => void }> = ({ onApplyForLoan }) => {
  // Input states
  const [monthlyIncome, setMonthlyIncome] = useState<number>(75000);
  const [existingEmi, setExistingEmi] = useState<number>(10000);
  const [employmentType, setEmploymentType] = useState<'salaried' | 'self-employed'>('salaried');
  const [age, setAge] = useState<number>(30);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);

  // Reset to default
  const handleReset = () => {
    setMonthlyIncome(75000);
    setExistingEmi(10000);
    setEmploymentType('salaried');
    setAge(30);
    setTenureYears(20);
    setInterestRate(8.5);
  };

  // Indian currency formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Math.round(val));
  };

  // Format large Indian values in words (Lakh / Crore)
  const formatIndianWords = (amount: number) => {
    if (amount >= 10000000) {
      const cr = amount / 10000000;
      return `₹${cr.toFixed(2)} Crore`;
    }
    if (amount >= 100000) {
      const lakh = amount / 100000;
      return `₹${lakh.toFixed(2)} Lakh`;
    }
    return formatCurrency(amount);
  };

  // Calculation logic
  const calculations = useMemo(() => {
    // Retirement age limits
    const maxRetirementAge = employmentType === 'salaried' ? 60 : 65;
    const maxAllowedTenure = Math.max(0, Math.min(tenureYears, maxRetirementAge - age));

    // FOIR (Fixed Obligation to Income Ratio) determination
    let foirRatio = 0.50; // default 50%
    if (monthlyIncome < 30000) {
      foirRatio = 0.40;
    } else if (monthlyIncome <= 75000) {
      foirRatio = 0.50;
    } else if (monthlyIncome <= 150000) {
      foirRatio = 0.55;
    } else {
      foirRatio = 0.60;
    }

    if (employmentType === 'self-employed') {
      foirRatio *= 0.95; // Slightly stricter for self-employed variable cashflow
    }

    // Maximum total monthly EMI capacity
    const maxTotalEmiCapacity = monthlyIncome * foirRatio;
    
    // Net available EMI for new loan
    const availableMonthlyEmi = Math.max(0, maxTotalEmiCapacity - existingEmi);

    // Calculate maximum loan eligibility
    let maxEligibleLoan = 0;
    if (availableMonthlyEmi > 0 && maxAllowedTenure > 0 && interestRate > 0) {
      const r = interestRate / 12 / 100;
      const n = maxAllowedTenure * 12;
      
      // Present Value formula: Loan = EMI * [( (1+r)^n - 1 ) / ( r * (1+r)^n )]
      const pvFactor = (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
      maxEligibleLoan = availableMonthlyEmi * pvFactor;
    }

    // Rounding to clean thousands
    maxEligibleLoan = Math.round(maxEligibleLoan / 10000) * 10000;

    // FOIR Utilization %
    const existingEmiPercent = monthlyIncome > 0 ? (existingEmi / monthlyIncome) * 100 : 0;
    const newEmiPercent = monthlyIncome > 0 ? (availableMonthlyEmi / monthlyIncome) * 100 : 0;
    const totalFoirPercent = Math.min(100, existingEmiPercent + newEmiPercent);

    // Status classification
    let status: 'high' | 'moderate' | 'low' = 'high';
    let statusTitle = 'High Eligibility';
    let statusDesc = 'Excellent profile! You qualify for pre-approved processing with minimal documentation.';

    if (existingEmiPercent > 45 || maxEligibleLoan < 200000 || maxAllowedTenure <= 0) {
      status = 'low';
      statusTitle = 'Low / Restricted Eligibility';
      statusDesc = 'Your existing monthly obligations are high relative to income. Clear existing EMIs or add a co-applicant to qualify.';
    } else if (existingEmiPercent > 30 || totalFoirPercent > 50) {
      status = 'moderate';
      statusTitle = 'Moderate Eligibility';
      statusDesc = 'Good eligibility! Additional income proof or longer tenure can help increase your loan limit.';
    }

    // Suggestions to boost eligibility
    const suggestions: string[] = [];

    if (existingEmi > 0) {
      // Calculate boost if existing EMI is cleared
      const r = interestRate / 12 / 100;
      const n = (maxAllowedTenure || 20) * 12;
      const pvFactor = (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
      const potentialBoost = existingEmi * pvFactor;
      suggestions.push(
        `Clearing your existing monthly EMI of ${formatCurrency(existingEmi)} can increase your loan limit by up to ${formatIndianWords(potentialBoost)}.`
      );
    }

    if (maxAllowedTenure < 25 && age + tenureYears < maxRetirementAge) {
      suggestions.push(
        `Opting for a longer tenure (e.g. ${Math.min(30, maxRetirementAge - age)} years) will lower monthly payments and increase your total loan approval limit.`
      );
    }

    suggestions.push(
      `Adding a spouse or earning family member as a co-applicant can boost your eligible loan amount by 35% - 50%.`
    );

    suggestions.push(
      `Maintaining a CIBIL score above 750 unlocks preferential interest rates (as low as 8.35% p.a.) and waiver of processing fees.`
    );

    return {
      maxRetirementAge,
      maxAllowedTenure,
      foirRatioPercent: Math.round(foirRatio * 100),
      maxTotalEmiCapacity,
      availableMonthlyEmi,
      maxEligibleLoan,
      existingEmiPercent,
      newEmiPercent,
      totalFoirPercent,
      status,
      statusTitle,
      statusDesc,
      suggestions,
    };
  }, [monthlyIncome, existingEmi, employmentType, age, tenureYears, interestRate]);

  // Handlers for Print / Download
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleApplyClick = () => {
    if (onApplyForLoan) {
      onApplyForLoan(
        `Loan Eligibility Application - Max Eligible: ${formatIndianWords(calculations.maxEligibleLoan)} (Monthly EMI: ${formatCurrency(calculations.availableMonthlyEmi)})`
      );
    } else {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bento-card p-6 sm:p-8 space-y-8 mt-8 border border-slate-200 dark:border-[#262930]">
      {/* Header Inside Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#262930]">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Instant Pre-Approval Check</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Loan <span className="text-red-600">Eligibility</span> Calculator
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Check your maximum borrowing capacity based on Indian bank FOIR norms & monthly income.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 no-print">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-[#0a0b0d] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#262930] hover:border-red-500/40 transition-all flex items-center space-x-1.5"
            title="Reset to default values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-[#0a0b0d] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#262930] hover:border-blue-500/40 transition-all flex items-center space-x-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-blue-500" />
            <span>Print</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs (7 cols) & Results Summary (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Employment Type Selector */}
          <div>
            <label className="bento-label block mb-2">Employment Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEmploymentType('salaried')}
                className={`py-3 px-4 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all ${
                  employmentType === 'salaried'
                    ? 'border-red-600 bg-red-500/10 text-red-600 dark:text-red-400 shadow-sm'
                    : 'border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Salaried Employee</span>
              </button>

              <button
                type="button"
                onClick={() => setEmploymentType('self-employed')}
                className={`py-3 px-4 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all ${
                  employmentType === 'self-employed'
                    ? 'border-red-600 bg-red-500/10 text-red-600 dark:text-red-400 shadow-sm'
                    : 'border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Self-Employed / Business</span>
              </button>
            </div>
          </div>

          {/* Monthly Net Income */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="bento-label flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Net Monthly Income (₹)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">₹</span>
                <input
                  type="number"
                  value={monthlyIncome || ''}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-36 pl-7 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-sm font-bold text-right focus:border-red-500 focus:outline-none"
                  placeholder="75000"
                />
              </div>
            </div>
            <input
              type="range"
              min="15000"
              max="500000"
              step="5000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#262930] rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>₹15,000</span>
              <span>₹2,50,000</span>
              <span>₹5,00,000+</span>
            </div>
          </div>

          {/* Existing Monthly EMIs */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="bento-label flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Existing Monthly EMIs (₹)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">₹</span>
                <input
                  type="number"
                  value={existingEmi}
                  onChange={(e) => setExistingEmi(Number(e.target.value))}
                  className="w-36 pl-7 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-sm font-bold text-right focus:border-red-500 focus:outline-none"
                  placeholder="10000"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="200000"
              step="2000"
              value={existingEmi}
              onChange={(e) => setExistingEmi(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#262930] rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>₹0 (None)</span>
              <span>₹1,00,000</span>
              <span>₹2,00,000</span>
            </div>
          </div>

          {/* Age & Loan Tenure (2 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="bento-label flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>Applicant Age</span>
                </label>
                <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-[#0a0b0d] px-2.5 py-1 rounded-md border border-slate-200 dark:border-[#262930]">
                  {age} Yrs
                </span>
              </div>
              <input
                type="range"
                min="21"
                max="60"
                step="1"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-[#262930] rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>21 Yrs</span>
                <span>Max {calculations.maxRetirementAge} Yrs</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="bento-label flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Loan Tenure</span>
                </label>
                <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-[#0a0b0d] px-2.5 py-1 rounded-md border border-slate-200 dark:border-[#262930]">
                  {tenureYears} Years
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-[#262930] rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="bento-label flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-purple-500" />
                <span>Expected Interest Rate (% p.a.)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="5"
                  max="24"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-24 pl-3 pr-7 py-1.5 rounded-lg border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-sm font-bold text-right focus:border-red-500 focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">%</span>
              </div>
            </div>
            <input
              type="range"
              min="6.5"
              max="18"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#262930] rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

        </div>

        {/* Right Column: Calculated Results & Eligibility Status (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Main Result Highlight Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white shadow-xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Eligibility Status Badge */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                {calculations.status === 'high' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : calculations.status === 'moderate' ? (
                  <Info className="w-5 h-5 text-amber-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                )}
                <span className="text-sm font-bold tracking-wide">{calculations.statusTitle}</span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  calculations.status === 'high'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : calculations.status === 'moderate'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                {calculations.status === 'high' ? 'High Chance' : calculations.status === 'moderate' ? 'Moderate' : 'Needs Review'}
              </span>
            </div>

            {/* Primary Result Big Number */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                Maximum Eligible Loan Amount
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {formatIndianWords(calculations.maxEligibleLoan)}
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Exact Amount: <span className="text-slate-200 font-bold">{formatCurrency(calculations.maxEligibleLoan)}</span>
              </p>
            </div>

            {/* Key Sub-metrics */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Max Safe Monthly EMI
                </span>
                <span className="text-base font-extrabold text-emerald-400">
                  {formatCurrency(calculations.availableMonthlyEmi)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">/ month</span>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Max Loan Tenure
                </span>
                <span className="text-base font-extrabold text-blue-400">
                  {calculations.maxAllowedTenure} Years
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Retirement @ {calculations.maxRetirementAge} Yrs
                </span>
              </div>
            </div>

            {/* FOIR Capacity Usage Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                <span>FOIR Obligation Ratio</span>
                <span>{calculations.totalFoirPercent.toFixed(1)}% of Net Income</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, calculations.existingEmiPercent)}%` }}
                  title={`Existing EMI: ${calculations.existingEmiPercent.toFixed(1)}%`}
                ></div>
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100 - calculations.existingEmiPercent, calculations.newEmiPercent)}%` }}
                  title={`New EMI Capacity: ${calculations.newEmiPercent.toFixed(1)}%`}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                  Existing EMIs ({calculations.existingEmiPercent.toFixed(0)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  New Loan ({calculations.newEmiPercent.toFixed(0)}%)
                </span>
              </div>
            </div>

            {/* Apply CTA Button */}
            <button
              onClick={handleApplyClick}
              className="w-full py-3.5 px-4 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-red-600/30"
            >
              <span>Apply For This Loan Amount</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

      {/* Suggestions Section to Boost Eligibility */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#0a0b0d] border border-slate-200 dark:border-[#262930] space-y-4">
        <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-sm">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Actionable Tips to Increase Your Loan Eligibility</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {calculations.suggestions.map((tip, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white dark:bg-[#12141a] border border-slate-100 dark:border-[#262930] flex items-start space-x-3"
            >
              <div className="w-5 h-5 rounded-full bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5 font-extrabold text-[10px]">
                {idx + 1}
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
