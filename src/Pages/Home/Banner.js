import React from 'react';
import { Link } from 'react-router-dom';
import chair from '../../assets/images/chair.png';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, ShieldCheck, Star } from 'lucide-react';

const Banner = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Decorative background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-sky-200/40 via-cyan-100/30 to-indigo-100/20 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-semibold shadow-sm">
              <ShieldCheck className="h-4 w-4 text-sky-500" />
              <span>Certified Healthcare Experts & Easy Online Booking</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Your New Smile <br className="hidden sm:inline" />
              Starts <span className="bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">Right Here</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Book appointments with top-rated medical specialists in seconds. High-quality care, zero waiting time, and personalized medical attention tailored to your family's needs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/appointment">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base shadow-lg shadow-sky-500/25">
                  <Calendar className="h-5 w-5" />
                  Book Appointment Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                  Learn About Us
                </Button>
              </Link>
            </div>

            {/* Quick stats/trust indicator */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 border-t border-slate-200/80 text-slate-600">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
                <span className="text-xs font-semibold text-slate-700 ml-1">4.9/5 Rating</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-medium text-slate-600">10,000+ Happy Patients</span>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-sky-500 to-cyan-400 opacity-20 blur-2xl transform rotate-3" />
              <img
                src={chair}
                alt="Dental Clinic Chair"
                className="relative rounded-3xl shadow-2xl border border-white/60 object-cover w-full transform hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;