import React from 'react';
import quote from '../../assets/icons/quote.svg'

const Textimonials = () => {
    return (
       <section className='my-16'>
        <div className='flex justify-between'>
            <div>
                <h1 className='text-primary text-xl font-bold'>Testimonials</h1>
                <h3 className='text-3xl'>What Our Patients Says !</h3>
            </div>
            <div>
                <img src={quote} alt="" />
            </div>
        </div>
        <div>

        </div>
       </section>
    );
};

export default Textimonials;