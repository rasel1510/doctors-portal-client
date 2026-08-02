import React from 'react';
import { FaHospitalUser, FaUserMd, FaCalendarCheck } from "react-icons/fa";
import aboutImg from '../../assets/images/chair.png';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


const About = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="default" className="text-xs px-3.5 py-1">
          About Doctors Portal
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Dedicated To Healthier, Brighter Smiles Every Day
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Our portal bridges the gap between top-tier medical specialists and patients, providing seamless scheduling and compassionate healthcare management.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image Showcase */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500 to-cyan-400 opacity-20 blur-2xl rounded-3xl" />
          <img
            src={aboutImg}
            alt="About Doctors Portal"
            className="relative rounded-3xl shadow-2xl border border-white/60 object-cover w-full"
          />
        </div>

        {/* Feature Cards Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Our Core Philosophy</span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Healthcare Built Around You
            </h2>
          </div>

          <div className="space-y-4">
            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                  <FaHospitalUser className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Patient-Centered Portal</h3>
                  <p className="text-xs text-slate-500">Simple, intuitive booking experience from any device.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                  <FaUserMd className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Verified Specialists</h3>
                  <p className="text-xs text-slate-500">Connect with highly qualified doctors and specialists.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <FaCalendarCheck className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Real-Time Scheduling</h3>
                  <p className="text-xs text-slate-500">Instant appointment confirmation without waiting in line.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Link to="/appointment">
              <Button size="lg" className="gap-2">
                Book Consultation Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-slate-900 text-white text-center">
        <div>
          <h3 className="text-3xl font-extrabold text-sky-400">15+</h3>
          <p className="text-xs text-slate-400 mt-1">Specialist Doctors</p>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-sky-400">10k+</h3>
          <p className="text-xs text-slate-400 mt-1">Happy Patients</p>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-sky-400">99.8%</h3>
          <p className="text-xs text-slate-400 mt-1">Satisfaction Rate</p>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-sky-400">24/7</h3>
          <p className="text-xs text-slate-400 mt-1">Emergency Service</p>
        </div>
      </div>
    </div>
  );
};

export default About;
