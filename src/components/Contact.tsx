import React, { useState, useEffect } from 'react';
import { ContactFormData } from '../types';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck, Sparkles, User, MessageCircle } from 'lucide-react';

interface ContactProps {
  initialServiceRequirement?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialServiceRequirement }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: 'Personal Loan',
    amountNeeded: '500000',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialServiceRequirement) {
      setFormData((prev) => ({
        ...prev,
        message: `Inquiry regarding: ${initialServiceRequirement}`,
      }));
    }
  }, [initialServiceRequirement]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect With Md Amzad Khan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Get In Touch With Amzad Consultancy
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Have questions about loan pre-approval, home loan eligibility, or business capital? Talk directly with our principal advisor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bento-card p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-[#262930] pb-4">
                Consultancy & Contact Details
              </h3>

              <div className="space-y-5 text-sm">
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex-shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="bento-label block">Founder & Owner</span>
                    <p className="font-bold text-slate-900 dark:text-white text-base">
                      Md Amzad Khan
                    </p>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Principal Financial Consultant</span>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="bento-label block">Direct Contact / WhatsApp</span>
                    <a href="tel:+918355882124" className="font-extrabold text-lg text-slate-900 dark:text-white hover:text-red-600 transition-colors block">
                      +91 8355882124
                    </a>
                    <div className="mt-2 flex items-center space-x-2">
                      <a
                        href="tel:+918355882124"
                        className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center space-x-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Now</span>
                      </a>
                      <a
                        href="https://wa.me/918355882124?text=Hi%20Md%20Amzad%20Khan%2C%20I%20would%20like%20to%20inquire%20about%20a%20loan%20consultation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp Now</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="bento-label block">Official Email</span>
                    <a href="mailto:amzadkhan369@gmail.com" className="font-bold text-slate-900 dark:text-white hover:text-red-600 transition-colors">
                      amzadkhan369@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="bento-label block">Office Location</span>
                    <p className="font-bold text-slate-900 dark:text-white leading-relaxed">
                      Imampur, Bhagalpur, Bihar, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="bento-label block">Advisory Working Hours</span>
                    <p className="font-bold text-slate-900 dark:text-white">
                      Monday - Saturday: 9:00 AM - 7:00 PM IST
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Trust Assurance Banner */}
            <div className="bento-card p-5 bg-gradient-to-r from-red-600 to-red-700 text-white border-red-600 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>100% Confidentiality & Zero Hidden Fees</span>
              </div>
              <p className="text-xs text-red-100 leading-relaxed">
                Your financial information is completely private and processed directly with RBI-regulated lending institutions.
              </p>
            </div>

          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <div className="bento-card p-6 sm:p-8">
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Talk to Expert Advisor
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                Fill out your requirement and Md Amzad Khan will personally review and contact you within 15 minutes.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Consultation Request Received!
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you <span className="font-bold text-slate-900 dark:text-white">{formData.fullName}</span>. Md Amzad Khan from Amzad Consultancy Hub & Advisory will reach out to <span className="font-bold">{formData.email}</span> / <span className="font-bold">{formData.phone}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        serviceType: 'Personal Loan',
                        amountNeeded: '500000',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-900 dark:bg-[#0a0b0d] text-white hover:bg-slate-800"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="bento-label block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="bento-label block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="bento-label block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 8355882124"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="bento-label block mb-1.5">
                        Interested Service
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-sm focus:border-blue-500 focus:outline-none"
                      >
                        <option value="Personal Loan">Personal Loan (@ 9.99%)</option>
                        <option value="Home Loan">Home Loan (@ 7.50%)</option>
                        <option value="Business Loan">Business Loan (@ 10.50%)</option>
                        <option value="Health Insurance">Health Insurance</option>
                        <option value="Life Insurance">Term Life Insurance</option>
                        <option value="Property Investment">Property Advisory</option>
                        <option value="Wealth Portfolio">Wealth Management</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="bento-label block mb-1.5">
                      Required Loan / Capital Amount (₹)
                    </label>
                    <input
                      type="number"
                      min="10000"
                      value={formData.amountNeeded}
                      onChange={(e) => setFormData({ ...formData, amountNeeded: e.target.value })}
                      placeholder="e.g. 500000"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="bento-label block mb-1.5">
                      Specific Requirements or Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention preferred callback time, income details, or specific queries..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#262930] bg-slate-50 dark:bg-[#0a0b0d] text-slate-900 dark:text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/30 text-base flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Connecting Advisor...</span>
                    ) : (
                      <>
                        <span>Talk to Expert</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


