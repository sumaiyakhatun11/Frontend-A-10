import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTA = () => {
    return (
        <section className="section-padding bg-gradient-to-r from-[#af6723] via-[#af6760] to-[#af6723] text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 text-9xl">🐾</div>
                <div className="absolute bottom-10 right-10 text-9xl">❤️</div>
                <div className="absolute top-1/2 left-1/4 text-7xl">🐕</div>
                <div className="absolute top-1/3 right-1/4 text-7xl">🐱</div>
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">
                            Ready to Find Your Perfect Pet?
                        </h2>
                        <p className="text-xl md:text-2xl mb-8 text-white/90">
                            Join thousands of happy pet parents. Start your journey today!
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/services"
                                className="px-8 py-4 bg-white text-secondary rounded-lg font-bold text-lg hover:bg-neutral-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
                            >
                                🔍 Browse Pets
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link
                                to="/addServices"
                                className="px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-orange-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
                            >
                                ➕ List Your Pet
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div>
                                <div className="text-3xl font-bold mb-1">2500+</div>
                                <div className="text-sm text-white/80">Happy Pets</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-1">1800+</div>
                                <div className="text-sm text-white/80">Families</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-1">95%</div>
                                <div className="text-sm text-white/80">Success Rate</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
