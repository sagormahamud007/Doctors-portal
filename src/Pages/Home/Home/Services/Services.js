import React from 'react';
import Fluoride from '../../../assets/images/fluoride.png';
import Cavity from '../../../assets/images/cavity.png';
import whitening from '../../../assets/images/whitening.png'
import Service from './Service';
import Terms from './Terms';


const Services = () => {
    const infoService = [
        {
            id: 1,
            name: 'Fluoride Treatment',
            description: 'Open 9.00 am to 5.00 am everyday',
            icon: Fluoride,
        },
        {
            id: 2,
            name: 'Cavity Filling',
            description: 'Open 9.00 am to 5.00 am everyday',
            icon: Cavity,
        },
        {
            id: 3,
            name: 'Teeth Whitening',
            description: 'Open 9.00 am to 5.00 am everyday',
            icon: whitening,
        },
    ]
    return (
        <div className='mt-16'>
            <div className='text-center'>
                <h3 className='font-bold text-xl text-primary'>OUR SERVICES</h3>
                <h1 className='text-5xl text-bold'>Services We Provide</h1>
            </div>
            <div className='grid gap-8 mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    infoService.map(service => <Service
                        key={service.id}
                        service={service}
                    ></Service>)
                }

            </div>
            <div>
                <Terms></Terms>
            </div>
        </div>
    );
};

export default Services;