import React from 'react';
import { ClipboardList, UserCheck, Calendar, HeartPulse, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Choose Department',
    description: 'Browse our 9 specialized medical departments and select the one that matches your health concern.',
    color: '#0D9488',
    bg: '#CCFBF1',
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Select Your Doctor',
    description: 'View specialist profiles, qualifications, experience, and consultation fees to find your best match.',
    color: '#3B82F6',
    bg: '#DBEAFE',
  },
  {
    number: '03',
    icon: Calendar,
    title: 'Book a Time Slot',
    description: 'Pick a convenient date and available time slot. Instant booking confirmation with zero waiting.',
    color: '#8B5CF6',
    bg: '#EDE9FE',
  },
  {
    number: '04',
    icon: HeartPulse,
    title: 'Get Quality Care',
    description: 'Visit the chamber, get expert treatment, and receive your digital invoice — all in one smooth experience.',
    color: '#EC4899',
    bg: '#FCE7F3',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 overflow-hidden" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{ background: '#CCFBF1', color: '#0D9488', border: '1px solid #5EEAD4' }}>
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            How{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0D9488, #3B82F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>It Works</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Getting quality medical care has never been easier. Follow these simple steps to book your appointment.
          </p>
          <div className="w-16 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #0D9488, #3B82F6)' }} />
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 z-0"
            style={{ background: 'linear-gradient(90deg, #0D9488, #3B82F6, #8B5CF6, #EC4899)' }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center group animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms` }}>
                  {/* Icon circle */}
                  <div className="relative mb-6">
                    <div
                      className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ background: step.bg, border: `2px solid ${step.color}30` }}
                    >
                      <Icon className="h-10 w-10" style={{ color: step.color }} />
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full text-white text-xs font-extrabold flex items-center justify-center shadow-md"
                      style={{ background: step.color }}>
                      {i + 1}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow (mobile) */}
                  {i < steps.length - 1 && (
                    <div className="lg:hidden mt-4 text-slate-300">
                      <ArrowRight className="h-6 w-6 mx-auto rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="/appointment"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base shadow-lg transition-all hover:scale-105 hover:shadow-teal-400/30"
            style={{ background: 'linear-gradient(135deg, #0D9488, #0891B2)' }}
          >
            Start Your Journey to Better Health
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
