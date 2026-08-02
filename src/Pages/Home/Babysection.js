import React from 'react';
import { Link } from 'react-router-dom';
import Baby from '../../assets/images/treatment.png';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Calendar } from 'lucide-react';

const Babysection = () => {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden relative">
      {/* Background glow overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Image */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <img
              src={Baby}
              className="rounded-2xl shadow-2xl border border-white/10 object-cover w-full"
              alt="Exceptional Dental Care"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800 px-3.5 py-1.5 rounded-full">
            Patient-Centered Care
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Exceptional Dental Care, <br /> On Your Terms
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            We prioritize your comfort and time. Our modern facility combines cutting-edge dental technology with gentle, patient-first care to deliver healthier, brighter smiles without stress.
          </p>

          {/* Key Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              "State-of-the-art Technology",
              "Gentle & Painless Procedures",
              "Flexible Appointment Hours",
              "Personalized Treatment Plans"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link to="/appointment">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold gap-2">
                <Calendar className="h-4 w-4" />
                Get Started Today
              </Button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Babysection;