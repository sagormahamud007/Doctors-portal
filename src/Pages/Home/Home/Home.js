import React from 'react';
import Banner from '../Banner/Banner';
import InfoCards from '../infoCards/InfoCards';
import Testimonial from '../Testimonial/Testimonial';
import MakeAppointment from './MakeAppointment/MakeAppointment';
import Services from './Services/Services';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <MakeAppointment></MakeAppointment>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;