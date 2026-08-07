import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import {
  LogOut, LogIn, Menu, X, LayoutDashboard,
  Calendar, Info, Home, Phone, Stethoscope,
  User, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logout = () => {
    signOut(auth);
    localStorage.removeItem('accessToken');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;
  const isOnDashboard = location.pathname.startsWith('/dashboard');

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Departments', path: '/departments', icon: Activity },
    { name: 'Doctors', path: '/doctors', icon: Stethoscope },
    { name: 'Appointment', path: '/appointment', icon: Calendar },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-[68px] items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-white shadow-md shadow-teal-500/25 group-hover:scale-105 transition-transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M2 12h20"/>
              <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" opacity="0.2"/>
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              <span style={{ color: '#0D9488' }}>Medi</span>
              <span className="text-slate-900">Care</span>
              <span className="text-xs font-bold text-teal-500 ml-1 bg-teal-50 px-1.5 py-0.5 rounded-full border border-teal-200">Pro</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400 tracking-wide">Doctor Chamber System</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive(link.path)
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {link.name}
              </Link>
            );
          })}
          {user && (
            <Link
              to="/dashboard"
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                isOnDashboard
                  ? 'bg-teal-50 text-teal-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+8801234567890"
            className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-teal-600 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>+880 123 456 7890</span>
          </a>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
                <Avatar className="h-7 w-7 border border-teal-300">
                  <AvatarImage src={user.photoURL} alt={user.displayName || user.email} />
                  <AvatarFallback className="text-white text-xs font-bold" style={{ background: '#0D9488' }}>
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                  {user.displayName || user.email.split('@')[0]}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-1.5 border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-xs h-8"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-1.5 text-sm">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/singup">
                <Button size="sm" className="gap-1.5 text-sm font-semibold" style={{ background: '#0D9488' }}>
                  <User className="h-4 w-4" />
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          {user && (
            <Avatar className="h-8 w-8 border border-teal-300">
              <AvatarImage src={user.photoURL} />
              <AvatarFallback className="text-white text-xs font-bold" style={{ background: '#0D9488' }}>
                {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pb-6 shadow-lg animate-fade-in">
          <div className="pt-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
            {user && (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isOnDashboard ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl">
                  <Avatar className="h-9 w-9 border border-teal-300">
                    <AvatarImage src={user.photoURL} />
                    <AvatarFallback className="text-white text-sm font-bold" style={{ background: '#0D9488' }}>
                      {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="truncate">
                    <p className="text-sm font-semibold text-slate-900 truncate">{user.displayName || 'Patient'}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/singup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full justify-center gap-2" style={{ background: '#0D9488' }}>
                    <User className="h-4 w-4" />
                    Register Free
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;