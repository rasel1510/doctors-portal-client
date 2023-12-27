import React from 'react';
import fluoride from '../../assets/images/fluoride.png';
import cavityFilling from '../../assets/images/cavity.png';
import teathWhitening from '../../assets/images/whitening.png';
import Service from './Service';
import Babysection from './Babysection';
const Services = () => {
    const services=[
        {
            _id:1,
            name:"Fluoride Treatment",
            description:"Fluoride is a mineral that occurs naturally in many foods and water. Every day, minerals are added to and lost from a tooth's enamel layer through two processes, demineralization and remineralization.",
            img:fluoride
        },
        {
            _id:2,
            name:"Cavity Filling ",
            description:"You should expect to be at your dentist's office for around an hour. This gives him or her enough time to take x-rays if needed, talk to you about the procedure and complete the dental work. Before filling cavities.",
            img:cavityFilling  
        },
        {
            _id:3,
            name:"Teath Whitening",
            description:" Everyone notices a bright, white, glowing smile. And everyone notices how confident you feel when you have that beautiful smile. That’s why we utilize long-lasting Teeth Whitening procedure .",
            img:teathWhitening  
        },
    ]

    return (
        <div className='my-28 pl-10'>
            <div className='text-center '>
                <h1 className='text-primary text-xl  font-bold uppercase'>Our Services</h1>
                <h2 className='text-4xl'>Services We Provide</h2>
            </div>
            <div className='grid my-12 grid-cols-1 lg:grid-cols-3 gap-6'>
                {
                    services.map(service =><Service
                    key={service._id}
                    service={service}
                    ></Service>)
                }
            </div>
            <Babysection/>
        </div>
    );
};

export default Services;