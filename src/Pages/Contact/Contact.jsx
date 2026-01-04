import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { showToast } from '../../Shared/toast';

const Contact = () => {
    useEffect(() => {
        document.title = "Contact Us | PawMart";
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        setLoading(true);
        
        // Simulate form submission
        setTimeout(() => {
            showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setLoading(false);
        }, 1000);
    };

    const contactInfo = [
        {
            icon: '📍',
            title: 'Visit Us',
            details: ['123 Pet Street', 'Animal City, AC 12345', 'United States'],
            color: 'bg-primary/10 text-primary'
        },
        {
            icon: '📧',
            title: 'Email Us',
            details: ['info@pawmart.com', 'support@pawmart.com'],
            color: 'bg-secondary/10 text-secondary'
        },
        {
            icon: '📞',
            title: 'Call Us',
            details: ['+1 (234) 567-890', 'Mon-Fri: 9AM - 6PM', 'Weekend: 10AM - 4PM'],
            color: 'bg-accent/10 text-accent'
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-orange-900 text-white">
                <div className="container-custom section-padding text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Get in Touch 💬
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
                            Have questions? We'd love to hear from you. Send us a message!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="section-padding bg-neutral-50 dark:bg-neutral-800">
                <div className="container-custom">
                    <div className="grid md:grid-cols-3 gap-8">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="card-standard text-center"
                            >
                                <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-4`}>
                                    {info.icon}
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                                    {info.title}
                                </h3>
                                {info.details.map((detail, i) => (
                                    <p key={i} className="text-neutral-600 dark:text-neutral-400 text-sm">
                                        {detail}
                                    </p>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="section-padding">
                <div className="container-custom max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                            Send Us a Message
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">
                            Fill out the form below and we'll get back to you as soon as possible
                        </p>
                    </div>

                    <div className="card-standard">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="input-standard"
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="input-standard"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    className="input-standard"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us more about your inquiry..."
                                    rows="6"
                                    className="input-standard resize-none"
                                    disabled={loading}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full md:w-auto px-12 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Map Section (Placeholder) */}
            <section className="section-padding bg-neutral-50 dark:bg-neutral-800">
                <div className="container-custom">
                    <div className="card-standard">
                        <div className="bg-neutral-200 dark:bg-neutral-700 h-96 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl mb-4">🗺️</div>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    Map integration placeholder
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
