import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Shield, PhoneCall, ChevronRight } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onOpenEligibility: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, onOpenEligibility }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Me', href: '#about-me' },
  { name: 'Services', href: '#services' },
  { name: 'Tools', href: '#tools' },
  { name: 'Blog', href: '#blog' },
  { name: 'Features', href: '#features' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-red-400 font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse mr-1.5"></span>
              Lowest Rate Index:
            </span>
            <span className="hidden sm:inline">Home Loans @ 7.50% p.a. | Personal Loans @ 9.99% p.a. | Business Loans @ 10.50% p.a.</span>
            <span className="sm:hidden">Home loans @ 7.50% p.a.</span>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <a href="tel:+918355882124" className="hover:text-red-400 transition-colors flex items-center gap-1 font-bold">
              <PhoneCall className="w-3 h-3 text-red-500" />
              <span>+91 8355882124</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline">Md Amzad Khan & Advisory</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center space-x-3 group">
            <img
  src="/logo.png.jpeg"
  alt="Amzad Consultancy Logo"
  className="w-11 h-11 object-contain"
/>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white flex items-center">
                AMZAD <span className="text-red-600 ml-1.5 font-bold">CONSULTANCY</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold -mt-1">
                HUB & ADVISORY
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              aria-label="Toggle Theme"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Check Eligibility CTA */}
            <button
              onClick={onOpenEligibility}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 transition-all flex items-center space-x-1.5 transform hover:-translate-y-0.5"
            >
              <span>Check Eligibility</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Actions & Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEligibility();
              }}
              className="w-full py-3 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white text-center shadow-md shadow-red-600/20 text-sm flex items-center justify-center space-x-2"
            >
              <span>Check Eligibility</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

