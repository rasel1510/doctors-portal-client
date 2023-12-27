import React from 'react';
import Banner from './Banner';
import Info from './Info';
import Services from './Services';
import MakeAppointment from './MakeAppointment';
import Textimonials from './Textimonials';
import Footer from '../Shared/Footer';


const Home = () => {
    return (
        <div>
          
            <Banner/>
            <Info/>
            <Services/>
           <MakeAppointment></MakeAppointment>
           <Textimonials/>
           <Footer/>
        </div>
    );
};

export default Home;