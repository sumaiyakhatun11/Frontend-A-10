import React, { useEffect } from 'react';
import Banner from '../../Components/Banner/Banner';
import PopularGame from '../../Components/Popular/Popular';
import Navbar from '../../Components/Navbar/Navbar';
import NewsletterSection from '../../Components/NewsLetter/NewsLetter';
import Footer from '../../Components/Footer/Footer';
import Popular from '../../Components/Popular/Popular';

const Home = () => {
    useEffect(() => {
        document.title = "Home | Game Hub";
    }, []);
    return (
        <div>

            <Banner></Banner>
            <Popular></Popular>
            <NewsletterSection></NewsletterSection>
            <Footer></Footer>
        </div>
    );
};

export default Home;