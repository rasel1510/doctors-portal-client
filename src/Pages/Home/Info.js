import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../assets/icons/clock.svg'
import marker from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg';

const Info = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 px-5'>
            <InfoCard cardTitle="Opening Hours" bgcolor="bg-gradient-to-r from-secondary to-primary" img={clock}/>
            <InfoCard bgcolor="bg-accent" cardTitle="Visit Our Location" img={marker}/>
            <InfoCard bgcolor="bg-gradient-to-r from-secondary to-primary"  cardTitle="Contact Us" img={phone}/>
        </div>
    );
};

export default Info;
