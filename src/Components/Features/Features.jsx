import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Features = () => {
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage first, then fall back to document attribute
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

    const features = [
        {
            icon: '🏠',
            title: 'Find Your Perfect Match',
            description: 'Browse through hundreds of adorable pets waiting for their forever home',
            color: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
            icon: '✅',
            title: 'Verified Listings',
            description: 'All pet listings are verified to ensure safety and authenticity',
            color: 'bg-green-50 dark:bg-green-900/20'
        },
        {
            icon: '💬',
            title: 'Direct Communication',
            description: 'Connect directly with pet owners and sellers instantly',
            color: 'bg-purple-50 dark:bg-purple-900/20'
        },
        {
            icon: '🛡️',
            title: 'Safe & Secure',
            description: 'Your data and transactions are protected with top-level security',
            color: 'bg-red-50 dark:bg-red-900/20'
        },
        {
            icon: '📱',
            title: 'Mobile Friendly',
            description: 'Access PawMart anytime, anywhere from any device',
            color: 'bg-yellow-50 dark:bg-yellow-900/20'
        },
        {
            icon: '🎯',
            title: 'Smart Filters',
            description: 'Find exactly what you\'re looking for with advanced search options',
            color: 'bg-indigo-50 dark:bg-indigo-900/20'
        }
    ];

    return (
        <section className="w-full lg:w-11/12 mx-auto mb-20 ">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                        Why Choose Us
                    </span>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4"
                        style={isDark ? { color: '#ffffff' } : { color: '#000000' }}
                    >
                        Everything You Need
                    </h2>
                
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                       <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="
        card-standard group hover:scale-105
        bg-transparent dark:bg-black
        border border-neutral-200 dark:border-neutral-700
        rounded-xl p-6 shadow-sm
    "
    style={isDark ? { backgroundColor: '#000', borderColor: '#404040', color: '#fff' } : { backgroundColor: 'transparent' }}
>
    <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
        {feature.icon}
    </div>
    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2" style={isDark ? { color: '#fff' } : undefined}>
        {feature.title}
    </h3>
    <p className="text-neutral-600 dark:text-neutral-400">
        {feature.description}
    </p>
</motion.div>

                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
