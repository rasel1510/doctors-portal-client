import React from 'react';
import { Link } from 'react-router-dom';
import doctor from '../../assets/images/doctor.png';
import appointment from '../../assets/images/appointment.png';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

const MakeAppointment = () => {
  return (
    <section
      style={{
        background: `linear-gradient(to right, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.88)), url(${appointment})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="my-28 rounded-3xl overflow-hidden shadow-2xl relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 lg:py-0 flex flex-col lg:flex-row items-center gap-10">
        
        {/* Doctor Image (hidden on mobile, overflowing on desktop) */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            className="mt-[-110px] mb-[-40px] max-h-[580px] w-auto mx-auto object-contain filter drop-shadow-2xl"
            src={doctor}
            alt="Doctor"
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 text-white text-center lg:text-left py-6 lg:py-16">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/90 border border-sky-800 px-3.5 py-1.5 rounded-full inline-block">
            Instant Scheduling
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Make An Appointment <br /> Today
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
            Skip the long phone queues and waiting rooms. Select your preferred date and specialist online, and manage all your healthcare appointments seamlessly in your patient portal dashboard.
          </p>

          <div>
            <Link to="/appointment">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold gap-2 text-base">
                <Calendar className="h-5 w-5" />
                Book Your Appointment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MakeAppointment;