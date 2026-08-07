import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Card } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, Phone, ShieldCheck } from 'lucide-react';

const AppointmentBanner = ({ date, setDate }) => {
  return (
    <section className="relative overflow-hidden py-12 lg:py-14"
      style={{ background: 'linear-gradient(135deg, #F0FDFA 0%, #ECFEFF 50%, #EFF6FF 100%)' }}>
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-0"
        style={{ background: 'rgba(13,148,136,0.08)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none -z-0"
        style={{ background: 'rgba(59,130,246,0.06)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{ background: '#CCFBF1', color: '#0D9488', border: '1px solid #5EEAD4' }}>
            Book an Appointment
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Schedule Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0D9488, #0891B2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Doctor Consultation</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm">
            Select a date, choose your department, pick a specialist and book your slot in minutes.
          </p>
        </div>

        {/* Calendar + Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Calendar Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <Card className="p-6 shadow-xl bg-white rounded-3xl border border-slate-100 w-full max-w-sm">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#CCFBF1' }}>
                  <CalendarIcon className="h-4 w-4" style={{ color: '#0D9488' }} />
                </div>
                <span className="text-sm font-bold text-slate-900">Select Appointment Date</span>
              </div>

              <style>{`
                .rdp-day_selected {
                  background-color: #0D9488 !important;
                  color: white !important;
                  border-radius: 10px !important;
                }
                .rdp-day:hover:not(.rdp-day_selected):not(.rdp-day_disabled) {
                  background-color: #CCFBF1 !important;
                  border-radius: 10px !important;
                }
                .rdp-day_today:not(.rdp-day_selected) {
                  color: #0D9488 !important;
                  font-weight: 800 !important;
                  border: 2px solid #0D9488 !important;
                  border-radius: 10px !important;
                }
                .rdp-caption_label, .rdp-nav_button { color: #0F172A !important; }
              `}</style>

              <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={{ before: new Date() }}
                className="mx-auto text-slate-800 text-sm"
              />

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <CalendarIcon className="h-3.5 w-3.5 text-teal-500" />
                <span>Appointments available Sunday–Friday</span>
              </div>
            </Card>
          </div>

          {/* Right: Info cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Selected date card */}
            <div className="sm:col-span-2 p-5 rounded-2xl border"
              style={{ background: 'linear-gradient(135deg, #0D9488, #0891B2)', borderColor: 'transparent' }}>
              <p className="text-teal-100 text-xs font-semibold mb-1">Selected Date</p>
              <p className="text-white text-xl font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {date ? date.toLocaleDateString('en-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a date'}
              </p>
              <p className="text-teal-200 text-xs mt-1">Scroll down to choose your department and book a slot</p>
            </div>

            {/* Info cards */}
            {[
              { icon: Clock, title: 'Operating Hours', desc: 'Saturday – Thursday: 8 AM – 8 PM\nFriday: 2 PM – 8 PM', color: '#0D9488', bg: '#CCFBF1' },
              { icon: ShieldCheck, title: 'Certified Specialists', desc: 'All doctors are BMDC registered and verified. Your health is in safe hands.', color: '#3B82F6', bg: '#DBEAFE' },
              { icon: Phone, title: 'Need Help?', desc: 'Call us at +880 123 456 7890\nWe\'re here to help you book.', color: '#EC4899', bg: '#FCE7F3' },
              { icon: CalendarIcon, title: 'Easy Rebooking', desc: 'Cancel or reschedule from your dashboard anytime before your visit.', color: '#F59E0B', bg: '#FEF3C7' },
            ].map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: info.bg }}>
                    <Icon className="h-4 w-4" style={{ color: info.color }} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {info.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line">{info.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBanner;
