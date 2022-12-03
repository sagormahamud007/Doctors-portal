import React from 'react';

const Review = ({ review }) => {
    const { name, location, img, review: Userreview } = review;
    return (
        <div>
            <div className="card shadow-xl">
                <div className="card-body">
                    <p>{Userreview}</p>
                    <div className="flex items-center my-4">
                        <div className="avatar mr-6">
                            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={img} alt='' />
                            </div>
                        </div>
                        <div>
                            <h5 className='text-lg'>{name}</h5>
                            <p>{location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;