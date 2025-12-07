import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white text-[#0f0f0f] py-8">
            <div className="max-w-5xl mx-auto px-4 flex flex-col items-center text-center">

                {/* Logo */}
                <img
                    src={logo}
                    alt="PawMart Logo"
                    className="h-12 mb-3"
                />

                {/* Site Name */}
                <h2 className="text-2xl font-bold mb-2 text-[#5b2501]">PawMart</h2>

                {/* Short Description */}
                <p className="max-w-md text-sm mb-5">
                    PawMart connects local pet owners and buyers for adoption and pet care products.
                </p>

                {/* Useful Links */}
                <nav className="flex gap-6 mb-5">
                    <a href="/" className="hover:underline">Home</a>
                    <a
                        href="https://www.linkedin.com/in/sumaiya-khatun-753537300/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Contact
                    </a>
                    <Link to="/terms" className="hover:underline">Terms</Link>
                </nav>

                {/* Copyright */}
                <p className="text-xs">
                    © {new Date().getFullYear()} PawMart. All rights reserved.
                </p>

            </div>
        </footer>
    );
};

export default Footer;
