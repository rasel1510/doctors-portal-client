import  React from 'react';
import chair from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';



const AppointmentBanner = ({date, setDate}) => {


    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="max-w-lg rounded-lg shadow-2xl" alt='PIc' />
                <div className="pr-14">
                    <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    />
                   {/* <p>You have selected {format(date, 'PP')}</p> */}
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;