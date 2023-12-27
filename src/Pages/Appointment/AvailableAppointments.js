import React, {useState } from 'react';
import { format } from 'date-fns';
import Service from './Service';
import BookingModal from './BookingModal';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading'
const AvailableAppointments = ({ date }) => {
  // Corrected the typo, using array destructuring for useState
  //const [services, setServices] = useState([]);
// for modal
    const [treatment, setTreatment]=useState(null);

    const formatedDate=format(date,'PP');

    /// now we will use rect query
  
  const {data:services, isLoading,refetch}=useQuery(['available',formatedDate],()=>fetch(`http://localhost:5000/available?date=${formatedDate}`)
  .then((res) => res.json())
  )

  if(isLoading){
    return <Loading></Loading>
  }
  /*useEffect(() => {
    fetch(`http://localhost:5000/available?date=${formatedDate}`)
      .then((res) => res.json())
      .then((data) =>setServices(data));
  }, [formatedDate]); */

  return (
    <div className='mb-4'>
      <h1 className='text-2xl text-center text-secondary my-8'>Available Appointments On {format(date, 'PP')}</h1>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {services?.map((service) => (
          <Service 
          key={service._id} service={service}
          setTreatment={setTreatment}
           />
        ))}
      </div>
        {treatment && <BookingModal 
        date={date}
         treatment={treatment}
         setTreatment={setTreatment}
         refetch={refetch}
         ></BookingModal>}
    </div>
  );
};

export default AvailableAppointments;
