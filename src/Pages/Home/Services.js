import React from 'react';
import fluoride from '../../assets/images/fluoride.png';
import cavityFilling from '../../assets/images/cavity.png';
import teathWhitening from '../../assets/images/whitening.png';
import Service from './Service';
import Babysection from './Babysection';

const Services = () => {
  const services = [
    {
      _id: 1,
      name: "Fluoride Treatment",
      description: "Fluoride is a mineral that rebuilds enamel and protects your teeth against decay. Essential preventative dental treatment for all ages.",
      img: fluoride
    },
    {
      _id: 2,
      name: "Cavity Filling",
      description: "High-grade aesthetic tooth-colored fillings that restore function and natural appearance to decayed or damaged teeth seamlessly.",
      img: cavityFilling
    },
    {
      _id: 3,
      name: "Teeth Whitening",
      description: "Professional laser whitening treatment that brightens your smile up to 8 shades in a single safe, comfortable session.",
      img: teathWhitening
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
      {/* Section Header */}
      <div className="text-center space-y-2 mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
          Our Specializations
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Services We Provide
        </h2>
        <div className="h-1 w-16 bg-sky-500 mx-auto rounded-full mt-3"></div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <Service key={service._id} service={service} />
        ))}
      </div>

      {/* Exceptional Care Section */}
      <div className="mt-24">
        <Babysection />
      </div>
    </section>
  );
};

export default Services;