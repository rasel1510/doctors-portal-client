import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Stethoscope, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { BASE_URL } from '../../config';

const STATUS_CONFIG = {
  pending: { label: 'Pending', className: 'status-pending', icon: AlertCircle },
  visited: { label: 'Visited', className: 'status-visited', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', className: 'status-cancelled', icon: XCircle },
};

const History = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`${BASE_URL}/booking?patient=${user.email}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
        .then(res => {
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem('accessToken');
            navigate('/');
          }
          return res.json();
        })
        .then(data => setAppointments(Array.isArray(data) ? data : []))
        .catch(() => setAppointments([]))
        .finally(() => setLoading(false));
    }
  }, [user, navigate]);

  const visited = appointments.filter(a => a.status === 'visited');
  const cancelled = appointments.filter(a => a.status === 'cancelled');

  if (loading) {
    return <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 skeleton rounded-2xl" />)}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="pb-5 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Appointment History
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">Your complete medical visit record</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Visits', value: appointments.length, color: '#0D9488', bg: '#CCFBF1' },
          { label: 'Completed', value: visited.length, color: '#059669', bg: '#D1FAE5' },
          { label: 'Cancelled', value: cancelled.length, color: '#DC2626', bg: '#FEE2E2' },
        ].map((s, i) => (
          <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-white text-center shadow-sm">
            <div className="text-2xl font-extrabold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs font-medium text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200 bg-slate-50">
          <Calendar className="h-10 w-10 mx-auto mb-3 text-slate-400" />
          <h3 className="text-base font-bold text-slate-700">No History Yet</h3>
          <p className="text-xs text-slate-500 mt-1">Your completed appointments will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-600">All Records ({appointments.length})</h3>
          {[...appointments].reverse().map((a, i) => {
            const status = a.status || 'pending';
            const StatusIcon = STATUS_CONFIG[status]?.icon || AlertCircle;
            return (
              <div key={a._id || i} className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: status === 'visited' ? '#D1FAE5' : status === 'cancelled' ? '#FEE2E2' : '#CCFBF1' }}>
                  <StatusIcon className="h-5 w-5"
                    style={{ color: status === 'visited' ? '#059669' : status === 'cancelled' ? '#DC2626' : '#0D9488' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="text-sm font-bold text-slate-900">{a.treatment}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_CONFIG[status]?.className}`}>
                      {STATUS_CONFIG[status]?.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-teal-500" /> {a.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-blue-500" /> {a.slot}
                    </span>
                    {a.doctorName && (
                      <span className="flex items-center gap-1">
                        <Stethoscope className="h-3.5 w-3.5 text-purple-500" /> Dr. {a.doctorName}
                      </span>
                    )}
                    {a.departmentName && (
                      <span className="text-slate-400">· {a.departmentName}</span>
                    )}
                  </div>
                </div>
                {a.fee && (
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-slate-500">Fee</p>
                    <p className="text-sm font-extrabold" style={{ color: '#0D9488' }}>৳{a.fee}</p>
                    {a.paid && <p className="text-[10px] text-emerald-600 font-semibold">✓ Paid</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;