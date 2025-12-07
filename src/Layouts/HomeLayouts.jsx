import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Banner from '../Components/Banner/Banner';
import PopularGame from '../Components/Popular/Popular';
import Footer from '../Components/Footer/Footer';

const HomeLayouts = () => {
    return (
        <div >

            <Navbar />
            <Outlet />
            <Footer></Footer>

        </div>
    );
};

export default HomeLayouts;