import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Calendar, Star, History as HistoryIcon, Users, UserPlus, Stethoscope, ShieldAlert } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const userLinks = [
    { name: 'My Appointments', path: '/dashboard', icon: Calendar },
    { name: 'My Review', path: '/dashboard/review', icon: Star },
    { name: 'My History', path: '/dashboard/history', icon: HistoryIcon },
  ];

  const adminLinks = [
    { name: 'All Users', path: '/dashboard/users', icon: Users },
    { name: 'Add Doctor', path: '/dashboard/addDoctor', icon: UserPlus },
    { name: 'Manage Doctors', path: '/dashboard/manageDoctor', icon: Stethoscope },
  ];

  return (
    <div className="min-h-[85vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar */}
        <aside className="lg:col-span-3 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-6">
          
          {/* User Profile Summary */}
          <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
            <Avatar className="h-11 w-11 border-2 border-sky-400 shadow-sm">
              <AvatarImage src={user?.photoURL} alt={user?.displayName || user?.email} />
              <AvatarFallback className="bg-sky-500 text-white font-bold">
                {(user?.displayName || user?.email || 'U').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="truncate flex-1">
              <h3 className="text-sm font-bold text-slate-900 truncate">
                {user?.displayName || user?.email?.split('@')[0]}
              </h3>
              <p className="text-xs text-slate-500 truncate mb-1">{user?.email}</p>
              {admin ? (
                <Badge variant="default" className="text-[10px] px-2 py-0">
                  <ShieldAlert className="h-3 w-3 mr-1 text-sky-200" /> Admin Access
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px] px-2 py-0">
                  Patient Portal
                </Badge>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-6">
            {/* Patient Menu */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 px-2">
                Patient Menu
              </p>
              <div className="space-y-1">
                {userLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive(link.path)
                          ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Admin Management Menu */}
            {admin && (
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-sky-600 mb-2.5 px-2 flex items-center justify-between">
                  <span>Admin Panel</span>
                  <Badge variant="outline" className="text-[9px] text-sky-600 border-sky-200">PRO</Badge>
                </p>
                <div className="space-y-1">
                  {adminLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          isActive(link.path)
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </nav>
        </aside>

        {/* Dashboard Main Content Area */}
        <main className="lg:col-span-9 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm min-h-[500px]">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Dashboard;