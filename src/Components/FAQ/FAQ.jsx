import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return document.documentElement.getAttribute('data-theme') === 'dark' || 
           document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    const updateTheme = () => {
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark' || 
                         document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    };

    // Initial sync on mount
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    window.addEventListener('storage', updateTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', updateTheme);
    };
  }, []);

  const faqs = [
    {
      question: 'How do I adopt a pet through PawMart?',
      answer: 'Browse our pet listings, select a pet you like, and click "View Details" to see more information. Contact the seller directly through the platform to arrange a meeting and complete the adoption process.'
    },
    {
      question: 'Is PawMart free to use?',
      answer: 'Yes! PawMart is completely free for both pet seekers and sellers. You can browse, list pets, and connect with other users without any charges.'
    },
    {
      question: 'How do I list my pet for adoption?',
      answer: 'Simply create an account, click on "Add Listing" in the navigation menu, fill in your pet\'s details, upload photos, and submit. Your listing will be visible to all users immediately.'
    },
    {
      question: 'Are the pet listings verified?',
      answer: 'We encourage all users to provide accurate information. While we monitor listings for suspicious activity, we recommend meeting sellers in person and verifying all details before completing an adoption.'
    },
    {
      question: 'Can I return a pet after adoption?',
      answer: 'Adoption policies vary by seller. We recommend discussing return policies with the seller before finalizing the adoption. PawMart facilitates connections but does not handle transactions directly.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'Payment arrangements are made directly between buyers and sellers. We recommend using secure payment methods and completing transactions in person when possible.'
    },
    {
      question: 'How do I contact a seller?',
      answer: 'Once you create an account and view a pet\'s details page, you\'ll find contact information and messaging options to connect with the seller directly.'
    },
    {
      question: 'Can I search for specific pet breeds?',
      answer: 'Yes! Use our advanced search filters on the Explore Pets page to filter by category, breed, location, price range, and other criteria to find exactly what you\'re looking for.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-padding  flex justify-center">
      <div className="container-custom max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-2"
            style={isDark ? { color: '#ffffff' } : { color: '#000000' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Got questions? We've got answers!
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden bg-transparent dark:bg-black shadow-sm hover:shadow-md transition"
              style={isDark ? { backgroundColor: '#000' } : { backgroundColor: 'transparent' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <span className="font-semibold text-neutral-900 dark:text-white text-lg md:text-xl">
                  {faq.question}
                </span>
                <motion.svg
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  className="w-5 h-5 text-neutral-500 flex-shrink-0 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
