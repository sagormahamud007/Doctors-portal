import React from 'react';

const InfoCard = ({ card }) => {
    const { name, description, icon, bgClass } = card;
    return (
        <div>
            <div className={`card md:card-side text-white p-2 shadow-xl ${bgClass}`}>
                <figure><img src={icon} alt="" /></figure>
                <div className="card-body text-white">
                    <h2 className="card-title">{name}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;