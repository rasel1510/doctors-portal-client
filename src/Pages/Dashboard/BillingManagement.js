import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { Receipt, CreditCard } from 'lucide-react';
import { BASE_URL } from '../../config';

const BillingManagement = () => {
  const [filterPaid, setFilterPaid] = useState('');
  const { data, isLoading, refetch } = useQuery(['adminBilling', filterPaid], () =>
    fetch(`${BASE_URL}/billing${filterPaid ? `?paid=${filterPaid}` : ''}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    }).then((r) => r.json())
  );

  const handleMarkAsPaid = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/billing/${id}/pay`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ paymentMethod: 'cash' }),
      });
      const result = await res.json();
      if (result.acknowledged || result.modifiedCount > 0) {
        toast.success('Marked invoice as Paid!');
        refetch();
      } else {
        toast.error('Failed to update invoice.');
      }
    } catch {
      toast.error('Error updating invoice.');
    }
  };

  if (isLoading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-20 skeleton rounded-2xl" />)}</div>;
  }

  const invoices = data?.invoices || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Billing & Invoices Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Track chamber revenue, collect payments, and manage invoices</p>
        </div>

        <select
          value={filterPaid}
          onChange={(e) => setFilterPaid(e.target.value)}
          className="h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-500"
        >
          <option value="">All Invoices</option>
          <option value="true">Paid Only</option>
          <option value="false">Unpaid Only</option>
        </select>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200 bg-slate-50">
          <Receipt className="h-10 w-10 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No invoices found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Patient</th>
                <th className="p-3.5">Treatment & Doctor</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {invoices.map((inv) => (
                <tr key={inv._id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-teal-700">#{inv.invoiceNumber}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{inv.patientName || inv.patientEmail}</div>
                    <div className="text-[11px] text-slate-400">{inv.patientEmail}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800">{inv.treatmentName}</div>
                    <div className="text-[11px] text-purple-600">Dr. {inv.doctorName}</div>
                  </td>
                  <td className="p-3.5 font-extrabold text-slate-900 text-sm">৳{inv.amount}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${inv.paid ? 'status-paid' : 'status-pending'}`}>
                      {inv.paid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {!inv.paid ? (
                      <button
                        onClick={() => handleMarkAsPaid(inv._id)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                      >
                        <CreditCard className="h-3.5 w-3.5" /> Mark Paid
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-600">✓ Collected</span>
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

export default BillingManagement;
