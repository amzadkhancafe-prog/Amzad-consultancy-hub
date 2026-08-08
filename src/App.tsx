import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { EmiCalculator } from './components/EmiCalculator';
import { Features } from './components/Features';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { AboutMe } from './components/AboutMe';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { EligibilityModal } from './components/EligibilityModal';
import { EmiNoticeModal } from './components/EmiNoticeModal';
import { LegalModals, LegalModalType } from './components/LegalModals';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);
  const [emiNoticeModalOpen, setEmiNoticeModalOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string>('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForContact(serviceName);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyForLoanFromModal = (loanDetails: string) => {
    setSelectedServiceForContact(loanDetails);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0a0b0d] text-slate-900 dark:text-white transition-colors duration-300 relative selection:bg-red-500 selection:text-white">
      
      {/* Sticky Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenEligibility={() => setEligibilityModalOpen(true)}
      />

      {/* Main Page Layout */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenEligibility={() => setEligibilityModalOpen(true)}
          onOpenEmiNotice={() => setEmiNoticeModalOpen(true)}
        />

        {/* Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* Tools Section - Financial Calculators & Suite */}
        <EmiCalculator onApplyForLoan={handleApplyForLoanFromModal} />

        {/* Features Section */}
        <Features />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Customer Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* Contact Section */}
        <Contact initialServiceRequirement={selectedServiceForContact} />
        <AboutMe />
      </main>

      {/* Footer */}
      <Footer onOpenLegalModal={(type) => setLegalModal(type)} />

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Check Loan Eligibility Interactive Modal */}
      <EligibilityModal
        isOpen={eligibilityModalOpen}
        onClose={() => setEligibilityModalOpen(false)}
        onApplyForLoan={handleApplyForLoanFromModal}
      />

      {/* Calculate EMI Notice / Formula Preview Modal */}
      <EmiNoticeModal
        isOpen={emiNoticeModalOpen}
        onClose={() => setEmiNoticeModalOpen(false)}
        onOpenContact={() => {
          setEmiNoticeModalOpen(false);
          const contactSection = document.querySelector('#contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Privacy, Terms, Disclaimer & About Legal Modals */}
      <LegalModals
        activeModal={legalModal}
        onClose={() => setLegalModal(null)}
      />

      {/* Floating Call, WhatsApp & Email Action Buttons */}
      <FloatingActions />

    </div>
  );
}
