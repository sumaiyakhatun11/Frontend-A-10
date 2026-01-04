import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { showToast } from '../../Shared/toast';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        
        if (!email) {
            showToast('Please enter your email', 'error');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            showToast('Please enter a valid email', 'error');
            return;
        }

        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            showToast('Successfully subscribed to newsletter!', 'success');
            setEmail('');
            setLoading(false);
        }, 1000);
    };

    return (
        <section className="section-padding flex justify-center">
            <div className="container-custom flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full max-w-3xl flex flex-col items-center text-center"
                >
                    <div className="card-standard bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 border-2 border-primary/20 flex flex-col items-center text-center p-8">
                        {/* Icon */}
                        <div className="text-5xl mb-4">📬</div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                            Stay Updated with PawMart
                        </h2>

                        {/* Description */}
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                            Subscribe to our newsletter and get the latest pet listings, adoption tips, and special offers delivered to your inbox.
                        </p>

                        {/* Form */}
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="input-standard flex-1"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Subscribing...' : 'Subscribe Now'}
                            </button>
                        </form>

                        {/* Privacy Note */}
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
