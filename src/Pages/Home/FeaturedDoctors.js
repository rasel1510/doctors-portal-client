import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ArrowRight, Star, Briefcase, Calendar } from 'lucide-react';
import { BASE_URL } from '../../config';

const DEPT_COLORS = {
  cardiology: '#EF4444', orthopedics: '#F59E0B', dermatology: '#8B5CF6',
  neurology: '#06B6D4', pediatrics: '#10B981', gynecology: '#EC4899',
  ent: '#F97316', ophthalmology: '#3B82F6', general: '#0D9488',
};

const FeaturedDoctors = () => {
  const { data: doctors = [], isLoading } = useQuery('featuredDoctors', () =>
    fetch(`${BASE_URL}/doctor`).then(r => r.json())
  );

  const displayDoctors = Array.isArray(doctors) ? doctors.slice(0, 6) : [];

  const skeletonCount = 6;

  return (
    <section className="py-20" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{ background: '#CCFBF1', color: '#0D9488', border: '1px solid #5EEAD4' }}>
              Our Expert Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Meet Our{' '}
              <span style={{
                background: 'linear-gradient(135deg, #0D9488, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Specialists</span>
            </h2>
            <p className="text-slate-500 max-w-md">
              Qualified, experienced and compassionate doctors dedicated to your health and wellbeing.
            </p>
            <div className="w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #3B82F6)' }} />
          </div>
          <Link to="/doctors">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 flex-shrink-0 transition-all hover:scale-105"
              style={{ borderColor: '#0D9488', color: '#0D9488' }}>
              View All Doctors <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array(skeletonCount).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm animate-pulse">
                  <div className="h-48 skeleton" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 skeleton rounded w-3/4" />
                    <div className="h-3 skeleton rounded w-1/2" />
                    <div className="h-3 skeleton rounded w-2/3" />
                  </div>
                </div>
              ))
            : displayDoctors.length > 0
            ? displayDoctors.map((doctor, i) => {
                const deptColor = DEPT_COLORS[doctor.departmentId] || '#0D9488';
                return (
                  <div key={doctor._id || i} className="doc-card-hover bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                    {/* Photo */}
                    <div className="relative h-52 flex items-end justify-center overflow-hidden"
                      style={{ background: `linear-gradient(180deg, ${deptColor}15 0%, ${deptColor}30 100%)` }}>
                      {doctor.img ? (
                        <img
                          src={doctor.img}
                          alt={doctor.name}
                          className="h-full w-full object-cover object-top"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold"
                            style={{ background: deptColor }}>
                            {(doctor.name || 'D').charAt(0)}
                          </div>
                        </div>
                      )}
                      {/* Department badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold shadow-md"
                        style={{ background: deptColor }}>
                        {doctor.departmentName || doctor.speciality || 'General'}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        Dr. {doctor.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                        <Briefcase className="h-3.5 w-3.5" style={{ color: deptColor }} />
                        <span>{doctor.qualification || 'MBBS, MD'}</span>
                        {doctor.experience && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span>{doctor.experience} yrs exp.</span>
                          </>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs font-semibold text-slate-700 ml-1">4.9</span>
                        <span className="text-xs text-slate-400">(128 reviews)</span>
                      </div>

                      {/* Fee + Book */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-400">Consultation Fee</span>
                          <p className="text-base font-extrabold" style={{ color: '#0D9488' }}>
                            ৳{doctor.fee || '500'}
                          </p>
                        </div>
                        <Link to={`/appointment?dept=${doctor.departmentId}`}>
                          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md transition-all hover:scale-105"
                            style={{ background: `linear-gradient(135deg, ${deptColor}, ${deptColor}CC)` }}>
                            <Calendar className="h-3.5 w-3.5" />
                            Book Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            : (
              // Placeholder cards if no doctors seeded yet
              [
                { name: 'Arif Rahman', dept: 'Cardiology', deptId: 'cardiology', qual: 'MBBS, MD (Cardiology)', exp: '12', fee: '800' },
                { name: 'Nusrat Jahan', dept: 'Gynecology', deptId: 'gynecology', qual: 'MBBS, FCPS (Gynae)', exp: '9', fee: '700' },
                { name: 'Karim Hassan', dept: 'Orthopedics', deptId: 'orthopedics', qual: 'MBBS, MS (Ortho)', exp: '15', fee: '900' },
                { name: 'Sharmin Akter', dept: 'Pediatrics', deptId: 'pediatrics', qual: 'MBBS, DCH', exp: '8', fee: '600' },
                { name: 'Rahim Uddin', dept: 'Neurology', deptId: 'neurology', qual: 'MBBS, MD (Neuro)', exp: '11', fee: '1000' },
                { name: 'Fatema Begum', dept: 'Dermatology', deptId: 'dermatology', qual: 'MBBS, DDV', exp: '7', fee: '600' },
              ].map((doc, i) => {
                const deptColor = DEPT_COLORS[doc.deptId] || '#0D9488';
                return (
                  <div key={i} className="doc-card-hover bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                    <div className="h-52 flex items-center justify-center"
                      style={{ background: `linear-gradient(180deg, ${deptColor}15 0%, ${deptColor}30 100%)` }}>
                      <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                        style={{ background: deptColor }}>
                        {doc.name.charAt(0)}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="inline-block px-2 py-0.5 rounded-full text-white text-xs font-bold mb-2"
                        style={{ background: deptColor }}>
                        {doc.dept}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        Dr. {doc.name}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3">{doc.qual} · {doc.exp} yrs exp.</p>
                      <div className="flex items-center gap-1 mb-4">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs font-semibold text-slate-700 ml-1">4.9</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-base font-extrabold" style={{ color: '#0D9488' }}>৳{doc.fee}</p>
                        <Link to={`/appointment?dept=${doc.deptId}`}>
                          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
                            style={{ background: deptColor }}>
                            <Calendar className="h-3.5 w-3.5" /> Book Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )
          }
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
