import React from 'react';
import { X, ShieldCheck, FileText, AlertTriangle, Building2, User } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'disclaimer' | 'about' | null;

interface LegalModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#12141a] border border-slate-200 dark:border-[#262930] rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-slate-800 dark:text-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#262930] flex items-center justify-between bg-slate-50 dark:bg-[#0a0b0d]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
              {activeModal === 'privacy' && <ShieldCheck className="w-6 h-6" />}
              {activeModal === 'terms' && <FileText className="w-6 h-6" />}
              {activeModal === 'disclaimer' && <AlertTriangle className="w-6 h-6" />}
              {activeModal === 'about' && <Building2 className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {activeModal === 'privacy' && 'Privacy Policy & Data Protection'}
                {activeModal === 'terms' && 'Terms & Conditions of Service'}
                {activeModal === 'disclaimer' && 'Financial & Regulatory Disclaimer'}
                {activeModal === 'about' && 'About Amzad Consultancy Hub & Advisory'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Founded by Md Amzad Khan | RBI & IT Act Compliant Guidance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#262930] transition-all"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          
          {/* 1. Privacy Policy */}
          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <p className="font-semibold text-slate-900 dark:text-white">
                At Amzad Consultancy Hub & Advisory, led by Md Amzad Khan, we treat user privacy, financial data security, and confidentiality with the highest priority in accordance with the Digital Personal Data Protection (DPDP) Act 2023 and RBI Guidelines.
              </p>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">1. Information We Collect</h4>
                <p>
                  We collect information provided directly by users when requesting loan eligibility checks, submitting advisory contact forms, or utilizing our EMI and CIBIL estimation calculators. This includes name, email address, phone number, employment details, and monthly income figures.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">2. Purpose of Data Processing</h4>
                <p>
                  Your information is processed strictly to provide financial advisory services, verify loan pre-approval chances across our 15+ partner banks and NBFCs, and generate personalized financial insights. We do NOT sell or lease your personal data to unauthorized third-party telemarketers.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">3. Data Security & Encryption</h4>
                <p>
                  All transmitted data is safeguarded using enterprise-grade 256-bit SSL encryption. Data at rest is stored in secure, access-controlled systems.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">4. Your Rights</h4>
                <p>
                  You retain the right to request deletion, correction, or access to your stored personal data at any time by contacting Md Amzad Khan at <a href="mailto:amzadkhan369@gmail.com" className="font-bold text-red-600 dark:text-red-400 underline">amzadkhan369@gmail.com</a> or via phone at <a href="tel:+918355882124" className="font-bold text-slate-900 dark:text-white">+91 8355882124</a>.
                </p>
              </div>
            </div>
          )}

          {/* 2. Terms & Conditions */}
          {activeModal === 'terms' && (
            <div className="space-y-4">
              <p className="font-semibold text-slate-900 dark:text-white">
                By accessing and using Amzad Consultancy Hub & Advisory, you agree to comply with and be bound by the following Terms & Conditions.
              </p>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">1. Financial Advisory Services</h4>
                <p>
                  Amzad Consultancy Hub & Advisory operates as an authorized corporate loan distributor and financial advisory consultancy led by Md Amzad Khan, partnering with RBI-regulated Scheduled Commercial Banks and NBFCs. We facilitate loan applications but do not directly issue credit.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">2. Accuracy of Calculations</h4>
                <p>
                  Calculations provided by our EMI Calculator, Loan Eligibility Calculator, and CIBIL Score Estimator are illustrative estimates based on user inputs. Final interest rates (starting at 7.50% p.a. for Home Loans, 9.99% p.a. for Personal Loans, and 10.50% p.a. for Business Loans), loan amounts, and credit decisions remain strictly subject to partner bank underwriting guidelines.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">3. User Responsibilities</h4>
                <p>
                  Users must provide truthful, accurate, and current information when filling out consultation and eligibility forms. Misrepresentation may result in instant cancellation of advisory requests.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">4. Intellectual Property</h4>
                <p>
                  All content, tools, calculators, visual branding, and code elements on this platform are owned by Amzad Consultancy Hub & Advisory and protected under applicable copyright laws.
                </p>
              </div>
            </div>
          )}

          {/* 3. Disclaimer */}
          {activeModal === 'disclaimer' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 space-y-2">
                <div className="flex items-center space-x-2 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>Regulatory Notice</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Amzad Consultancy Hub & Advisory is a professional loan consultancy and advisory firm based in Imampur, Bhagalpur, Bihar, India. We are not a direct lender or banking institution.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">No Guarantee of Loan Sanction</h4>
                <p>
                  Approval of personal loans, home loans, business loans, or credit lines is solely at the discretion of the partner lending bank/NBFC following their verification, KYC check, property valuation, and credit assessment.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Interest Rates & Fees</h4>
                <p>
                  Interest rates shown on this platform (Home Loan from 7.50% p.a., Personal Loan from 9.99% p.a., Business Loan from 10.50% p.a.) represent minimum starting rates offered by partner lenders. Rates may vary according to borrower credit profile, income, and tenure.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Zero Hidden Charges Policy</h4>
                <p>
                  Amzad Consultancy Hub & Advisory maintains complete transparency and NEVER asks clients to pay cash into personal accounts or charge hidden fees for loan processing.
                </p>
              </div>
            </div>
          )}

          {/* 4. About Us */}
          {activeModal === 'about' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 bg-red-50 dark:bg-red-950/40 p-4 rounded-2xl border border-red-200 dark:border-red-900/50">
                <User className="w-8 h-8 text-red-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Md Amzad Khan</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Founder & Principal Financial Consultant</p>
                  <p className="text-xs text-red-600 dark:text-red-400 font-semibold mt-0.5">Imampur, Bhagalpur, Bihar, India | +91 8355882124</p>
                </div>
              </div>

              <p className="font-semibold text-slate-900 dark:text-white text-base">
                Amzad Consultancy Hub & Advisory is a leading financial consultancy firm dedicated to helping individuals, families, and businesses secure fast loan approvals with minimal interest rates.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#0a0b0d] border border-slate-200 dark:border-[#262930] text-center">
                  <span className="text-xl font-black text-red-600 block">5000+</span>
                  <span className="text-[10px] font-bold text-slate-500">Happy Customers</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#0a0b0d] border border-slate-200 dark:border-[#262930] text-center">
                  <span className="text-xl font-black text-blue-600 block">₹100+ Cr</span>
                  <span className="text-[10px] font-bold text-slate-500">Loan Assistance</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#0a0b0d] border border-slate-200 dark:border-[#262930] text-center">
                  <span className="text-xl font-black text-amber-500 block">15+</span>
                  <span className="text-[10px] font-bold text-slate-500">Bank & NBFC Partners</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#0a0b0d] border border-slate-200 dark:border-[#262930] text-center">
                  <span className="text-xl font-black text-emerald-600 block">98%</span>
                  <span className="text-[10px] font-bold text-slate-500">Satisfaction Rate</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Our Mission</h4>
                <p>
                  To simplify borrowing by providing transparent guidance, expert eligibility checks, and seamless loan disbursals across Personal Loans, Home Loans, and Business Loans.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Why Choose Amzad Consultancy</h4>
                <ul className="space-y-1.5 list-disc pl-5">
                  <li>Direct guidance from Founder Md Amzad Khan</li>
                  <li>Partnerships with 15+ top Indian banks and NBFCs</li>
                  <li>Fast pre-approvals with minimum paper documentation</li>
                  <li>Zero hidden charges and 100% transparent advisory</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Footer Button */}
        <div className="p-4 border-t border-slate-100 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};

