import React from 'react';
import Banner from './Banner';
import Services from './Services';
import FeaturedDoctors from './FeaturedDoctors';
import HowItWorks from './HowItWorks';
import MakeAppointment from './MakeAppointment';
import Textimonials from './Textimonials';
import Footer from '../Shared/Footer';

const Home = () => {
  return (
    <div>
      <Banner />
      <Services />
      <HowItWorks />
      <FeaturedDoctors />
      <MakeAppointment />
      <Textimonials />
      <Footer />
    </div>
  );
};

export default Home;