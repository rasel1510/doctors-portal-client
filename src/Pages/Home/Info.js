import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../assets/icons/clock.svg';
import marker from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg';

const Info = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard
          cardTitle="Opening Hours"
          cardSub="Mon - Sat: 9:00 AM - 8:00 PM"
          bgClass="bg-gradient-to-r from-sky-500 to-cyan-500"
          img={clock}
        />
        <InfoCard
          cardTitle="Visit Our Location"
          cardSub="123 Medical Center Way, NY 10001"
          bgClass="bg-slate-900"
          img={marker}
        />
        <InfoCard
          cardTitle="Contact Us Now"
          cardSub="+1 (800) 555-DOCTOR"
          bgClass="bg-gradient-to-r from-cyan-500 to-indigo-500"
          img={phone}
        />
      </div>
    </section>
  );
};

export default Info;
