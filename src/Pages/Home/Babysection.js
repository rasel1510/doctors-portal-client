import React from 'react';
import Baby from '../../assets/images/treatment.png'

const Babysection = () => {
    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row">
                <img src={Baby}className="max-w-sm rounded-lg shadow-2xl" alt=''/>
                <div className='pl-5'>
                    <h1 className="text-5xl font-bold">Excentional Dental <br></br> Care On Your Terms <span className='text-orange-500'>!</span></h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn text-white btn-primary uppercase">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Babysection;