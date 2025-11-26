import React, { useEffect } from 'react';
import Banner from '../../Components/Banner/Banner';
import PopularGame from '../../Components/PopularGame/PopularGame';
import Navbar from '../../Components/Navbar/Navbar';
import NewsletterSection from '../../Components/NewsLetter/NewsLetter';
import Footer from '../../Components/Footer/Footer';

const Home = () => {
    useEffect(() => {
        document.title = "Home | Game Hub";
    }, []);
    return (
        <div>

            <Banner></Banner>
            <PopularGame></PopularGame>
            <NewsletterSection></NewsletterSection>
            <Footer></Footer>
        </div>
    );
};

export default Home;