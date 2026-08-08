import React, { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'अपना CIBIL Score कैसे बढ़ाएं? 7 आसान तरीके',
    category: 'CIBIL Score',
    excerpt:
      'अगर आपका CIBIL Score कम है तो इन आसान और practical तरीकों से आप अपना credit score बेहतर कर सकते हैं।',
    content: [
      'CIBIL Score आपकी credit history और repayment behaviour को दर्शाता है। अच्छा CIBIL Score loan और credit card approval में मदद कर सकता है।',
      '1. EMI और credit card bill हमेशा समय पर भरें। Late payment आपके credit score को नुकसान पहुंचा सकता है।',
      '2. Credit card की पूरी limit का लगातार इस्तेमाल न करें। कोशिश करें कि credit utilisation कम रहे।',
      '3. एक साथ बहुत सारे loan या credit card के लिए आवेदन करने से बचें।',
      '4. पुराने अच्छे credit accounts को बिना जरूरत बंद न करें।',
      '5. अपनी credit report में किसी गलती की जांच करें और गलत जानकारी होने पर dispute करें।',
      '6. Loan की EMI समय पर भरते रहें और unnecessary loan enquiries से बचें।',
      '7. Credit card का जिम्मेदारी से इस्तेमाल करें और संभव हो तो पूरा outstanding समय पर चुका दें।'
    ]
  },
  {
    id: 2,
    title: 'PMEGP Loan क्या है? जानिए Eligibility और Loan Process',
    category: 'Government Loan',
    excerpt:
      'PMEGP के जरिए नया business शुरू करने के लिए financial assistance कैसे मिल सकती है? आसान भाषा में समझिए।',
    content: [
      'PMEGP यानी Prime Minister Employment Generation Programme एक government-supported scheme है जिसका उद्देश्य नए micro enterprises और employment generation को बढ़ावा देना है।',
      'इस तरह के loan में project cost, applicant eligibility और applicable subsidy scheme के नियमों के अनुसार तय होती है।',
      'आवेदन करने से पहले अपनी eligibility, project report और जरूरी documents तैयार रखें।',
      'Business plan और project report जितनी स्पष्ट होगी, application process को समझना उतना आसान होगा।',
      'सरकारी योजनाओं की eligibility और subsidy rules समय के साथ बदल सकते हैं, इसलिए आवेदन से पहले official guidelines जरूर verify करें।'
    ]
  },
  {
    id: 3,
    title: 'Credit Card का सही इस्तेमाल कैसे करें?',
    category: 'Credit Card',
    excerpt:
      'Credit card को सही तरीके से इस्तेमाल करने पर आप अपने credit profile को बेहतर रख सकते हैं और unnecessary charges से बच सकते हैं।',
    content: [
      'Credit card एक convenient payment facility है, लेकिन इसका इस्तेमाल planning के साथ करना जरूरी है।',
      'सबसे जरूरी बात है कि bill की due date miss न करें। Late payment से charges और credit profile पर negative impact हो सकता है।',
      'अपनी credit limit को जरूरत के अनुसार इस्तेमाल करें और unnecessary spending से बचें।',
      'जहां संभव हो, outstanding amount को समय पर पूरा pay करें ताकि interest charges से बचने में मदद मिले।',
      'Cash withdrawal और unnecessary EMI conversion का इस्तेमाल सोच-समझकर करें।',
      'Credit card लेने से पहले annual fee, interest rate, late payment charges और अन्य terms जरूर पढ़ें।'
    ]
  }
];

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleEligibility = () => {
    const section = document.querySelector('#contact');

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="blog"
      className="py-20 bg-slate-50 dark:bg-[#0a0b0d]"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 mb-4 rounded-full bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-semibold text-sm">
            Financial Knowledge
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Finance & Loan <span className="text-red-600">Blog</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-7">
            Loan, CIBIL Score, Credit Card और Government Schemes से जुड़ी
            आसान और उपयोगी जानकारी हिंदी में।
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-[#15181d] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >

              <div className="h-2 bg-red-600"></div>

              <div className="p-7">

                <span className="inline-block px-3 py-1 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold mb-4">
                  {post.category}
                </span>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 leading-7">
                  {post.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-6 mb-6">
                  {post.excerpt}
                </p>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-red-600 dark:text-red-400 font-bold text-sm hover:underline"
                >
                  Read More →
                </button>

              </div>
            </article>
          ))}

        </div>

        {/* Lead Generation Box */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-red-600 to-red-700 p-8 md:p-10 text-white text-center shadow-xl">

          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Loan या Financial Guidance चाहिए?
          </h3>

          <p className="text-red-100 max-w-2xl mx-auto mb-6">
            अपनी requirement बताएं। हमारी team आपकी जरूरत के अनुसार
            available financial options समझने में आपकी मदद करेगी।
          </p>

          <button
            onClick={handleEligibility}
            className="px-7 py-3 rounded-xl bg-white text-red-600 font-bold hover:bg-slate-100 transition-colors shadow-md"
          >
            Check Eligibility
          </button>

        </div>

      </div>

      {/* Article Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          ></div>

          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#15181d] rounded-3xl shadow-2xl">

            <div className="sticky top-0 bg-white dark:bg-[#15181d] border-b border-slate-200 dark:border-slate-800 p-5 flex items-center justify-between">

              <span className="text-sm font-bold text-red-600">
                {selectedPost.category}
              </span>

              <button
                onClick={() => setSelectedPost(null)}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white font-bold"
              >
                ✕
              </button>

            </div>

            <div className="p-7 md:p-10">

              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-7">
                {selectedPost.title}
              </h2>

              <div className="space-y-5">
                {selectedPost.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-slate-600 dark:text-slate-300 leading-8"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-7 border-t border-slate-200 dark:border-slate-800">

                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Personalised loan या financial guidance के लिए हमसे संपर्क करें।
                </p>

                <button
                  onClick={() => {
                    setSelectedPost(null);
                    handleEligibility();
                  }}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-colors"
                >
                  Check Eligibility
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
