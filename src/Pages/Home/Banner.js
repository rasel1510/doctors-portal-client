import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ShieldCheck, Star, Phone, Clock, Users, Award } from 'lucide-react';

const Banner = () => {
  const stats = [
    { value: '50+', label: 'Expert Doctors', icon: '👨‍⚕️' },
    { value: '9', label: 'Departments', icon: '🏥' },
    { value: '10K+', label: 'Happy Patients', icon: '😊' },
    { value: '4.9★', label: 'Average Rating', icon: '⭐' },
  ];

  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0D4F47 50%, #0D9488 100%)' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 dot-pattern" style={{ opacity: 0.08 }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(13,148,136,0.2)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(59,130,246,0.15)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border"
              style={{ background: 'rgba(13,148,136,0.2)', borderColor: 'rgba(13,148,136,0.4)', color: '#5EEAD4' }}>
              <ShieldCheck className="h-4 w-4" />
              <span>Certified Healthcare Professionals</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Expert Medical Care,{' '}
              <br className="hidden sm:inline" />
              <span style={{
                background: 'linear-gradient(135deg, #5EEAD4 0%, #67E8F9 50%, #93C5FD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                One Click Away
              </span>
            </h1>

            <p className="text-lg text-teal-100/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Book appointments with top-rated specialists across 9 departments. Transparent fees, digital records, and care you can trust — right in your neighbourhood.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/appointment">
                <button className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white text-base shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-teal-500/40"
                  style={{ background: 'linear-gradient(135deg, #0D9488, #0891B2)' }}>
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/departments">
                <button className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-base border border-white/20 hover:bg-white/10 transition-all duration-300">
                  View Departments
                </button>
              </Link>
            </div>

            {/* Quick contact */}
            <div className="flex items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2 text-teal-200/80 text-sm">
                <Phone className="h-4 w-4" />
                <span>Emergency: +880 123 456 7890</span>
              </div>
              <span className="text-teal-700">|</span>
              <div className="flex items-center gap-2 text-teal-200/80 text-sm">
                <Clock className="h-4 w-4" />
                <span>8:00 AM – 8:00 PM Daily</span>
              </div>
            </div>
          </div>

          {/* Right — Stats Cards */}
          <div className="hidden lg:block relative animate-fade-up delay-200">
            {/* Main card */}
            <div className="glass-dark rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg, #0D9488, #0891B2)' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 12h20"/>
                    <rect x="7" y="7" width="10" height="10" rx="2" fill="white" opacity="0.2"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">MediCare Pro</h3>
                <p className="text-teal-300 text-sm mt-1">Your Trusted Health Partner</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl text-center border border-white/10 hover:border-teal-400/30 transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-xl font-extrabold text-white">{stat.value}</div>
                    <div className="text-xs text-teal-300/80 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Availability indicator */}
              <div className="mt-6 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl"
                style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 text-sm font-semibold">Accepting appointments today</span>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 shadow-lg border border-white/60 animate-float">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-slate-900">4.9 / 5 Stars</span>
              </div>
              <p className="text-xs text-slate-500">2,400+ Reviews</p>
            </div>

            <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-4 py-3 shadow-lg border border-white/60 animate-float delay-300">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-teal-500" />
                <span className="text-sm font-bold text-slate-900">10,000+ Patients</span>
              </div>
              <p className="text-xs text-slate-500">Served Successfully</p>
            </div>
          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-teal-200/70">
            {[
              { icon: ShieldCheck, text: 'BMDC Certified Doctors' },
              { icon: Award, text: 'ISO 9001:2015 Certified' },
              { icon: Clock, text: '6-Day Availability' },
              { icon: Users, text: 'Multi-Specialty Chamber' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-teal-400" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;