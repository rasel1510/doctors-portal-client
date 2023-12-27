import React from 'react';
import { format } from 'date-fns';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  

const BookingModal = ({ treatment, date ,setTreatment,refetch}) => {
    const { _id,name,slots,price } = treatment;
    const [user] = useAuthState(auth);
    //console.log(user)

    const formatedDate=format(date, 'PP');
    const handleBooking=event=>{
        event.preventDefault();
        const slot=event.target.slot.value;
  
       
    // sending data backend index.js to send in database : 
        const booking={
            treatmentId:_id,
            treatment:name,
            date:formatedDate,
            slot,
            price:price,
            patient:user.email,
            patientName:user.displayName,
            phone:event.target.phone.value
        }

        //using fetch to send data in index.js (backend)
        fetch('http://localhost:5000/booking',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(booking)
        })
            .then(res=>res.json())
            .then(data=>{
                //console.log(_id, name, slot,PatitentName,patEmail)
                console.log(data);
                if(data.success){
                    toast(`Appointment is set on ${formatedDate} at ${slot}`);
                }
                else{
                    toast.error(`All ready have an apppointment of ${data.book?.treatment} on ${data.book?.date} at ${data.book.slot}`);
                }
                // refetch for react query for auto update on slot
                refetch();
                setTreatment(null)
            })
        
       
    }


    return (
        <div>
            <input type="checkbox" id='booking-modal' className='modal-toggle' />
            <div className='modal modal-bottom sm:modal-middle'>
                <div className='modal-box'>
                    <label for="booking-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h3 className='font-bold text-xl text-secondary text-center'>Booking for : {name}</h3>
                    <h3 className='font-bold text-xl text-orange-400 text-center'>Price : ${price}</h3>
                    <form onSubmit={handleBooking} className='grid text-black grid-cols-1 gap-2 mt-3 justify-items-center'>
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" />
                        <select name='slot' className="select select-bordered w-full max-w-xs">
                           {
                            slots.map(slot=> <option value={slot}>{slot}</option>)
                           }
                        </select>

                        <input type="text"  name='name'disabled value={user.displayName}  className="input input-bordered w-full max-w-xs" />
                        <input type="text" name='email' disabled value={user?.email || ' '} className="input input-bordered w-full max-w-xs" />
                        <input type="text" name='phone' placeholder="Enter Phone Number" className="input input-bordered w-full max-w-xs" />

                        <input  type="submit" value="submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookingModal;