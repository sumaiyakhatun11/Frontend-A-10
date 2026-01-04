import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = () => {
    useEffect(() => {
        document.title = "About Us | PawMart";
    }, []);

    const team = [
        {
            name: 'Sarah Johnson',
            role: 'Founder & CEO',
            image: 'https://randomuser.me/api/portraits/women/10.jpg',
            bio: 'Animal lover with 10+ years in pet care industry'
        },
        {
            name: 'Michael Chen',
            role: 'Head of Operations',
            image: 'https://randomuser.me/api/portraits/men/11.jpg',
            bio: 'Expert in marketplace platforms and logistics'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Community Manager',
            image: 'https://randomuser.me/api/portraits/women/12.jpg',
            bio: 'Passionate about connecting pet lovers worldwide'
        },
        {
            name: 'David Thompson',
            role: 'Tech Lead',
            image: 'https://randomuser.me/api/portraits/men/13.jpg',
            bio: 'Building secure and user-friendly platforms'
        }
    ];

    const values = [
        {
            icon: '❤️',
            title: 'Animal Welfare',
            description: 'We prioritize the health, safety, and happiness of every pet on our platform.'
        },
        {
            icon: '🤝',
            title: 'Community First',
            description: 'Building a supportive community of responsible pet owners and lovers.'
        },
        {
            icon: '✨',
            title: 'Transparency',
            description: 'Honest listings, verified information, and clear communication always.'
        },
        {
            icon: '🌍',
            title: 'Sustainability',
            description: 'Promoting adoption over shopping and eco-friendly pet care practices.'
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
                            About PawMart
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
                            Connecting loving homes with adorable companions since 2020
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="section-padding bg-neutral-50 dark:bg-neutral-800">
                <div className="container-custom max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                            Our Mission
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            At PawMart, we believe every pet deserves a loving home and every home deserves the joy of a furry companion. Our mission is to make pet adoption and care accessible, safe, and joyful for everyone.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="card-standard">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                                Our Vision
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                To create a world where every pet finds a loving home and every pet owner has access to quality care and supplies.
                            </p>
                        </div>
                        <div className="card-standard">
                            <div className="text-4xl mb-4">💪</div>
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                                What We Do
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                We provide a trusted platform for pet adoption, sales, and supplies, connecting thousands of pet lovers across the community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="card-standard text-center"
                            >
                                <div className="text-5xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section-padding bg-neutral-50 dark:bg-neutral-800">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">2500+</div>
                            <div className="text-neutral-600 dark:text-neutral-400">Pets Rehomed</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1800+</div>
                            <div className="text-neutral-600 dark:text-neutral-400">Happy Families</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                            <div className="text-neutral-600 dark:text-neutral-400">Products</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">95%</div>
                            <div className="text-neutral-600 dark:text-neutral-400">Success Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">
                            Passionate people working to make a difference
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="card-standard text-center"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                                />
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-primary font-semibold mb-2">{member.role}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {member.bio}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-r from-secondary to-blue-600 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Join Our Community?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
                        Start your journey with PawMart today and help us make a difference in the lives of pets and their families.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/services" className="px-8 py-4 bg-white text-secondary rounded-lg font-bold hover:bg-neutral-100 transition-all duration-300 shadow-lg hover:scale-105">
                            Browse Pets
                        </Link>
                        <Link to="/addServices" className="px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-orange-800 transition-all duration-300 shadow-lg hover:scale-105">
                            List Your Pet
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
