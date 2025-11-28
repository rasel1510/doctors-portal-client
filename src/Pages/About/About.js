import React from 'react';
import { FaHospitalUser, FaUserMd, FaCalendarCheck } from "react-icons/fa";
import aboutImg from '../../assets/images/chair.png';

const About = () => {
  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-secondary mb-10">
          About Our Doctor Portal
        </h1>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <img
              src={aboutImg}
              alt="About Us"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-primary mb-4">
              We Care About Your Health
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Our platform provides seamless appointment booking, trusted doctors,
              and real-time schedule updates for patients.
            </p>

            <div className="space-y-6">

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
                <FaHospitalUser className="text-4xl text-secondary" />
                <div>
                  <h3 className="text-xl font-semibold">Patient-Centered Portal</h3>
                  <p className="text-gray-600">Easy and comfortable booking experience.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
                <FaUserMd className="text-4xl text-primary" />
                <div>
                  <h3 className="text-xl font-semibold">Experienced Doctors</h3>
                  <p className="text-gray-600">Connect with trusted and verified specialists.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
                <FaCalendarCheck className="text-4xl text-green-600" />
                <div>
                  <h3 className="text-xl font-semibold">Easy Appointments</h3>
                  <p className="text-gray-600">Book appointments without waiting in queues.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
