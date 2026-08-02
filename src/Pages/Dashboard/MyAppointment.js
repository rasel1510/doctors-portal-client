import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Stethoscope, CreditCard, CheckCircle2 } from 'lucide-react';

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`https://doctors-portal-server-psi.vercel.app/booking?patient=${user.email}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem('accessToken');
            navigate('/');
          }
          return res.json();
        })
        .then((data) => setAppointments(Array.isArray(data) ? data : []));
    }
  }, [user, navigate]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Appointments</h2>
          <p className="text-xs text-slate-500">
            View and manage your upcoming medical bookings
          </p>
        </div>
        <Badge variant="default" className="w-fit text-xs font-semibold px-3 py-1">
          Total Bookings: {appointments.length}
        </Badge>
      </div>

      {/* Table */}
      {appointments.length === 0 ? (
        <div className="text-center py-16 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <Calendar className="h-10 w-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Appointments Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You haven't scheduled any medical appointments yet.
          </p>
          <Link to="/appointment">
            <Button size="sm" className="mt-2">
              Book Appointment Now
            </Button>
          </Link>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time Slot</TableHead>
              <TableHead>Treatment</TableHead>
              <TableHead className="text-right">Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((a, index) => (
              <TableRow key={a._id || index}>
                <TableCell className="font-semibold text-slate-500">{index + 1}</TableCell>
                <TableCell className="font-medium text-slate-900">{a.patientName || user?.displayName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-sky-500" />
                    {a.date}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <Clock className="h-3.5 w-3.5 text-cyan-500" />
                    {a.slot}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                    <Stethoscope className="h-3.5 w-3.5 text-sky-600" />
                    {a.treatment}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {a.price && !a.paid && (
                    <Button size="sm" variant="default" className="h-7 text-xs gap-1 bg-emerald-600 hover:bg-emerald-700">
                      <CreditCard className="h-3 w-3" /> Pay ${a.price}
                    </Button>
                  )}
                  {a.price && a.paid && (
                    <Badge variant="success" className="gap-1 text-xs">
                      <CheckCircle2 className="h-3 w-3" /> Paid
                    </Badge>
                  )}
                  {!a.price && (
                    <Badge variant="secondary" className="text-xs">
                      Free Consultation
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MyAppointment;