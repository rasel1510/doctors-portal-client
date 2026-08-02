import React, { useState } from 'react';
import { format } from 'date-fns';
import Service from './Service';
import BookingModal from './BookingModal';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AvailableAppointments = ({ date }) => {
  const [treatment, setTreatment] = useState(null);

  // send ISO date to server for reliable comparisons and queries
  const requestDateISO = format(date, 'yyyy-MM-dd');
  const displayDate = format(date, 'PP');

  const { data: services, isLoading, refetch } = useQuery(
    ['available', requestDateISO],
    () =>
      fetch(`http://localhost:5000/available?date=${requestDateISO}`).then((res) =>
        res.json()
      )
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='mb-4 bg-white'>
      <h1 className='text-2xl text-center text-secondary my-8'>
        Available Appointments On {displayDate}
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {services?.map((service) => (
          <Service 
            key={service._id} 
            service={service}
            setTreatment={setTreatment}
          />
        ))}
      </div>
      {treatment && (
        <BookingModal
          date={date}
          treatment={treatment}
          setTreatment={setTreatment}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AvailableAppointments;
