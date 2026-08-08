import React from 'react';

export function AboutMe() {
  return (
    <section
      id="about-me"
      className="py-20 bg-white dark:bg-[#0d0f12]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div>
            <span className="inline-block px-4 py-2 mb-4 rounded-full bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-semibold text-sm">
              About Me
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Meet <span className="text-red-600">Md Amzad Khan</span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 leading-8 mb-5">
              I am Md Amzad Khan, a Loan & Financial Consultant associated
              with Amzad Consultancy Hub & Advisory. I help customers
              understand suitable loan and financial solutions according
              to their requirements.
            </p>

            <p className="text-slate-600 dark:text-slate-300 leading-8 mb-5">
              With experience in loan sales, insurance services and digital
              financial assistance, my focus is to make the process simple,
              transparent and easy to understand for every customer.
            </p>

            <p className="text-slate-600 dark:text-slate-300 leading-8">
              My goal is to provide professional guidance and help customers
              make informed financial decisions without unnecessary
              complications.
            </p>
          </div>

          {/* Right Side */}
          <div className="bg-slate-50 dark:bg-[#15181d] rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Why Work With Me?
            </h3>

            <div className="space-y-5">
              <div>
                <h4 className="font-semibold text-lg text-red-600">
                  Professional Guidance
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Clear guidance based on your financial requirements.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-red-600">
                  Multiple Financial Solutions
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Access to multiple loan and insurance solutions through
                  partner institutions.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-red-600">
                  Simple Process
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Easy digital process with step-by-step assistance.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-red-600">
                  Customer First
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Focused on helping customers understand their available
                  options before making a decision.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
