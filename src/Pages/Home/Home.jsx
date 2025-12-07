import React, { useEffect } from 'react';
import Banner from '../../Components/Banner/Banner';
import PopularGame from '../../Components/Popular/Popular';
import Navbar from '../../Components/Navbar/Navbar';


import Popular from '../../Components/Popular/Popular';
import CategoryCardSection from '../../Components/CategoryCardSection/CategoryCardSection';
import WhyAdopt from '../../Components/WhyAdopt/WhyAdopt';
import PetHeroes from '../../Components/PetHeroes/PetHeroes';

const Home = () => {
    useEffect(() => {
        document.title = "Home | Game Hub";
    }, []);
    return (
        <div>

            <Banner></Banner>
            <CategoryCardSection></CategoryCardSection>
            <Popular></Popular>
            <PetHeroes></PetHeroes>
            <WhyAdopt></WhyAdopt>





        </div>
    );
};

export default Home;