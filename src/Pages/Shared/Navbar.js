import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import { Stethoscope, LogOut, LogIn, Menu, X, LayoutDashboard, Calendar, Info, PhoneCall, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const logout = () => {
    signOut(auth);
    localStorage.removeItem('accessToken');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Appointment', path: '/appointment', icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Stethoscope className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-sky-900 to-slate-800 bg-clip-text text-transparent">
            Doctors<span className="text-sky-500">Portal</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive(link.path)
                    ? 'bg-sky-50 text-sky-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                location.pathname.startsWith('/dashboard')
                  ? 'bg-sky-50 text-sky-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/60">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user.photoURL} alt={user.displayName || user.email} />
                  <AvatarFallback className="bg-sky-500 text-white text-xs">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-semibold text-slate-700 max-w-[120px] truncate">
                  {user.displayName || user.email.split('@')[0]}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-1.5 border-slate-200 text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm" className="gap-1.5">
                <LogIn className="h-3.5 w-3.5" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-sky-50 text-sky-600 font-semibold'
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
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          )}

          <div className="pt-4 border-t border-slate-100">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-3 py-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL} />
                    <AvatarFallback className="bg-sky-500 text-white">
                      {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-slate-900">{user.displayName}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="w-full justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;