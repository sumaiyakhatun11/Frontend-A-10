import React, { useEffect } from 'react';
import Banner from '../../Components/Banner/Banner';
import Popular from '../../Components/Popular/Popular';
import CategoryCardSection from '../../Components/CategoryCardSection/CategoryCardSection';
import WhyAdopt from '../../Components/WhyAdopt/WhyAdopt';
import PetHeroes from '../../Components/PetHeroes/PetHeroes';
import Features from '../../Components/Features/Features';
import Statistics from '../../Components/Statistics/Statistics';
import Testimonials from '../../Components/Testimonials/Testimonials';
import FAQ from '../../Components/FAQ/FAQ';
import CTA from '../../Components/CTA/CTA';
import Newsletter from '../../Components/NewsLetter/Newsletter';

const Home = () => {
    useEffect(() => {
        document.title = "Home | PawMart - Find Your Perfect Pet";
    }, []);

    return (
        <div className="min-h-screen space-y-16">
            {/* Hero/Banner Section - 60-70% screen height */}
            <section className="container-custom py-8">
                <Banner />
            </section>

            {/* Category Cards Section */}
           <section className='container mt-16'>
             <CategoryCardSection />
           </section>

            {/* Features Section */}
            <Features />

            {/* Popular Pets Section */}
            <Popular />

            {/* Statistics Section */}
            <Statistics />

            {/* Why Adopt Section */}
            <WhyAdopt />

            {/* Pet Heroes Section */}
            <PetHeroes />

            {/* Testimonials Section */}
            <Testimonials />

            {/* FAQ Section */}
            <FAQ />

            {/* Newsletter Section */}
            <Newsletter />

            {/* CTA Section */}
            <CTA />
        </div>
    );
};

export default Home;