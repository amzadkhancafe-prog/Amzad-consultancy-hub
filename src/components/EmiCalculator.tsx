import React, { useState, useMemo } from 'react';
import {
  Calculator,
  RotateCcw,
  Printer,
  Download,
  IndianRupee,
  Percent,
  Calendar,
  PieChart as PieChartIcon,
  Table,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileText,
  Award,
  Gauge
} from 'lucide-react';
import { LoanEligibilityCalculator } from './LoanEligibilityCalculator';
import { CibilScoreEstimator } from './CibilScoreEstimator';

interface AmortizationRow {
  period: number;
  principalPaid: number;
  interestPaid: number;
  totalPayment: number;
  remainingBalance: number;
}

interface EmiCalculatorProps {
  onApplyForLoan?: (details: string) => void;
}

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({ onApplyForLoan }) => {
  // Active Tool Tab State
  const [activeTool, setActiveTool] = useState<'emi' | 'eligibility' | 'cibil'>('emi');

  // Input States with defaults (₹5,00,000 default)
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [processingFeeValue, setProcessingFeeValue] = useState<number>(1);
  const [processingFeeType, setProcessingFeeType] = useState<'percentage' | 'fixed'>('percentage');

  // Display & Accordion States
  const [scheduleView, setScheduleView] = useState<'yearly' | 'monthly'>('yearly');
  const [showFullSchedule, setShowFullSchedule] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Validation Errors
  const validationErrors = useMemo(() => {
    const errors: { [key: string]: string } = {};
    if (!loanAmount || loanAmount <= 0) {
      errors.loanAmount = 'Please enter a valid loan amount greater than ₹0';
    } else if (loanAmount > 20000000) {
      errors.loanAmount = 'Maximum loan amount limit is ₹2 Crore';
    }

    if (!interestRate || interestRate <= 0) {
      errors.interestRate = 'Interest rate must be greater than 0%';
    } else if (interestRate > 35) {
      errors.interestRate = 'Interest rate cannot exceed 35%';
    }

    if (!tenure || tenure <= 0) {
      errors.tenure = 'Tenure must be greater than 0';
    } else if (tenureType === 'years' && tenure > 40) {
      errors.tenure = 'Maximum tenure is 40 years';
    } else if (tenureType === 'months' && tenure > 480) {
      errors.tenure = 'Maximum tenure is 480 months';
    }

    if (processingFeeValue < 0) {
      errors.processingFee = 'Processing fee cannot be negative';
    }

    return errors;
  }, [loanAmount, interestRate, tenure, tenureType, processingFeeValue]);

  const isValid = Object.keys(validationErrors).length === 0;

  // EMI & Financial Calculations
  const calculations = useMemo(() => {
    const totalMonths = tenureType === 'years' ? tenure * 12 : tenure;
    const monthlyRate = (interestRate / 12) / 100;

    let emi = 0;
    if (totalMonths > 0 && interestRate > 0) {
      if (monthlyRate === 0) {
        emi = loanAmount / totalMonths;
      } else {
        const factor = Math.pow(1 + monthlyRate, totalMonths);
        emi = (loanAmount * monthlyRate * factor) / (factor - 1);
      }
    }

    const totalRepayment = emi * totalMonths;
    const totalInterest = Math.max(0, totalRepayment - loanAmount);

    let feeAmount = 0;
    if (processingFeeType === 'percentage') {
      feeAmount = (loanAmount * processingFeeValue) / 100;
    } else {
      feeAmount = processingFeeValue;
    }

    const overallTotalCost = loanAmount + totalInterest + feeAmount;

    // Percentages for Pie Chart
    const principalPct = overallTotalCost > 0 ? (loanAmount / overallTotalCost) * 100 : 0;
    const interestPct = overallTotalCost > 0 ? (totalInterest / overallTotalCost) * 100 : 0;
    const feePct = overallTotalCost > 0 ? (feeAmount / overallTotalCost) * 100 : 0;

    return {
      totalMonths,
      monthlyRate,
      emi: isNaN(emi) || !isFinite(emi) ? 0 : emi,
      totalInterest: isNaN(totalInterest) || !isFinite(totalInterest) ? 0 : totalInterest,
      totalRepayment: isNaN(totalRepayment) || !isFinite(totalRepayment) ? 0 : totalRepayment,
      feeAmount: isNaN(feeAmount) || !isFinite(feeAmount) ? 0 : feeAmount,
      overallTotalCost: isNaN(overallTotalCost) || !isFinite(overallTotalCost) ? 0 : overallTotalCost,
      principalPct,
      interestPct,
      feePct
    };
  }, [loanAmount, interestRate, tenure, tenureType, processingFeeValue, processingFeeType]);

  // Amortization Schedule Generation
  const amortizationSchedule = useMemo(() => {
    if (!isValid || calculations.totalMonths <= 0 || calculations.emi <= 0) {
      return { monthly: [], yearly: [] };
    }

    const monthly: AmortizationRow[] = [];
    let balance = loanAmount;

    for (let m = 1; m <= calculations.totalMonths; m++) {
      const interestForMonth = balance * calculations.monthlyRate;
      const principalForMonth = calculations.emi - interestForMonth;
      balance = Math.max(0, balance - principalForMonth);

      monthly.push({
        period: m,
        principalPaid: principalForMonth,
        interestPaid: interestForMonth,
        totalPayment: calculations.emi,
        remainingBalance: balance
      });
    }

    // Aggregate by Year
    const yearly: AmortizationRow[] = [];
    const numYears = Math.ceil(calculations.totalMonths / 12);

    for (let y = 1; y <= numYears; y++) {
      const startIdx = (y - 1) * 12;
      const endIdx = Math.min(y * 12, monthly.length);
      const yearMonths = monthly.slice(startIdx, endIdx);

      const yearPrincipal = yearMonths.reduce((acc, curr) => acc + curr.principalPaid, 0);
      const yearInterest = yearMonths.reduce((acc, curr) => acc + curr.interestPaid, 0);
      const yearPayment = yearMonths.reduce((acc, curr) => acc + curr.totalPayment, 0);
      const endBalance = yearMonths[yearMonths.length - 1]?.remainingBalance || 0;

      yearly.push({
        period: y,
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        totalPayment: yearPayment,
        remainingBalance: endBalance
      });
    }

    return { monthly, yearly };
  }, [isValid, loanAmount, calculations]);

  // Reset Handler
  const handleReset = () => {
    setLoanAmount(500000);
    setInterestRate(8.5);
    setTenure(5);
    setTenureType('years');
    setProcessingFeeValue(1);
    setProcessingFeeType('percentage');
    setShowFullSchedule(false);
  };

  // Formatters with Indian Rupee formatting
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Download PDF Handler (invokes window.print which provides native Print to PDF across all devices)
  const handleDownloadPDF = () => {
    window.print();
  };

  // SVG Pie Chart Arc Calculation helper
  const renderPieChart = () => {
    const { principalPct, interestPct, feePct } = calculations;
    
    // Convert percentages to SVG circle strokeDasharray values
    // Circumference = 2 * PI * r (r = 40 => Circumference ~ 251.327)
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    const principalStroke = (principalPct / 100) * circumference;
    const interestStroke = (interestPct / 100) * circumference;
    const feeStroke = (feePct / 100) * circumference;

    // Dash offsets
    const principalOffset = 0;
    const interestOffset = -principalStroke;
    const feeOffset = -(principalStroke + interestStroke);

    return (
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-slate-100 dark:stroke-[#262930] fill-none"
            strokeWidth="16"
          />
          {/* Principal Arc */}
          {principalPct > 0 && (
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-blue-600 fill-none transition-all duration-500"
              strokeWidth="16"
              strokeDasharray={`${principalStroke} ${circumference}`}
              strokeDashoffset={principalOffset}
            />
          )}
          {/* Interest Arc */}
          {interestPct > 0 && (
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-red-600 fill-none transition-all duration-500"
              strokeWidth="16"
              strokeDasharray={`${interestStroke} ${circumference}`}
              strokeDashoffset={interestOffset}
            />
          )}
          {/* Fee Arc */}
          {feePct > 0 && (
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-amber-500 fill-none transition-all duration-500"
              strokeWidth="16"
              strokeDasharray={`${feeStroke} ${circumference}`}
              strokeDashoffset={feeOffset}
            />
          )}
        </svg>

        {/* Center Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
          <span className="bento-label text-[10px]">Monthly EMI</span>
          <span className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(calculations.emi)}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">/ month</span>
        </div>
      </div>
    );
  };

  const displaySchedule = scheduleView === 'yearly' ? amortizationSchedule.yearly : amortizationSchedule.monthly;
  const visibleScheduleRows = showFullSchedule ? displaySchedule : displaySchedule.slice(0, 5);

  return (
    <section id="tools" className="py-16 md:py-24 relative printable-calculator-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Financial Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-blue-600">Calculators & Tools</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Calculate exact loan EMIs, interest breakdowns, check maximum borrowing eligibility, or estimate your CIBIL score.
          </p>

          {/* Interactive Tool Switcher Tabs */}
          <div className="flex justify-center pt-2 no-print">
            <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-[#12141a] border border-slate-300 dark:border-[#262930] shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTool('emi')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
                  activeTool === 'emi'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>Tool #1: EMI Calculator</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('eligibility')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
                  activeTool === 'eligibility'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Tool #2: Eligibility Calculator</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('cibil')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
                  activeTool === 'cibil'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Gauge className="w-4 h-4" />
                <span>Tool #3: CIBIL Score Estimator</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Tool View */}
        {activeTool === 'eligibility' ? (
          <LoanEligibilityCalculator onApplyForLoan={onApplyForLoan} />
        ) : activeTool === 'cibil' ? (
          <CibilScoreEstimator onApplyForLoan={onApplyForLoan} />
        ) : (
          <>
            {/* Main Calculator Bento Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Left Column: Inputs Form (7 cols) */}
          <div className="lg:col-span-7 bento-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#262930]">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Loan Parameters</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Adjust values using text inputs or interactive sliders</p>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-[#0a0b0d] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#262930] hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center space-x-1.5"
                title="Reset to default values"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Input 1: Loan Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="bento-label flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Loan Amount (₹)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">₹</span>
                  <input
                    type="number"
                    value={loanAmount || ''}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-36 pl-7 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-sm font-bold text-right focus:border-blue-500 focus:outline-none"
                    placeholder="500000"
                  />
                </div>
              </div>
              
              {/* Range Slider */}
              <input
                type="range"
                min="10000"
                max="20000000"
                step="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-[#262930] rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>₹10,000</span>
                <span>₹1 Crore</span>
                <span>₹2 Crore</span>
              </div>
              {validationErrors.loanAmount && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{validationErrors.loanAmount}</span>
                </p>
              )}
            </div>

            {/* Input 2: Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="bento-label flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Interest Rate (% p.a.)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate || ''}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-28 pl-3 pr-7 py-1.5 rounded-lg border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-sm font-bold text-right focus:border-blue-500 focus:outline-none"
                    placeholder="8.5"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">%</span>
                </div>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min="1"
                max="25"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-[#262930] rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1.0%</span>
                <span>12.5%</span>
                <span>25.0%</span>
              </div>
              {validationErrors.interestRate && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{validationErrors.interestRate}</span>
                </p>
              )}
            </div>

            {/* Input 3: Loan Tenure with Toggle */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="bento-label flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Loan Tenure</span>
                </label>
                
                <div className="flex items-center space-x-2">
                  {/* Years / Months Toggle */}
                  <div className="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-[#0a0b0d] border border-slate-200 dark:border-[#262930]">
                    <button
                      type="button"
                      onClick={() => {
                        if (tenureType === 'months') {
                          setTenure(Math.max(1, Math.round(tenure / 12)));
                          setTenureType('years');
                        }
                      }}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                        tenureType === 'years'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Years
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (tenureType === 'years') {
                          setTenure(tenure * 12);
                          setTenureType('months');
                        }
                      }}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                        tenureType === 'months'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Months
                    </button>
                  </div>

                  <input
                    type="number"
                    value={tenure || ''}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-sm font-bold text-right focus:border-blue-500 focus:outline-none"
                    placeholder="5"
                  />
                </div>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min="1"
                max={tenureType === 'years' ? '30' : '360'}
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-[#262930] rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>{tenureType === 'years' ? '1 Year' : '1 Month'}</span>
                <span>{tenureType === 'years' ? '15 Years' : '180 Months'}</span>
                <span>{tenureType === 'years' ? '30 Years' : '360 Months'}</span>
              </div>
              {validationErrors.tenure && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{validationErrors.tenure}</span>
                </p>
              )}
            </div>

            {/* Input 4: Processing Fee (Optional) */}
            <div className="pt-2 border-t border-slate-100 dark:border-[#262930] space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1.5">
                  <label className="bento-label">Processing Fee (Optional)</label>
                  <span className="text-[10px] text-slate-400 font-normal">(Bank charges)</span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-[#0a0b0d] border border-slate-200 dark:border-[#262930]">
                    <button
                      type="button"
                      onClick={() => setProcessingFeeType('percentage')}
                      className={`px-2 py-0.5 text-xs font-bold rounded-md transition-all ${
                        processingFeeType === 'percentage'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      %
                    </button>
                    <button
                      type="button"
                      onClick={() => setProcessingFeeType('fixed')}
                      className={`px-2 py-0.5 text-xs font-bold rounded-md transition-all ${
                        processingFeeType === 'fixed'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      ₹
                    </button>
                  </div>

                  <input
                    type="number"
                    step="0.1"
                    value={processingFeeValue}
                    onChange={(e) => setProcessingFeeValue(Number(e.target.value))}
                    className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-sm font-bold text-right focus:border-blue-500 focus:outline-none"
                    placeholder="1.0"
                  />
                </div>
              </div>
            </div>

            {/* Summary Row inside Form */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0a0b0d] border border-slate-100 dark:border-[#262930] grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="bento-label block">Total Interest</span>
                <span className="text-base font-extrabold text-red-600 dark:text-red-400">
                  {formatCurrency(calculations.totalInterest)}
                </span>
              </div>
              <div>
                <span className="bento-label block">Total Payable</span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white">
                  {formatCurrency(calculations.overallTotalCost)}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Pie Chart & Breakdown Summary (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Pie Chart Card */}
            <div className="bento-card p-6 flex flex-col justify-between space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#262930]">
                <div className="flex items-center space-x-2">
                  <PieChartIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payment Breakup</h3>
                </div>
                <span className="bento-label">Visual Ratio</span>
              </div>

              {/* Pie Chart SVG */}
              {renderPieChart()}

              {/* Legend & Exact Amounts */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-[#262930]">
                {/* Principal */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Principal Amount</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(loanAmount)}</span>
                    <span className="text-slate-400 text-[10px] ml-1.5">({calculations.principalPct.toFixed(1)}%)</span>
                  </div>
                </div>

                {/* Total Interest */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-600 inline-block"></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Total Interest</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-red-600 dark:text-red-400">{formatCurrency(calculations.totalInterest)}</span>
                    <span className="text-slate-400 text-[10px] ml-1.5">({calculations.interestPct.toFixed(1)}%)</span>
                  </div>
                </div>

                {/* Processing Fee */}
                {calculations.feeAmount > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Processing Fee</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-amber-600 dark:text-amber-400">{formatCurrency(calculations.feeAmount)}</span>
                      <span className="text-slate-400 text-[10px] ml-1.5">({calculations.feePct.toFixed(1)}%)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Print & Download Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-3 no-print">
                <button
                  onClick={handlePrint}
                  className="px-4 py-3 rounded-xl font-bold bg-slate-100 dark:bg-[#0a0b0d] text-slate-900 dark:text-white border border-slate-200 dark:border-[#262930] hover:border-blue-500/50 transition-all text-xs flex items-center justify-center space-x-2"
                >
                  <Printer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Print Result</span>
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="px-4 py-3 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all text-xs flex items-center justify-center space-x-2 shadow-md shadow-red-600/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Amortization Schedule Table Card */}
        <div className="bento-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-[#262930]">
            <div>
              <div className="flex items-center space-x-2">
                <Table className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Amortization Schedule</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Detailed repayment timeline breakdown</p>
            </div>

            {/* Toggle Yearly / Monthly View */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#0a0b0d] border border-slate-200 dark:border-[#262930]">
              <button
                type="button"
                onClick={() => setScheduleView('yearly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  scheduleView === 'yearly'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Yearly View
              </button>
              <button
                type="button"
                onClick={() => setScheduleView('monthly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  scheduleView === 'monthly'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Monthly View
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-[#262930] text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold bento-label">
                    {scheduleView === 'yearly' ? 'Year' : 'Month #'}
                  </th>
                  <th className="py-3 px-4 font-bold bento-label text-right">Principal Paid</th>
                  <th className="py-3 px-4 font-bold bento-label text-right">Interest Paid</th>
                  <th className="py-3 px-4 font-bold bento-label text-right">Total Payment</th>
                  <th className="py-3 px-4 font-bold bento-label text-right">Balance Remaining</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#262930]">
                {visibleScheduleRows.map((row) => (
                  <tr key={row.period} className="hover:bg-slate-50 dark:hover:bg-[#0a0b0d]/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {scheduleView === 'yearly' ? `Year ${row.period}` : `Month ${row.period}`}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-blue-600 dark:text-blue-400 text-right">
                      {formatCurrency(row.principalPaid)}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-red-600 dark:text-red-400 text-right">
                      {formatCurrency(row.interestPaid)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white text-right">
                      {formatCurrency(row.totalPayment)}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-500 dark:text-slate-400 text-right">
                      {formatCurrency(row.remainingBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Show More / Show Less Button */}
          {displaySchedule.length > 5 && (
            <div className="text-center pt-2 border-t border-slate-100 dark:border-[#262930] no-print">
              <button
                onClick={() => setShowFullSchedule(!showFullSchedule)}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-[#0a0b0d] text-slate-900 dark:text-white hover:border-blue-500/40 border border-slate-200 dark:border-[#262930] transition-all inline-flex items-center space-x-2"
              >
                <span>{showFullSchedule ? 'Collapse Schedule' : `Show Full Schedule (${displaySchedule.length} ${scheduleView === 'yearly' ? 'Years' : 'Months'})`}</span>
                {showFullSchedule ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          )}

        </div>

          </>
        )}

      </div>
    </section>
  );
};
