import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rashida Khanam',
    condition: 'Treated for Diabetes (General Medicine)',
    review: 'MediCare Pro completely transformed how I manage my health. The booking process was effortless, Dr. Rahim was incredibly thorough, and I got my digital prescription instantly. I no longer dread doctor visits!',
    rating: 5,
    initials: 'RK',
    color: '#0D9488',
  },
  {
    name: 'Mizanur Rahman',
    condition: 'Knee Surgery Consultation (Orthopedics)',
    review: 'I was skeptical about a small chamber having such expertise, but Dr. Karim\'s knowledge and care exceeded every expectation. The entire process from booking to billing was completely transparent. Highly recommended!',
    rating: 5,
    initials: 'MR',
    color: '#3B82F6',
  },
  {
    name: 'Nasrin Sultana',
    condition: 'Prenatal Care (Gynecology)',
    review: 'Throughout my pregnancy, MediCare Pro was my trusted partner. Dr. Nusrat\'s prenatal consultations were thorough and reassuring. The appointment reminders and digital records made everything so convenient.',
    rating: 5,
    initials: 'NS',
    color: '#EC4899',
  },
];

const Testimonials = () => {
  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0D4F47 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(13,148,136,0.2)', color: '#5EEAD4', border: '1px solid rgba(94,234,212,0.3)' }}>
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            What Our{' '}
            <span style={{
              background: 'linear-gradient(135deg, #5EEAD4, #93C5FD)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Patients Say</span>
          </h2>
          <p className="text-teal-200/70 max-w-lg mx-auto">
            Real experiences from real patients who trust MediCare Pro for their healthcare needs.
          </p>
          <div className="w-16 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #5EEAD4, #93C5FD)' }} />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative p-7 rounded-2xl border transition-all hover:-translate-y-1 duration-300"
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 opacity-20">
                <Quote className="h-10 w-10 text-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(t.rating).fill(0).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review */}
              <p className="text-teal-100/90 text-sm leading-relaxed mb-6 italic">
                "{t.review}"
              </p>

              {/* Patient Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                  style={{ background: t.color }}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-teal-300/70">{t.condition}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          {[
            { value: '10,000+', label: 'Satisfied Patients' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '98%', label: 'Would Recommend' },
            { value: '5 Years', label: 'In Service' },
          ].map((s, i) => (
            <div key={i} className="text-center px-6 py-3 rounded-2xl border border-white/10"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-2xl font-extrabold text-white">{s.value}</div>
              <div className="text-xs text-teal-300/70 font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;