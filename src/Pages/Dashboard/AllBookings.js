import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { Calendar, Filter, Receipt } from 'lucide-react';
import { BASE_URL } from '../../config';

const AllBookings = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading, refetch } = useQuery(['allBookings', statusFilter], () =>
    fetch(`${BASE_URL}/booking/all${statusFilter ? `?status=${statusFilter}` : ''}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    }).then((r) => r.json())
  );

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${BASE_URL}/booking/${id}/status`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (result.acknowledged || result.modifiedCount > 0) {
        toast.success(`Booking status updated to ${newStatus}`);
        refetch();
      } else {
        toast.error('Failed to update status.');
      }
    } catch {
      toast.error('Error updating status.');
    }
  };

  const handleCreateInvoice = async (booking) => {
    try {
      const invoiceData = {
        bookingId: booking._id,
        patientEmail: booking.patient,
        patientName: booking.patientName || booking.patient,
        doctorName: booking.doctorName || 'Doctor',
        treatmentName: booking.treatment,
        amount: booking.fee || 500,
      };

      const res = await fetch(`${BASE_URL}/billing`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(invoiceData),
      });
      const result = await res.json();
      if (result.insertedId || result.invoiceNumber) {
        toast.success(`Generated Invoice #${result.invoiceNumber || ''}!`);
        refetch();
      } else {
        toast.error(result.message || 'Invoice generation failed.');
      }
    } catch {
      toast.error('Error creating invoice.');
    }
  };

  if (isLoading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-20 skeleton rounded-2xl" />)}</div>;
  }

  const bookings = data?.bookings || [];

  return (
    <div className="space-y-6">
      {/* Header + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            All Appointments Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Filter, update statuses, and generate billing invoices</p>
        </div>

        {/* Filter dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="visited">Visited</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200 bg-slate-50">
          <Calendar className="h-10 w-10 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No bookings found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Treatment & Doctor</th>
                <th className="p-3.5">Date & Slot</th>
                <th className="p-3.5">Fee</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-slate-50/50">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{b.patientName || b.patient}</div>
                    <div className="text-[11px] text-slate-400">{b.patient}</div>
                    {b.phone && <div className="text-[11px] text-slate-500 font-medium">{b.phone}</div>}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800">{b.treatment}</div>
                    <div className="text-[11px] text-purple-600">Dr. {b.doctorName || 'Assigned Specialist'}</div>
                  </td>
                  <td className="p-3.5 text-slate-600">
                    <div>{b.date}</div>
                    <div className="text-[11px] text-slate-400">{b.slot}</div>
                  </td>
                  <td className="p-3.5 font-bold text-teal-700">৳{b.fee || 500}</td>
                  <td className="p-3.5">
                    <select
                      value={b.status || 'pending'}
                      onChange={(e) => handleStatusChange(b._id, e.target.value)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-bold border focus:outline-none ${
                        b.status === 'visited'
                          ? 'status-visited'
                          : b.status === 'cancelled'
                          ? 'status-cancelled'
                          : 'status-pending'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="visited">Visited</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    {b.status === 'visited' && !b.hasInvoice && (
                      <button
                        onClick={() => handleCreateInvoice(b)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm"
                      >
                        <Receipt className="h-3 w-3" /> Gen Invoice
                      </button>
                    )}
                    {b.hasInvoice && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                        Invoice Generated
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBookings;
