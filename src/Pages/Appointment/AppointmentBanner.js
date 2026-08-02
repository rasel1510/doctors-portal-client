import React from 'react';
import chair from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Card } from '@/components/ui/card';
import { Calendar as CalendarIcon, Sparkles } from 'lucide-react';

const AppointmentBanner = ({ date, setDate }) => {
  return (
    <section className="relative overflow-hidden py-12 lg:py-16">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-sky-200/30 to-cyan-100/20 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-sky-500" />
            <span>Select Your Preferred Date</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Schedule Your Doctor Appointment
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Choose a date below to view available time slots for medical and dental consultations.
          </p>
        </div>

        {/* Calendar + Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* DayPicker Card */}
          <div className="lg:col-span-6 flex justify-center">
            <Card className="p-6 border-slate-200/80 shadow-xl bg-white/90 backdrop-blur-md rounded-2xl">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100 text-slate-800 font-bold text-sm">
                <CalendarIcon className="h-5 w-5 text-sky-500" />
                <span>Appointment Date Picker</span>
              </div>
              <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={{ before: new Date() }}
                className="mx-auto text-slate-800"
              />
            </Card>
          </div>

          {/* Chair Image Banner */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-sky-500 to-cyan-400 opacity-20 blur-xl" />
              <img
                src={chair}
                alt="Clinic Chair"
                className="relative rounded-3xl shadow-2xl border border-white/60 object-cover w-full"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AppointmentBanner;
