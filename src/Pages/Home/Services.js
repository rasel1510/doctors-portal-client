import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DEPARTMENTS = [
  { id: 'cardiology', name: 'Cardiology', icon: '❤️', color: '#FEE2E2', border: '#FCA5A5', text: '#DC2626', desc: 'Heart care, ECG, cardiac monitoring' },
  { id: 'orthopedics', name: 'Orthopedics', icon: '🦴', color: '#FEF3C7', border: '#FCD34D', text: '#D97706', desc: 'Bone, joint & spine treatment' },
  { id: 'dermatology', name: 'Dermatology', icon: '🌿', color: '#EDE9FE', border: '#C4B5FD', text: '#7C3AED', desc: 'Skin, hair & nail disorders' },
  { id: 'neurology', name: 'Neurology', icon: '🧠', color: '#CFFAFE', border: '#67E8F9', text: '#0891B2', desc: 'Brain, nerve & EEG studies' },
  { id: 'pediatrics', name: 'Pediatrics', icon: '👶', color: '#D1FAE5', border: '#6EE7B7', text: '#059669', desc: 'Child health & vaccination' },
  { id: 'gynecology', name: 'Gynecology', icon: '🌸', color: '#FCE7F3', border: '#F9A8D4', text: '#BE185D', desc: 'Women\'s health & prenatal care' },
  { id: 'ent', name: 'ENT', icon: '👂', color: '#FFF7ED', border: '#FED7AA', text: '#EA580C', desc: 'Ear, nose & throat treatments' },
  { id: 'ophthalmology', name: 'Ophthalmology', icon: '👁️', color: '#DBEAFE', border: '#93C5FD', text: '#2563EB', desc: 'Eye exams & vision correction' },
  { id: 'general', name: 'General Medicine', icon: '🩺', color: '#CCFBF1', border: '#5EEAD4', text: '#0D9488', desc: 'General OPD & health checkup' },
];

const Departments = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-14">
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border"
          style={{ background: '#CCFBF1', color: '#0D9488', borderColor: '#5EEAD4' }}>
          Our Medical Departments
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          9 Specialised{' '}
          <span style={{
            background: 'linear-gradient(135deg, #0D9488, #0891B2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Departments</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto text-base">
          World-class care under one roof. Choose from our comprehensive range of medical specialties and book your appointment today.
        </p>
        <div className="w-16 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #0D9488, #0891B2)' }} />
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
        {DEPARTMENTS.map((dept, index) => (
          <Link
            to={`/appointment?dept=${dept.id}`}
            key={dept.id}
            className="group relative dept-card-hover rounded-2xl p-6 border-2 cursor-pointer block"
            style={{
              background: dept.color,
              borderColor: 'transparent',
              animationDelay: `${index * 60}ms`,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = dept.border; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; }}
          >
            {/* Icon */}
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {dept.icon}
            </div>

            {/* Content */}
            <h3 className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {dept.name}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">{dept.desc}</p>

            {/* CTA */}
            <div className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
              style={{ color: dept.text }}>
              <span>Book Now</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Decorative circle */}
            <div className="absolute top-3 right-3 w-12 h-12 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
              style={{ background: dept.border }} />
          </Link>
        ))}
      </div>

      {/* View All */}
      <div className="text-center mt-10">
        <Link to="/departments">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border-2 transition-all hover:scale-105"
            style={{ borderColor: '#0D9488', color: '#0D9488', background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0D9488'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0D9488'; }}>
            View All Departments
            <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Departments;