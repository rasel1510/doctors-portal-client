import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import BookingModal from './BookingModal';
import { Calendar, Clock, Stethoscope, User, ChevronRight, CheckCircle2 } from 'lucide-react';
import { BASE_URL } from '../../config';

const DEPT_COLORS = {
  cardiology: '#EF4444', orthopedics: '#F59E0B', dermatology: '#8B5CF6',
  neurology: '#06B6D4', pediatrics: '#10B981', gynecology: '#EC4899',
  ent: '#F97316', ophthalmology: '#3B82F6', general: '#0D9488',
};

const DEPARTMENTS = [
  { id: 'cardiology', name: 'Cardiology', icon: '❤️' },
  { id: 'orthopedics', name: 'Orthopedics', icon: '🦴' },
  { id: 'dermatology', name: 'Dermatology', icon: '🌿' },
  { id: 'neurology', name: 'Neurology', icon: '🧠' },
  { id: 'pediatrics', name: 'Pediatrics', icon: '👶' },
  { id: 'gynecology', name: 'Gynecology', icon: '🌸' },
  { id: 'ent', name: 'ENT', icon: '👂' },
  { id: 'ophthalmology', name: 'Ophthalmology', icon: '👁️' },
  { id: 'general', name: 'General Medicine', icon: '🩺' },
];

const AvailableAppointments = ({ date, initialDept }) => {
  const [selectedDeptId, setSelectedDeptId] = useState(initialDept || null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [treatment, setTreatment] = useState(null);

  const dateISO = format(date, 'yyyy-MM-dd');
  const displayDate = format(date, 'EEEE, MMMM d, yyyy');

  // Fetch doctors for selected department
  const { data: doctors = [], isLoading: doctorsLoading } = useQuery(
    ['doctors', selectedDeptId],
    () => fetch(`${BASE_URL}/doctor${selectedDeptId ? `?departmentId=${selectedDeptId}` : ''}`).then(r => r.json()),
    { enabled: !!selectedDeptId }
  );

  // Fetch available services for selected department + date
  const { data: services = [], isLoading: servicesLoading, refetch } = useQuery(
    ['available', dateISO, selectedDeptId, selectedDoctor?._id],
    () => fetch(
      `${BASE_URL}/available?date=${dateISO}${selectedDeptId ? `&departmentId=${selectedDeptId}` : ''}${selectedDoctor ? `&doctorId=${selectedDoctor._id}` : ''}`
    ).then(r => r.json()),
    { enabled: !!selectedDeptId }
  );

  const doctorList = Array.isArray(doctors) ? doctors : [];
  const serviceList = Array.isArray(services) ? services : [];

  const selectedDept = DEPARTMENTS.find(d => d.id === selectedDeptId);
  const deptColor = selectedDeptId ? (DEPT_COLORS[selectedDeptId] || '#0D9488') : '#0D9488';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Step 1: Choose Department */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ background: selectedDeptId ? '#0D9488' : '#94A3B8' }}>
            {selectedDeptId ? <CheckCircle2 className="h-5 w-5" /> : '1'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Select Department
            </h3>
            <p className="text-xs text-slate-500">Choose a medical specialty for your appointment</p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-3">
          {DEPARTMENTS.map(dept => (
            <button
              key={dept.id}
              onClick={() => { setSelectedDeptId(dept.id); setSelectedDoctor(null); setTreatment(null); }}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl border-2 text-center transition-all duration-200 hover:scale-105"
              style={{
                borderColor: selectedDeptId === dept.id ? DEPT_COLORS[dept.id] : 'transparent',
                background: selectedDeptId === dept.id ? `${DEPT_COLORS[dept.id]}15` : 'white',
                boxShadow: selectedDeptId === dept.id ? `0 4px 12px ${DEPT_COLORS[dept.id]}25` : '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <span className="text-2xl">{dept.icon}</span>
              <span className="text-[10px] font-semibold leading-tight"
                style={{ color: selectedDeptId === dept.id ? DEPT_COLORS[dept.id] : '#64748B' }}>
                {dept.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Select Doctor */}
      {selectedDeptId && (
        <div className="mb-10 animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: selectedDoctor ? '#0D9488' : deptColor }}>
              {selectedDoctor ? <CheckCircle2 className="h-5 w-5" /> : '2'}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Choose Your Doctor
              </h3>
              <p className="text-xs text-slate-500">{selectedDept?.name} specialists available for {displayDate}</p>
            </div>
          </div>

          {doctorsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3].map(i => (
                <div key={i} className="h-24 skeleton rounded-2xl" />
              ))}
            </div>
          ) : doctorList.length === 0 ? (
            <div className="p-6 rounded-2xl border border-dashed border-slate-200 text-center bg-slate-50">
              <User className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No doctors registered for this department yet.</p>
              <p className="text-xs text-slate-500 mt-1">Please proceed to select a service directly below.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctorList.map(doctor => (
                <button
                  key={doctor._id}
                  onClick={() => setSelectedDoctor(selectedDoctor?._id === doctor._id ? null : doctor)}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all hover:scale-[1.01]"
                  style={{
                    borderColor: selectedDoctor?._id === doctor._id ? deptColor : 'transparent',
                    background: selectedDoctor?._id === doctor._id ? `${deptColor}10` : 'white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                >
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                    style={{ background: `${deptColor}20` }}>
                    {doctor.img
                      ? <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover object-top" />
                      : <span className="text-xl font-bold" style={{ color: deptColor }}>{(doctor.name||'D').charAt(0)}</span>
                    }
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">Dr. {doctor.name}</p>
                    <p className="text-xs text-slate-500 truncate">{doctor.qualification || 'MBBS, MD'}</p>
                    <p className="text-xs font-semibold mt-1" style={{ color: deptColor }}>৳{doctor.fee || '500'} fee</p>
                  </div>
                  {selectedDoctor?._id === doctor._id && (
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: deptColor }} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Available Services/Slots */}
      {selectedDeptId && (
        <div className="animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: deptColor }}>
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Select Service & Slot
              </h3>
              <p className="text-xs text-slate-500">Available appointments for {displayDate}</p>
            </div>
          </div>

          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-36 skeleton rounded-2xl" />)}
            </div>
          ) : serviceList.length === 0 ? (
            <div className="p-10 rounded-2xl border border-dashed border-slate-200 text-center bg-slate-50">
              <Calendar className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-700">No services found for this department.</p>
              <p className="text-xs text-slate-500 mt-1">Try another date or department.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {serviceList.map((service) => {
                const hasSlots = service.slots && service.slots.length > 0;
                return (
                  <div
                    key={service._id}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md duration-200"
                  >
                    {/* Header */}
                    <div className="px-5 pt-5 pb-3" style={{ borderBottom: `3px solid ${deptColor}20` }}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 leading-tight mb-1"
                            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                            {service.name}
                          </h4>
                          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                            style={{ background: deptColor }}>
                            {service.departmentName || selectedDept?.name}
                          </span>
                        </div>
                        <Stethoscope className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: deptColor }} />
                      </div>
                    </div>

                    {/* Slots */}
                    <div className="px-5 pb-4 pt-3">
                      <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-2.5">
                        <Clock className="h-3.5 w-3.5" />
                        {hasSlots ? `${service.slots.length} Slot${service.slots.length !== 1 ? 's' : ''} Available` : 'Fully Booked'}
                      </p>

                      {hasSlots ? (
                        <>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {service.slots.slice(0, 4).map((slot, i) => (
                              <span key={i} className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{ background: `${deptColor}15`, color: deptColor }}>
                                {slot}
                              </span>
                            ))}
                            {service.slots.length > 4 && (
                              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-500">
                                +{service.slots.length - 4} more
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => setTreatment(service)}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 hover:scale-[1.02]"
                            style={{ background: `linear-gradient(135deg, ${deptColor}, ${deptColor}CC)` }}
                          >
                            Book Appointment
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <div className="text-center py-3 rounded-xl bg-slate-50 border border-dashed border-slate-200">
                          <p className="text-xs text-slate-500 font-medium">All slots booked for this date.</p>
                          <p className="text-xs text-slate-400">Please select another date.</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Booking Modal */}
      {treatment && (
        <BookingModal
          date={date}
          treatment={treatment}
          setTreatment={setTreatment}
          refetch={refetch}
          selectedDoctor={selectedDoctor}
        />
      )}
    </section>
  );
};

export default AvailableAppointments;
