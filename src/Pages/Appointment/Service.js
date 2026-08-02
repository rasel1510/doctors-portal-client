 import React from 'react';

const Service = ({service, setTreatment}) => {
    const {name, slots,price}=service;
    return (
        <div className="card lg:max-w-lg  shadow-xl">
           
            <div className="card-body text-black items-center text-center">
                <h2 className="text-secondary text-xl font-semibold">{name}</h2>
                
                <p>{slots.length} {slots.length>1 ?'spaces':'space '} Available</p>
                <p><small>Price: {price}</small></p>
            
                    <label 
                    for="booking-modal" 
                    className="btn bg-gradient-to-r from-secondary to-primary text-white"
                    onClick={()=>setTreatment(service)}
                    >Book Appointment</label>
          
            </div>
        </div>
    );
};

export default Service; 


