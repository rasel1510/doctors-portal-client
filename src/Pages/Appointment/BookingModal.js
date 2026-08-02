import React from 'react';
import { format } from 'date-fns';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingModal = ({ treatment, date, setTreatment, refetch }) => {
    const { _id, name, slots, price } = treatment;
    const [user] = useAuthState(auth);

    const displayDate = format(date, 'PP');
    const dateISO = format(date, 'yyyy-MM-dd');

    const handleBooking = event => {
        event.preventDefault();
        const slot = event.target.slot.value;
        const phone = event.target.phone.value;

        // client-side guard: prevent booking past dates (should be blocked by DayPicker too)
        const today = new Date();
        const bookingDate = new Date(dateISO);
        bookingDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (bookingDate < today) {
            toast.error("Cannot book a previous date.");
            return;
        }

        const booking = {
            treatmentId: _id,
            treatment: name,
            date: displayDate,       // friendly display version (kept for backward compatibility)
            dateISO: dateISO,        // canonical ISO date for server comparisons
            slot,
            price,
            patient: user.email,
            patientName: user.displayName,
            phone
        };

        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast(`Appointment is set on ${displayDate} at ${slot}`);
                } else {
                    if (data.message) {
                        toast.error(data.message);
                    } else {
                        toast.error(`Already have an appointment of ${data.book?.treatment} on ${data.book?.date} at ${data.book?.slot}`);
                    }
                }
                refetch();
                setTreatment(null);
            });

    };

    return (
        <div>
            <input type="checkbox" id='booking-modal' className='modal-toggle' />
            <div className='modal modal-bottom sm:modal-middle'>
                <div className='modal-box bg-white'>
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h3 className='font-bold text-xl text-secondary text-center'>Booking for : {name}</h3>
                    <h3 className='font-bold text-xl text-orange-400 text-center'>Price : ${price}</h3>
                    <form onSubmit={handleBooking} className='grid bg-white text-black grid-cols-1 gap-2 mt-3 justify-items-center'>
                        <input type="text" disabled value={displayDate} className="input bg-white input-bordered w-full max-w-xs" />
                        {/* hidden ISO date for server */}
                        <input type="hidden" name="dateISO" value={dateISO} />
                        <select name='slot' className="select bg-white select-bordered w-full max-w-xs">
                            {slots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)}
                        </select>

                        <input type="text" name='name' disabled value={user?.displayName || ''} className="input bg-white input-bordered w-full max-w-xs" />
                        <input type="text" name='email' disabled value={user?.email || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="text" name='phone' placeholder="Enter Phone Number" className="input input-bordered w-full max-w-xs" />

                        <input type="submit" value="submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookingModal;
