import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white">
                <Stethoscope className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white">
                Doctors<span className="text-sky-400">Portal</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Providing world-class healthcare scheduling and medical management with compassion, innovation, and trust.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="h-4 w-4 text-sky-400" />
              <span>123 Medical Center Way, Suite 400</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-sky-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sky-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/appointment" className="hover:text-sky-400 transition-colors">Book Appointment</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-sky-400 transition-colors">Patient Login</Link>
              </li>
            </ul>
          </div>

          {/* Medical Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Our Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Fluoride Treatment</li>
              <li>Cavity Filling & Protection</li>
              <li>Teeth Whitening & Hygiene</li>
              <li>General Health Consultation</li>
              <li>Pediatric Care</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Support</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-sky-400" />
                <span>+1 (800) 555-DOCTOR</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sky-400" />
                <span>support@doctorsportal.com</span>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-sky-400 text-xs font-medium">
                  Available 24/7 Emergency
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DoctorsPortal Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> for better health.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;