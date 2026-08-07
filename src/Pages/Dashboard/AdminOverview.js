import React from 'react';
import { useQuery } from 'react-query';
import { Users, Stethoscope, Calendar, DollarSign, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { BASE_URL } from '../../config';

const AdminOverview = () => {
  const { data: stats, isLoading } = useQuery('adminStats', () =>
    fetch(`${BASE_URL}/stats`, {
      headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    }).then((r) => r.json())
  );

  if (isLoading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-28 skeleton rounded-2xl" />)}</div>;
  }

  const statCards = [
    { label: 'Total Patients', value: stats?.totalPatients || 0, icon: Users, color: '#0D9488', bg: '#CCFBF1' },
    { label: 'Active Doctors', value: stats?.totalDoctors || 0, icon: Stethoscope, color: '#3B82F6', bg: '#DBEAFE' },
    { label: "Today's Appointments", value: stats?.todayBookings || 0, icon: Calendar, color: '#F59E0B', bg: '#FEF3C7' },
    { label: 'Total Revenue', value: `৳${stats?.totalRevenue || 0}`, icon: DollarSign, color: '#10B981', bg: '#D1FAE5' },
  ];

  const appointmentStats = [
    { label: 'Pending', value: stats?.pendingBookings || 0, icon: Clock, color: '#F59E0B', bg: '#FEF3C7' },
    { label: 'Visited', value: stats?.visitedBookings || 0, icon: CheckCircle2, color: '#10B981', bg: '#D1FAE5' },
    { label: 'Cancelled', value: stats?.cancelledBookings || 0, icon: XCircle, color: '#EF4444', bg: '#FEE2E2' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-5 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Admin Dashboard Overview
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">Real-time statistics & chamber management analytics</p>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">{card.label}</span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                  <Icon className="h-5 w-5" style={{ color: card.color }} />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Breakdown */}
      <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
        <h3 className="text-sm font-bold text-slate-800 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Appointment Status Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {appointmentStats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: st.bg }}>
                  <Icon className="h-5 w-5" style={{ color: st.color }} />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">{st.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{st.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Recent Bookings
        </h3>
        {stats?.recentBookings?.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-3.5">Patient</th>
                  <th className="p-3.5">Treatment</th>
                  <th className="p-3.5">Date & Slot</th>
                  <th className="p-3.5">Fee</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {stats.recentBookings.map((b, i) => (
                  <tr key={b._id || i} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-bold text-slate-900">{b.patientName || b.patient}</td>
                    <td className="p-3.5 font-medium text-slate-700">{b.treatment}</td>
                    <td className="p-3.5 text-slate-500">{b.date} · {b.slot}</td>
                    <td className="p-3.5 font-bold text-teal-700">৳{b.fee || 500}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'visited' ? 'status-visited' : b.status === 'cancelled' ? 'status-cancelled' : 'status-pending'
                      }`}>
                        {b.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-400">No recent bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOverview;
