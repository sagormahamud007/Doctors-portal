import React from 'react';
import img from '../../assets/images/chair.png'


const Banner = () => {
    return (
        <div className="hero mt-3">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={img} className=" md:w-1/2 rounded-lg shadow-2xl" alt='' />
                <div className='mr-6'>
                    <h1 className="text-5xl font-bold">Your New Smile Starts <br /> Here</h1>
                    <p className="py-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem <br /> Ipsum has been the industry's standard dummy text ever since the</p>
                    <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;