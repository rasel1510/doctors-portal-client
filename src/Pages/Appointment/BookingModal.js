import React from 'react';
import { format } from 'date-fns';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, DollarSign, User, Mail, Phone } from 'lucide-react';
import { BASE_URL } from '../../config';

const BookingModal = ({ treatment, date, setTreatment, refetch }) => {
  const { _id, name, slots, price } = treatment;
  const [user] = useAuthState(auth);

  const displayDate = format(date, 'PP');
  const dateISO = format(date, 'yyyy-MM-dd');

  const handleBooking = (event) => {
    event.preventDefault();
    const slot = event.target.slot.value;
    const phone = event.target.phone.value;

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
      date: displayDate,
      dateISO: dateISO,
      slot,
      price,
      patient: user.email,
      patientName: user.displayName,
      phone,
    };

    fetch(`${BASE_URL}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(`Appointment confirmed for ${displayDate} at ${slot}`);
        } else {
          if (data.message) {
            toast.error(data.message);
          } else {
            toast.error(`Already booked: ${data.book?.treatment} on ${data.book?.date} at ${data.book?.slot}`);
          }
        }
        refetch();
        setTreatment(null);
      });
  };

  return (
    <Dialog open={Boolean(treatment)} onOpenChange={(open) => !open && setTreatment(null)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Booking: {name}</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Confirm your patient details and select an available time slot below.
          </DialogDescription>
        </DialogHeader>

        {/* Price & Fee tag */}
        {price !== undefined && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50 border border-sky-100 text-sky-800 text-sm font-semibold">
            <span className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-sky-600" /> Consultation Fee
            </span>
            <span className="text-base text-sky-700 font-bold">${price}</span>
          </div>
        )}

        <form onSubmit={handleBooking} className="space-y-4 pt-2">
          {/* Selected Date */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" /> Date
            </Label>
            <Input type="text" disabled value={displayDate} className="bg-slate-100 font-medium text-slate-700" />
            <input type="hidden" name="dateISO" value={dateISO} />
          </div>

          {/* Time Slot Select */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" /> Available Time Slot
            </Label>
            <select
              name="slot"
              className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {slots?.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Patient Name */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-slate-400" /> Patient Name
            </Label>
            <Input type="text" name="name" disabled value={user?.displayName || ''} className="bg-slate-100 font-medium text-slate-700" />
          </div>

          {/* Patient Email */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-slate-400" /> Patient Email
            </Label>
            <Input type="email" name="email" disabled value={user?.email || ''} className="bg-slate-100 font-medium text-slate-700" />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-slate-400" /> Contact Phone Number
            </Label>
            <Input type="tel" name="phone" placeholder="+1 (555) 000-0000" required />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setTreatment(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Confirm Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
