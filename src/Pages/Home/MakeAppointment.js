import React from 'react';
import doctor from '../../assets/images/doctor.png';
import appointment from   '../../assets/images/appointment.png';


const MakeAppointment = () => {
    return (
        <section
        style={{
            background:`url(${appointment})`
        }}
        className='flex justify-center items-center'>
            <div className='flex-1'>
                <img className='mt-[-150px]' src={doctor} alt="" />
            </div>
            <div className='flex-1'>
                <h1 className='text-primary xl font-bold my-6'>Appointment</h1>
                <h3 className='text-white 6xl'> Make Appointment Today</h3>
                <p className='text-white'>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <button className="btn uppercase my-6 outline-none border-none text-white bg-gradient-to-r from-secondary to-primary">Get  Started</button>
            </div>
            

        </section>
    );
};

export default MakeAppointment;