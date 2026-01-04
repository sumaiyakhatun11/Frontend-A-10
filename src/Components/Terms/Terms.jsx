import React from 'react';

const Terms = () => {
    return (
        <div className="min-h-screen">
            <div className="container-custom section-padding\">\n            <div className="max-w-5xl mx-auto text-neutral-900 dark:text-white\">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Terms & Conditions</h1>

            <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                Welcome to PawMart! These Terms & Conditions outline the rules and regulations for the use of our website.
                By accessing this website, we assume you accept these terms in full. Do not continue to use PawMart if you
                do not accept all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2 text-primary">1. Intellectual Property Rights</h2>
            <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                Unless otherwise stated, PawMart and/or its licensors own the intellectual property rights for all material
                on the website. All intellectual property rights are reserved. You may view and/or print pages for your
                personal use, subject to restrictions set in these terms.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2 text-primary">2. User Responsibilities</h2>
            <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                Users must not use the website for any illegal or unauthorized purpose. You must not, in the use of this
                website, violate any laws in your jurisdiction (including but not limited to copyright laws).
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2 text-primary">3. Product Information</h2>
            <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                PawMart provides information about pets, adoption, and pet care products. We strive to ensure accuracy, but
                we do not guarantee that all information is complete or up-to-date. Prices and availability may change
                without notice.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2 text-primary">4. Limitation of Liability</h2>
            <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                PawMart will not be liable for any damages arising from the use of this website or services provided.
                Users access and use this website at their own risk.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2 text-primary">5. Changes to Terms</h2>
            <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                PawMart reserves the right to revise these Terms & Conditions at any time. By using this website, you agree
                to be bound by the latest version of the Terms & Conditions.
            </p>

            <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                © {new Date().getFullYear()} PawMart. All rights reserved.
            </p>
            </div>
            </div>
        </div>
    );
};

export default Terms;
