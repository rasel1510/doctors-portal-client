import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, Globe, Share2, MessageSquare, Send } from 'lucide-react';

const Footer = () => {
  const departments = [
    'Cardiology', 'Orthopedics', 'Dermatology',
    'Neurology', 'Pediatrics', 'Gynecology',
    'ENT', 'Ophthalmology', 'General Medicine',
  ];

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Departments', to: '/departments' },
    { label: 'Our Doctors', to: '/doctors' },
    { label: 'Book Appointment', to: '/appointment' },
    { label: 'About Us', to: '/about' },
    { label: 'Patient Login', to: '/login' },
    { label: 'Patient Register', to: '/singup' },
  ];

  return (
    <footer style={{ background: '#0F172A' }} className="text-slate-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md"
                style={{ background: 'linear-gradient(135deg, #0D9488, #0891B2)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20"/>
                  <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" opacity="0.2"/>
                </svg>
              </div>
              <div>
                <span className="text-lg font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  <span style={{ color: '#0D9488' }}>Medi</span>Care Pro
                </span>
                <p className="text-xs text-slate-500">Doctor Chamber System</p>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              A professional multi-specialty doctor chamber providing compassionate, transparent, and technology-enabled healthcare to our community.
            </p>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                <span>123 Healthcare Avenue, Dhaka 1200, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="h-4 w-4 text-teal-500 flex-shrink-0" />
                <span>+880 123 456 7890</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="h-4 w-4 text-teal-500 flex-shrink-0" />
                <span>info@medicarepro.health</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[Globe, Share2, MessageSquare, Send].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-700 hover:border-teal-500 hover:text-teal-400 transition-all text-slate-400"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-teal-600 group-hover:bg-teal-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Departments</h4>
            <ul className="space-y-2.5">
              {departments.map((dept, i) => (
                <li key={i}>
                  <Link
                    to="/departments"
                    className="text-sm text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-teal-600 group-hover:bg-teal-400 transition-colors" />
                    {dept}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Emergency */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Opening Hours</h4>
            <div className="space-y-3">
              {[
                { day: 'Saturday – Thursday', hours: '8:00 AM – 8:00 PM' },
                { day: 'Friday', hours: '2:00 PM – 8:00 PM' },
              ].map((h, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-slate-400">{h.day}</span>
                  <span className="text-teal-400 font-semibold">{h.hours}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-2xl border border-red-500/30" style={{ background: 'rgba(239,68,68,0.08)' }}>
              <p className="text-xs font-bold text-red-400 mb-1">🚨 Emergency Hotline</p>
              <p className="text-lg font-extrabold text-white">+880 999 000 111</p>
              <p className="text-xs text-slate-400 mt-1">Available 24 hours, 7 days a week</p>
            </div>

            <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.3)' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-teal-300 font-semibold">Currently Accepting Appointments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MediCare Pro. All rights reserved. BMDC Registered Chamber.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> for better healthcare.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;