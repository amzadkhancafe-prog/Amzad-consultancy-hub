import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  IndianRupee,
  Gauge,
  CreditCard,
  History,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Printer,
  Download,
  Sparkles,
  TrendingUp,
  Award,
  ArrowRight,
  Info,
  HelpCircle,
  Clock,
  UserCheck,
  Briefcase
} from 'lucide-react';

interface CibilScoreEstimatorProps {
  onApplyForLoan?: (details: string) => void;
}

export const CibilScoreEstimator: React.FC<CibilScoreEstimatorProps> = ({ onApplyForLoan }) => {
  // Input states
  const [age, setAge] = useState<number>(32);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(75000);
  const [employmentType, setEmploymentType] = useState<'salaried' | 'self-employed'>('salaried');
  const [existingLoansCount, setExistingLoansCount] = useState<number>(1);
  const [creditCardsCount, setCreditCardsCount] = useState<number>(2);
  const [cardUtilization, setCardUtilization] = useState<number>(25); // %
  const [paymentHistory, setPaymentHistory] = useState<'always-on-time' | 'occasional-delay' | 'frequent-missed'>('always-on-time');
  const [repaymentTrack, setRepaymentTrack] = useState<'clean' | 'minor-delays' | 'written-off'>('clean');
  const [recentEnquiries, setRecentEnquiries] = useState<number>(1);

  // Reset function
  const handleReset = () => {
    setAge(32);
    setMonthlyIncome(75000);
    setEmploymentType('salaried');
    setExistingLoansCount(1);
    setCreditCardsCount(2);
    setCardUtilization(25);
    setPaymentHistory('always-on-time');
    setRepaymentTrack('clean');
    setRecentEnquiries(1);
  };

  // Indian Rupee Formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Math.round(val));
  };

  // CIBIL Calculation Engine
  const calculations = useMemo(() => {
    let score = 700; // Baseline median

    // 1. EMI Payment History (Weight: ~35%)
    if (paymentHistory === 'always-on-time') score += 75;
    else if (paymentHistory === 'occasional-delay') score -= 45;
    else if (paymentHistory === 'frequent-missed') score -= 120;

    // 2. Loan Repayment Record
    if (repaymentTrack === 'clean') score += 40;
    else if (repaymentTrack === 'minor-delays') score -= 30;
    else if (repaymentTrack === 'written-off') score -= 150;

    // 3. Credit Card Utilization (Weight: ~30%)
    if (creditCardsCount > 0) {
      if (cardUtilization <= 30) score += 45;
      else if (cardUtilization <= 50) score += 10;
      else if (cardUtilization <= 75) score -= 35;
      else score -= 85;
    } else {
      score -= 10; // Thin credit file penalty
    }

    // 4. Number of Credit Cards
    if (creditCardsCount >= 1 && creditCardsCount <= 3) score += 15;
    else if (creditCardsCount >= 4 && creditCardsCount <= 6) score += 5;
    else if (creditCardsCount > 6) score -= 20;

    // 5. Recent Hard Enquiries in last 6 months (Weight: ~10%)
    if (recentEnquiries === 0) score += 20;
    else if (recentEnquiries <= 2) score += 5;
    else if (recentEnquiries <= 5) score -= 35;
    else score -= 75;

    // 6. Active Loans (Credit Mix & Leverage)
    if (existingLoansCount === 1 || existingLoansCount === 2) score += 15;
    else if (existingLoansCount >= 3 && existingLoansCount <= 4) score -= 10;
    else if (existingLoansCount >= 5) score -= 40;

    // 7. Income level stability boost
    if (monthlyIncome >= 100000) score += 15;
    else if (monthlyIncome >= 50000) score += 10;

    // Clamp score strictly between 300 and 900
    const finalScore = Math.max(300, Math.min(900, Math.round(score)));

    // Score Category Rating
    let rating: 'Poor' | 'Fair' | 'Good' | 'Very Good' | 'Excellent' = 'Good';
    let ratingColor = 'text-yellow-500';
    let ratingBg = 'bg-yellow-500/10 border-yellow-500/30';
    let approvalChance = 'Moderate (65-75%)';
    let description = 'Good credit score! You are eligible for most standard loans, though top-tier interest rate discounts may require a score above 750.';

    if (finalScore >= 780) {
      rating = 'Excellent';
      ratingColor = 'text-emerald-500';
      ratingBg = 'bg-emerald-500/10 border-emerald-500/30';
      approvalChance = 'Instant Pre-Approved (95%+)';
      description = 'Outstanding credit rating! You unlock lowest ROI, zero processing fee waivers, and instant digital approvals across all partner banks.';
    } else if (finalScore >= 725) {
      rating = 'Very Good';
      ratingColor = 'text-teal-400';
      ratingBg = 'bg-teal-500/10 border-teal-500/30';
      approvalChance = 'High Approval (85-90%)';
      description = 'Very strong score! High probability of approval with competitive interest rates and fast processing times.';
    } else if (finalScore >= 650) {
      rating = 'Good';
      ratingColor = 'text-blue-500';
      ratingBg = 'bg-blue-500/10 border-blue-500/30';
      approvalChance = 'Moderate (70-80%)';
      description = 'Fairly healthy score. Standard loan approval is likely, though income verification and collateral checks will be strictly evaluated.';
    } else if (finalScore >= 580) {
      rating = 'Fair';
      ratingColor = 'text-amber-500';
      ratingBg = 'bg-amber-500/10 border-amber-500/30';
      approvalChance = 'Low to Moderate (40-55%)';
      description = 'Fair credit score. Higher risk perception by main banks; you may require a co-applicant or higher interest rates.';
    } else {
      rating = 'Poor';
      ratingColor = 'text-red-500';
      ratingBg = 'bg-red-500/10 border-red-500/30';
      approvalChance = 'Low / CIBIL Repair Needed (<30%)';
      description = 'Credit profile needs improvement. Focus on clearing outstanding defaults and paying all current EMIs strictly on time for 6-12 months.';
    }

    // Suitable Loan Types
    const suitableLoans: string[] = [];
    if (finalScore >= 750) {
      suitableLoans.push('Unsecured Personal Loans (Up to ₹40 Lakh)');
      suitableLoans.push('Low-ROI Home Loans @ 8.35% p.a.');
      suitableLoans.push('Collateral-Free Business Loans');
      suitableLoans.push('Pre-Approved Credit Cards');
    } else if (finalScore >= 650) {
      suitableLoans.push('Standard Home Loans with Co-Applicant');
      suitableLoans.push('Secured Auto & Gold Loans');
      suitableLoans.push('Salaried Personal Loans');
    } else {
      suitableLoans.push('Gold & Property Secured Loans');
      suitableLoans.push('Fixed-Deposit Backed Credit Cards');
      suitableLoans.push('CIBIL Builder Credit Products');
    }

    // Tailored Recommendations
    const tips: string[] = [];
    if (cardUtilization > 30) {
      tips.push(`Reduce your credit card balance to below 30% of your total limit (currently at ${cardUtilization}%). This can boost your score by 30-50 points quickly.`);
    }
    if (recentEnquiries >= 3) {
      tips.push(`Avoid applying for new credit cards or loans for the next 3 to 6 months to stop hard enquiries from depressing your score.`);
    }
    if (paymentHistory !== 'always-on-time') {
      tips.push(`Enable Auto-Debit / NACH mandates for all active loans to guarantee 100% on-time EMI repayments moving forward.`);
    }
    if (existingLoansCount >= 4) {
      tips.push(`Consider consolidating multiple high-interest short-term loans into a single low-EMI long-term loan to lower active obligation count.`);
    }
    if (creditCardsCount === 0) {
      tips.push(`Consider applying for a secured credit card (against an FD) to start building a healthy, active CIBIL credit history.`);
    }
    tips.push(`Check your official CIBIL credit report once every 6 months to spot and report any inaccurate default entries or fraudulent enquiries.`);

    return {
      finalScore,
      rating,
      ratingColor,
      ratingBg,
      approvalChance,
      description,
      suitableLoans,
      tips,
    };
  }, [
    paymentHistory,
    repaymentTrack,
    cardUtilization,
    creditCardsCount,
    recentEnquiries,
    existingLoansCount,
    monthlyIncome,
  ]);

  const handlePrint = () => {
    window.print();
  };

  const handleApplyClick = () => {
    const details = `CIBIL Score Estimate: ${calculations.finalScore} (${calculations.rating}) - Income: ₹${monthlyIncome.toLocaleString('en-IN')}`;
    if (onApplyForLoan) {
      onApplyForLoan(details);
    } else {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // SVG Gauge Arc Geometry
  // Arc spans from 180 deg to 0 deg (180 deg sweep)
  // R = 70. Center at (100, 90)
  const gaugeAngle = useMemo(() => {
    // Score range 300 to 900 => delta = 600
    const pct = Math.max(0, Math.min(1, (calculations.finalScore - 300) / 600));
    return 180 - pct * 180; // 180 (left) to 0 (right)
  }, [calculations.finalScore]);

  return (
    <div className="bento-card p-6 sm:p-8 space-y-8 mt-8 border border-slate-200 dark:border-[#262930]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#262930]">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Instant Credit Assessment</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            CIBIL Score <span className="text-red-600">Estimator</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Simulate your official credit score (300-900) based on credit history, card utilization, & repayment habits.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 no-print">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-[#0a0b0d] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#262930] hover:border-red-500/40 transition-all flex items-center space-x-1.5"
            title="Reset form"
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
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid: Inputs (7 cols) vs Score Meter & Results (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Questionnaire Inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Row 1: EMI Payment History */}
          <div className="space-y-2">
            <label className="bento-label flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-emerald-500" />
              <span>EMI & Bill Payment Track Record</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentHistory('always-on-time')}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                  paymentHistory === 'always-on-time'
                    ? 'border-emerald-600 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="block font-extrabold text-sm mb-0.5">Always On-Time</span>
                <span className="text-[10px] font-normal opacity-80 block">0 missed or late EMIs</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentHistory('occasional-delay')}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                  paymentHistory === 'occasional-delay'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="block font-extrabold text-sm mb-0.5">Occasional Delay</span>
                <span className="text-[10px] font-normal opacity-80 block">1-2 delays &lt; 30 days</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentHistory('frequent-missed')}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                  paymentHistory === 'frequent-missed'
                    ? 'border-red-600 bg-red-500/10 text-red-600 dark:text-red-400 shadow-sm'
                    : 'border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="block font-extrabold text-sm mb-0.5">Frequent Missed</span>
                <span className="text-[10px] font-normal opacity-80 block">Multiple late payments</span>
              </button>
            </div>
          </div>

          {/* Row 2: Credit Card Utilization Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="bento-label flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-blue-500" />
                <span>Credit Card Limit Utilization (%)</span>
              </label>
              <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-[#0a0b0d] px-2.5 py-1 rounded-md border border-slate-200 dark:border-[#262930]">
                {cardUtilization}% Utilized
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={cardUtilization}
              onChange={(e) => setCardUtilization(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#262930] rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span className="text-emerald-500 font-bold">&lt;30% (Ideal)</span>
              <span>50%</span>
              <span className="text-red-500 font-bold">&gt;75% (High Risk)</span>
            </div>
          </div>

          {/* Row 3: Credit Cards & Active Loans Count (2 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Number of Credit Cards */}
            <div className="space-y-2">
              <label className="bento-label block">Number of Active Credit Cards</label>
              <select
                value={creditCardsCount}
                onChange={(e) => setCreditCardsCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-xs font-bold focus:border-red-500 focus:outline-none"
              >
                <option value={0}>0 Cards (No Card History)</option>
                <option value={1}>1 Credit Card</option>
                <option value={2}>2 Credit Cards</option>
                <option value={3}>3 Credit Cards</option>
                <option value={5}>4-5 Credit Cards</option>
                <option value={8}>6+ Credit Cards</option>
              </select>
            </div>

            {/* Existing Active Loans */}
            <div className="space-y-2">
              <label className="bento-label block">Number of Active Loans</label>
              <select
                value={existingLoansCount}
                onChange={(e) => setExistingLoansCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-xs font-bold focus:border-red-500 focus:outline-none"
              >
                <option value={0}>0 Active Loans</option>
                <option value={1}>1 Active Loan (Personal/Car/Home)</option>
                <option value={2}>2 Active Loans</option>
                <option value={3}>3 Active Loans</option>
                <option value={5}>4+ Active Loans</option>
              </select>
            </div>
          </div>

          {/* Row 4: Recent Loan Enquiries in last 6 months */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="bento-label flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-purple-500" />
                <span>Loan/Card Enquiries in Last 6 Months</span>
              </label>
              <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-[#0a0b0d] px-2.5 py-1 rounded-md border border-slate-200 dark:border-[#262930]">
                {recentEnquiries} {recentEnquiries === 1 ? 'Enquiry' : 'Enquiries'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={recentEnquiries}
              onChange={(e) => setRecentEnquiries(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#262930] rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span className="text-emerald-500 font-bold">0-1 (Optimal)</span>
              <span>2-3</span>
              <span className="text-red-500 font-bold">5+ (Credit Hungry)</span>
            </div>
          </div>

          {/* Row 5: Historical Repayment Track Record */}
          <div className="space-y-2">
            <label className="bento-label block">Past Account Status & Default History</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRepaymentTrack('clean')}
                className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                  repaymentTrack === 'clean'
                    ? 'border-emerald-600 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-600 dark:text-slate-400'
                }`}
              >
                100% Clean Record
              </button>

              <button
                type="button"
                onClick={() => setRepaymentTrack('minor-delays')}
                className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                  repaymentTrack === 'minor-delays'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-600 dark:text-slate-400'
                }`}
              >
                Minor Late Fees
              </button>

              <button
                type="button"
                onClick={() => setRepaymentTrack('written-off')}
                className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                  repaymentTrack === 'written-off'
                    ? 'border-red-600 bg-red-500/10 text-red-600 dark:text-red-400'
                    : 'border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-600 dark:text-slate-400'
                }`}
              >
                Settled / Written Off
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Score Gauge Meter & Approval Insights */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card containing SVG Gauge */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white shadow-xl relative overflow-hidden flex flex-col items-center justify-between space-y-4 text-center">
            
            <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-red-500" />
                <span>Estimated CIBIL Score</span>
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${calculations.ratingBg} ${calculations.ratingColor}`}>
                {calculations.rating}
              </span>
            </div>

            {/* SVG半圆 Gauge Meter */}
            <div className="relative w-48 h-32 flex items-end justify-center pt-2">
              <svg className="w-48 h-28" viewBox="0 0 200 110">
                {/* Background Track Arc */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="16"
                  strokeLinecap="round"
                />

                {/* Color Zones Gradient Arc */}
                {/* Poor (300-579): Red */}
                <path
                  d="M 20 100 A 80 80 0 0 1 55 45"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="16"
                />
                {/* Fair (580-649): Amber */}
                <path
                  d="M 55 45 A 80 80 0 0 1 90 22"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="16"
                />
                {/* Good (650-724): Yellow */}
                <path
                  d="M 90 22 A 80 80 0 0 1 130 25"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="16"
                />
                {/* Very Good (725-779): Teal */}
                <path
                  d="M 130 25 A 80 80 0 0 1 160 50"
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="16"
                />
                {/* Excellent (780-900): Emerald */}
                <path
                  d="M 160 50 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="16"
                  strokeLinecap="round"
                />

                {/* Needle Indicator Line */}
                <g transform="translate(100, 100)">
                  <line
                    x1="0"
                    y1="0"
                    x2="-60"
                    y2="0"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    style={{
                      transform: `rotate(${gaugeAngle}deg)`,
                      transformOrigin: '0 0',
                      transition: 'transform 0.5s ease-out',
                    }}
                  />
                  <circle cx="0" cy="0" r="7" fill="#ffffff" />
                  <circle cx="0" cy="0" r="3" fill="#0f172a" />
                </g>
              </svg>

              {/* Number Display directly under gauge */}
              <div className="absolute bottom-0 text-center">
                <span className="text-4xl font-black text-white tracking-tight">
                  {calculations.finalScore}
                </span>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                  Score Range (300 - 900)
                </span>
              </div>
            </div>

            {/* Approval Chance & Overview */}
            <div className="w-full bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1.5 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">Bank Approval Chance:</span>
                <span className="text-emerald-400 font-extrabold">{calculations.approvalChance}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                {calculations.description}
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleApplyClick}
              className="w-full py-3.5 px-4 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-red-600/30"
            >
              <span>Apply For Pre-Approved Loans</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

          {/* Suitable Loans Card */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0a0b0d] border border-slate-200 dark:border-[#262930] space-y-3">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-500" />
              <span>Recommended Financial Products</span>
            </span>
            <ul className="space-y-2 text-xs font-semibold">
              {calculations.suitableLoans.map((loan, idx) => (
                <li key={idx} className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{loan}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Tailored Improvement Recommendations */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#0a0b0d] border border-slate-200 dark:border-[#262930] space-y-4">
        <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-sm">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <span>Tailored Tips to Boost Your CIBIL Score</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {calculations.tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white dark:bg-[#12141a] border border-slate-100 dark:border-[#262930] flex items-start space-x-3"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-extrabold text-[10px]">
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
