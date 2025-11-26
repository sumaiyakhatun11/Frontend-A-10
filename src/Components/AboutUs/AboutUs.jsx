import React, { useEffect } from "react";
import { motion } from "framer-motion";

const AboutUs = () => {

    useEffect(() => {
        document.title = "About Us | GameHub";
    }, []);

    return (
        <motion.div
            className="max-w-5xl mx-auto px-6 py-12 text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-4xl font-bold text-center mb-6">
                About <span className="text-blue-400">GameHub</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-6 text-center">
                GameHub is your go-to platform for discovering, exploring, and downloading
                your favorite games. We aim to provide gamers with a smooth, clean and
                interactive experience.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">

                <motion.div
                    className="bg-gray-900 p-6 rounded-xl shadow-lg"
                    whileHover={{ scale: 1.05 }}
                >
                    <h2 className="text-xl font-semibold mb-2 text-blue-400">Our Mission</h2>
                    <p className="text-gray-300">
                        To build a trusted hub for gamers with accurate details, ratings,
                        and verified game downloads.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gray-900 p-6 rounded-xl shadow-lg"
                    whileHover={{ scale: 1.05 }}
                >
                    <h2 className="text-xl font-semibold mb-2 text-blue-400">What We Provide</h2>
                    <p className="text-gray-300">
                        Game reviews, download links, developer details, and high-quality
                        game information — all in one place.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gray-900 p-6 rounded-xl shadow-lg"
                    whileHover={{ scale: 1.05 }}
                >
                    <h2 className="text-xl font-semibold mb-2 text-blue-400">Our Vision</h2>
                    <p className="text-gray-300">
                        To become the largest online game information platform trusted by
                        millions of players worldwide.
                    </p>
                </motion.div>

            </div>

            <div className="mt-12 text-center">
                <motion.button
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Contact Us
                </motion.button>
            </div>
        </motion.div>
    );
};

export default AboutUs;
