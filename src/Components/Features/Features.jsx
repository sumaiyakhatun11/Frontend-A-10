import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
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
        <section className="section-padding">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                        Why Choose Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                        Everything You Need
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        PawMart provides the best platform for pet adoption and supplies with features designed for your convenience
                    </p>
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
                            className="card-standard group hover:scale-105"
                        >
                            <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
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
