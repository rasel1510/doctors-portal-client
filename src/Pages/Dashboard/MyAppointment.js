import React, { useEffect, useState, useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Stethoscope, Receipt, Trash2, AlertCircle, CheckCircle2, XCircle, User } from 'lucide-react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';

const STATUS_CONFIG = {
  pending: { label: 'Pending', className: 'status-pending', icon: AlertCircle },
  visited: { label: 'Visited', className: 'status-visited', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', className: 'status-cancelled', icon: XCircle },
};

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const fetchBookings = useCallback(() => {
    if (user) {
      setLoading(true);
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

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const handleCancel = (id, treatment) => {
    if (window.confirm(`Cancel appointment for ${treatment}?`)) {
      fetch(`${BASE_URL}/booking/${id}`, {
        method: 'DELETE',
        headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            toast.success('Appointment cancelled successfully.');
            fetchBookings();
          } else {
            toast.error(data.message || 'Failed to cancel.');
          }
        });
    }
  };

  const upcoming = appointments.filter(a => a.status !== 'visited' && a.status !== 'cancelled');
  const past = appointments.filter(a => a.status === 'visited' || a.status === 'cancelled');

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => <div key={i} className="h-24 skeleton rounded-2xl" />)}
      </div>
    );
  }

  const AppointmentCard = ({ a, index, showCancel }) => {
    const status = a.status || 'pending';
    const StatusIcon = STATUS_CONFIG[status]?.icon || AlertCircle;

    return (
      <div className="flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all duration-200">
        {/* Number / Index */}
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0"
          style={{ background: '#0D9488' }}>
          {index + 1}
        </div>

        {/* Main Info */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {a.treatment}
            </h3>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_CONFIG[status]?.className || 'status-pending'}`}>
              <StatusIcon className="h-3 w-3" />
              {STATUS_CONFIG[status]?.label || 'Pending'}
            </span>
            {a.paid && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold status-paid">
                <CheckCircle2 className="h-3 w-3" /> Paid
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" style={{ color: '#0D9488' }} />
              {a.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-blue-500" />
              {a.slot}
            </span>
            {a.doctorName && (
              <span className="flex items-center gap-1.5">
                <Stethoscope className="h-3.5 w-3.5 text-purple-500" />
                Dr. {a.doctorName}
              </span>
            )}
            {a.departmentName && (
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-amber-500" />
                {a.departmentName}
              </span>
            )}
          </div>

          {a.chiefComplaint && (
            <p className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-700">Complaint:</span> {a.chiefComplaint}
            </p>
          )}
        </div>

        {/* Fee + Actions */}
        <div className="flex flex-row sm:flex-col items-center gap-2 flex-shrink-0">
          {a.fee && (
            <div className="text-right">
              <p className="text-xs text-slate-500">Fee</p>
              <p className="text-base font-extrabold" style={{ color: '#0D9488' }}>৳{a.fee}</p>
            </div>
          )}
          {showCancel && a.status !== 'cancelled' && (
            <button
              onClick={() => handleCancel(a._id, a.treatment)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Cancel
            </button>
          )}
          {a.hasInvoice && (
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100">
              <Receipt className="h-3.5 w-3.5" />
              Invoice
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            My Appointments
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage your medical appointment bookings</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: '#CCFBF1', color: '#0D9488', border: '1px solid #5EEAD4' }}>
            Total: {appointments.length}
          </span>
          <Link to="/appointment">
            <button className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-105"
              style={{ background: '#0D9488' }}>
              + New Appointment
            </button>
          </Link>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-slate-200 bg-slate-50">
          <Calendar className="h-12 w-12 mx-auto mb-3" style={{ color: '#0D9488', opacity: 0.4 }} />
          <h3 className="text-base font-bold text-slate-800">No Appointments Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Book your first appointment with one of our 50+ specialized doctors.
          </p>
          <Link to="/appointment">
            <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: '#0D9488' }}>
              Book Appointment
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Upcoming Appointments ({upcoming.length})
              </h3>
              {upcoming.map((a, i) => (
                <AppointmentCard key={a._id || i} a={a} index={i} showCancel={true} />
              ))}
            </div>
          )}

          {/* Past */}
          {past.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                Past Appointments ({past.length})
              </h3>
              {past.map((a, i) => (
                <AppointmentCard key={a._id || i} a={a} index={i} showCancel={false} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyAppointment;