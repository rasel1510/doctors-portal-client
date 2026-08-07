import React from 'react';
import { useQuery } from 'react-query';
import { Users, Phone, MapPin, Droplet, Calendar } from 'lucide-react';
import { BASE_URL } from '../../config';

const ManagePatients = () => {
  const { data: patients = [], isLoading } = useQuery('adminPatients', () =>
    fetch(`${BASE_URL}/patient`, {
      headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    }).then((r) => r.json())
  );

  if (isLoading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-20 skeleton rounded-2xl" />)}</div>;
  }

  const list = Array.isArray(patients) ? patients : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Registered Patients
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Directory of all patient records in the system</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#CCFBF1', color: '#0D9488' }}>
          Total: {list.length}
        </span>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200 bg-slate-50">
          <Users className="h-10 w-10 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No registered patients found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((p, i) => (
            <div key={p._id || i} className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: '#0D9488' }}>
                    {(p.name || p.email || 'P').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{p.name || p.email?.split('@')[0]}</h3>
                    <p className="text-xs text-slate-400">{p.email}</p>
                  </div>
                </div>
                {p.bloodGroup && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100">
                    <Droplet className="h-3 w-3 fill-red-500" /> {p.bloodGroup}
                  </span>
                )}
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                {p.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-teal-600" />
                    <span>{p.phone}</span>
                  </div>
                )}
                {p.dob && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-blue-600" />
                    <span>DOB: {p.dob}</span>
                  </div>
                )}
                {p.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 mt-0.5" />
                    <span className="truncate">{p.address}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePatients;
