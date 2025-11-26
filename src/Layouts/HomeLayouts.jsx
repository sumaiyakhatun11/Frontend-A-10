import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Banner from '../Components/Banner/Banner';
import PopularGame from '../Components/PopularGame/PopularGame';

const HomeLayouts = () => {
    return (
        <div>

            <Navbar />
            <Outlet />

        </div>
    );
};

export default HomeLayouts;