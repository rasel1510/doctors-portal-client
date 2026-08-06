import React, { useState } from 'react';
import { format } from 'date-fns';
import Service from './Service';
import BookingModal from './BookingModal';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { Calendar as CalendarIcon } from 'lucide-react';
import { BASE_URL } from '../../config';

const AvailableAppointments = ({ date }) => {
  const [treatment, setTreatment] = useState(null);

  // send ISO date to server for reliable comparisons and queries
  const requestDateISO = format(date, 'yyyy-MM-dd');
  const displayDate = format(date, 'PP');

  const { data: services, isLoading, refetch } = useQuery(
    ['available', requestDateISO],
    () =>
      fetch(`${BASE_URL}/available?date=${requestDateISO}`).then((res) =>
        res.json()
      )
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      {/* Section Header */}
      <div className="text-center space-y-2 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold">
          <CalendarIcon className="h-3.5 w-3.5 text-cyan-600" />
          <span>Selected Date: {displayDate}</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Available Specialization Services
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Please pick an available service below to reserve your appointment slot.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service) => (
          <Service
            key={service._id}
            service={service}
            setTreatment={setTreatment}
          />
        ))}
      </div>

      {/* Booking Modal */}
      {treatment && (
        <BookingModal
          date={date}
          treatment={treatment}
          setTreatment={setTreatment}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default AvailableAppointments;
