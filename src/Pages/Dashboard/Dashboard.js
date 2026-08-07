import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import {
  Calendar, History as HistoryIcon, Users, UserPlus, Stethoscope,
  ShieldAlert, LayoutDashboard, Receipt, User, FileText, ChevronRight,
  Menu, X, CreditCard, ClipboardList
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const patientLinks = [
    { name: 'My Appointments', path: '/dashboard', icon: Calendar },
    { name: 'Appointment History', path: '/dashboard/history', icon: HistoryIcon },
    { name: 'My Invoices', path: '/dashboard/invoices', icon: Receipt },
    { name: 'My Profile', path: '/dashboard/profile', icon: User },
  ];

  const adminLinks = [
    { name: 'Overview', path: '/dashboard/overview', icon: LayoutDashboard },
    { name: 'All Bookings', path: '/dashboard/allbookings', icon: ClipboardList },
    { name: 'Billing Management', path: '/dashboard/billing', icon: CreditCard },
    { name: 'Manage Doctors', path: '/dashboard/manageDoctor', icon: Stethoscope },
    { name: 'Add Doctor', path: '/dashboard/addDoctor', icon: UserPlus },
    { name: 'Manage Patients', path: '/dashboard/patients', icon: FileText },
    { name: 'All Users', path: '/dashboard/users', icon: Users },
  ];

  const NavLink = ({ link }) => {
    const Icon = link.icon;
    const active = isActive(link.path);
    return (
      <Link
        to={link.path}
        onClick={() => setMobileSidebarOpen(false)}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group"
        style={{
          background: active ? '#0D9488' : 'transparent',
          color: active ? 'white' : '#475569',
        }}
        onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#F0FDFA'; e.currentTarget.style.color = '#0D9488'; } }}
        onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; } }}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1">{link.name}</span>
        {active && <ChevronRight className="h-3.5 w-3.5 opacity-70" />}
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* User Profile */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 shadow-sm" style={{ borderColor: '#0D9488' }}>
            <AvatarImage src={user?.photoURL} alt={user?.displayName || user?.email} />
            <AvatarFallback className="text-white font-bold text-sm" style={{ background: '#0D9488' }}>
              {(user?.displayName || user?.email || 'U').charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="truncate flex-1">
            <h3 className="text-sm font-bold text-slate-900 truncate" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {user?.displayName || user?.email?.split('@')[0]}
            </h3>
            <p className="text-xs text-slate-500 truncate mb-1.5">{user?.email}</p>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
              style={admin
                ? { background: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D' }
                : { background: '#CCFBF1', color: '#065F46', border: '1px solid #6EE7B7' }
              }>
              {admin ? <ShieldAlert className="h-3 w-3" /> : <User className="h-3 w-3" />}
              {admin ? 'Admin' : 'Patient'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Patient Menu */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-2">Patient Portal</p>
          <div className="space-y-0.5">
            {patientLinks.map(link => <NavLink key={link.path} link={link} />)}
          </div>
        </div>

        {/* Admin Menu */}
        {admin && (
          <div className="pt-2">
            <div className="flex items-center justify-between px-2 mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600">Admin Panel</p>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: '#F59E0B' }}>PRO</span>
            </div>
            <div className="space-y-0.5">
              {adminLinks.map(link => <NavLink key={link.path} link={link} />)}
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100">
        <Link to="/" className="flex items-center gap-2 text-xs text-slate-500 hover:text-teal-600 transition-colors">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#0D9488' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2v20M2 12h20"/>
            </svg>
          </div>
          <span className="font-semibold">MediCare Pro</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-[85vh] bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden mb-4 flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm"
          >
            {mobileSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            {mobileSidebarOpen ? 'Close Menu' : 'Dashboard Menu'}
          </button>
          {admin && (
            <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ background: '#F59E0B' }}>
              Admin Mode
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Sidebar — Desktop always visible, mobile toggleable */}
          <aside className={`lg:col-span-3 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden ${mobileSidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <SidebarContent />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 bg-white border border-slate-200/80 rounded-2xl shadow-sm min-h-[500px] p-6 sm:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;