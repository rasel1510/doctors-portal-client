import React from 'react';
import { ShieldCheck, Clock, CreditCard, Headphones, FileText, UserCheck } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'BMDC Certified Doctors',
    desc: 'All our doctors are certified by the Bangladesh Medical & Dental Council with verified credentials.',
    color: '#0D9488',
    bg: '#CCFBF1',
  },
  {
    icon: FileText,
    title: 'Digital Health Records',
    desc: 'Access your complete appointment history, prescriptions and invoices anytime from your dashboard.',
    color: '#3B82F6',
    bg: '#DBEAFE',
  },
  {
    icon: CreditCard,
    title: 'Transparent Pricing',
    desc: 'No hidden charges. See consultation fees upfront before booking. Flexible payment options.',
    color: '#8B5CF6',
    bg: '#EDE9FE',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    desc: 'Multiple daily time slots across all departments, 6 days a week. Book at your convenience.',
    color: '#F59E0B',
    bg: '#FEF3C7',
  },
  {
    icon: UserCheck,
    title: 'Experienced Specialists',
    desc: 'Over 10 years of average experience. Multi-specialty expertise for complex health conditions.',
    color: '#EC4899',
    bg: '#FCE7F3',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Our patient support team is available round the clock for queries, follow-ups and emergencies.',
    color: '#EF4444',
    bg: '#FEE2E2',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                style={{ background: '#CCFBF1', color: '#0D9488', border: '1px solid #5EEAD4' }}>
                Why MediCare Pro?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Healthcare You Can{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #0D9488, #3B82F6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Trust
                </span>
              </h2>
              <div className="w-16 h-1 rounded-full mt-4" style={{ background: 'linear-gradient(90deg, #0D9488, #3B82F6)' }} />
            </div>
            <p className="text-slate-600 text-base leading-relaxed">
              We combine medical expertise with modern technology to deliver a seamless healthcare experience. 
              From booking to billing, every step is designed with your comfort in mind.
            </p>

            {/* Key metric bar */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { val: '98%', label: 'Patient Satisfaction' },
                { val: '< 5min', label: 'Avg. Booking Time' },
                { val: '50+', label: 'Expert Doctors' },
              ].map((m, i) => (
                <div key={i} className="text-center p-4 rounded-2xl border border-slate-100 shadow-sm bg-white">
                  <div className="text-2xl font-extrabold" style={{ color: '#0D9488' }}>{m.val}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="card-hover p-5 rounded-2xl border border-slate-100 bg-white shadow-sm group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                    style={{ background: feat.bg }}>
                    <Icon className="h-5 w-5" style={{ color: feat.color }} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;