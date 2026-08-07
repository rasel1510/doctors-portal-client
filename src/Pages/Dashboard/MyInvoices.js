import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Receipt, CheckCircle2, AlertCircle, Calendar, Stethoscope } from 'lucide-react';
import { BASE_URL } from '../../config';

const MyInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      fetch(`${BASE_URL}/billing/my`, {
        headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
        .then(r => r.json())
        .then(data => setInvoices(Array.isArray(data) ? data : []))
        .catch(() => setInvoices([]))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const totalPaid = invoices.filter(i => i.paid).reduce((s, i) => s + (i.amount || 0), 0);
  const totalUnpaid = invoices.filter(i => !i.paid).reduce((s, i) => s + (i.amount || 0), 0);

  if (loading) {
    return <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 skeleton rounded-2xl" />)}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="pb-5 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          My Invoices
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">Your billing history and payment records</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Invoices', value: invoices.length, sub: '', color: '#0D9488', bg: '#CCFBF1' },
          { label: 'Total Paid', value: `৳${totalPaid}`, sub: `${invoices.filter(i=>i.paid).length} invoices`, color: '#059669', bg: '#D1FAE5' },
          { label: 'Outstanding', value: `৳${totalUnpaid}`, sub: `${invoices.filter(i=>!i.paid).length} pending`, color: '#DC2626', bg: '#FEE2E2' },
        ].map((s, i) => (
          <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-white text-center shadow-sm">
            <div className="text-xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs font-semibold text-slate-700">{s.label}</div>
            {s.sub && <div className="text-[10px] text-slate-400 mt-0.5">{s.sub}</div>}
          </div>
        ))}
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200 bg-slate-50">
          <Receipt className="h-10 w-10 mx-auto mb-3 text-slate-400" />
          <h3 className="text-base font-bold text-slate-700">No Invoices Yet</h3>
          <p className="text-xs text-slate-500 mt-1">Invoices will appear here after your doctor visits.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {invoices.map((inv, i) => (
            <div key={inv._id || i} className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-sm transition-all">
              {/* Status Icon */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: inv.paid ? '#D1FAE5' : '#FEF3C7' }}>
                {inv.paid
                  ? <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  : <AlertCircle className="h-5 w-5 text-amber-600" />
                }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-400">#{inv.invoiceNumber || `INV-${i+1}`}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${inv.paid ? 'status-paid' : 'status-pending'}`}>
                    {inv.paid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate">{inv.treatmentName || 'Consultation'}</h4>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-1">
                  {inv.doctorName && (
                    <span className="flex items-center gap-1">
                      <Stethoscope className="h-3.5 w-3.5 text-purple-400" /> Dr. {inv.doctorName}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-teal-400" />
                    {inv.createdAt ? new Date(inv.createdAt).toLocaleDateString('en-BD') : '—'}
                  </span>
                  {inv.paymentMethod && (
                    <span className="capitalize text-slate-400">via {inv.paymentMethod}</span>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-slate-500">Amount</p>
                <p className="text-lg font-extrabold" style={{ color: '#0D9488' }}>৳{inv.amount || 0}</p>
                {inv.paid && inv.paidAt && (
                  <p className="text-[10px] text-slate-400">
                    Paid {new Date(inv.paidAt).toLocaleDateString('en-BD')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInvoices;
