import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Statistics = () => {
    const [counts, setCounts] = useState({ pets: 0, adopters: 0, success: 0, supplies: 0 });

    const stats = [
        { label: 'Happy Pets', value: 2500, suffix: '+', icon: '🐾', color: 'text-primary' },
        { label: 'Loving Families', value: 1800, suffix: '+', icon: '❤️', color: 'text-red-500' },
        { label: 'Success Stories', value: 95, suffix: '%', icon: '⭐', color: 'text-yellow-500' },
        { label: 'Pet Supplies', value: 500, suffix: '+', icon: '🛍️', color: 'text-secondary' }
    ];

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        stats.forEach((stat, index) => {
            let current = 0;
            const increment = stat.value / steps;
            const timer = setInterval(() => {
                current += increment;
                if (current >= stat.value) {
                    current = stat.value;
                    clearInterval(timer);
                }
                setCounts(prev => ({
                    ...prev,
                    [index]: Math.floor(current)
                }));
            }, interval);
        });
    }, []);

    return (
        <section className="section-padding bg-gradient-to-br from-primary to-orange-900 text-white relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            {/* CENTERING WRAPPER */}
            <div className="container-custom relative z-10 flex flex-col items-center justify-center text-center">

                {/* Section Header */}
                <div className="text-center mb-12 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-lg text-white/90">
                        Join thousands of happy pet parents who found their perfect companion through PawMart
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center justify-center text-center"
                        >
                            <div className="text-5xl mb-4">{stat.icon}</div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">
                                {counts[index]}{stat.suffix}
                            </div>
                            <div className="text-lg text-white/80">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Statistics;
