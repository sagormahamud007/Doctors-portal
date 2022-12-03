import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const booking = useLoaderData()
    const { appointmentDate, treatment, price, slot } = booking;
    return (
        <div>
            <h3 className='text-3xl'>Payment for {treatment}</h3>
            <h3 className='text-xl'>Please pay $<strong>{price}</strong> for your appointment on {appointmentDate} at {slot}</h3>
        </div>
    );
};

export default Payment;