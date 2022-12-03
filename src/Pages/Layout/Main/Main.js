import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Shere/Footer/Footer';
import Navbar from '../../Shere/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;