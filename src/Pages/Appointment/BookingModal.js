import React, { useState } from 'react';
import { format } from 'date-fns';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, User, Mail, Phone, Stethoscope, CheckCircle2, AlertCircle } from 'lucide-react';
import { BASE_URL } from '../../config';

const BookingModal = ({ treatment, date, setTreatment, refetch, selectedDoctor }) => {
  const { _id, name, slots, price } = treatment;
  const [user] = useAuthState(auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayDate = format(date, 'EEEE, MMMM d, yyyy');
  const dateISO = format(date, 'yyyy-MM-dd');

  const handleBooking = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const slot = event.target.slot.value;
    const phone = event.target.phone.value;
    const complaint = event.target.complaint.value;
    const age = event.target.age.value;

    const booking = {
      treatmentId: _id,
      treatment: name,
      date: displayDate,
      dateISO,
      slot,
      fee: selectedDoctor?.fee || price,
      patient: user.email,
      patientName: user.displayName || user.email.split('@')[0],
      phone,
      age,
      chiefComplaint: complaint,
      doctorId: selectedDoctor?._id?.toString() || null,
      doctorName: selectedDoctor?.name || null,
      departmentId: selectedDoctor?.departmentId || treatment.departmentId || null,
      departmentName: selectedDoctor?.departmentName || treatment.departmentName || null,
    };

    try {
      const res = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(booking),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`✅ Appointment confirmed for ${displayDate} at ${slot}`);
        refetch();
        setTreatment(null);
      } else {
        toast.error(data.message || 'Booking failed. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const consultFee = selectedDoctor?.fee || price;

  return (
    <Dialog open={Boolean(treatment)} onOpenChange={(open) => !open && setTreatment(null)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#CCFBF1' }}>
              <Stethoscope className="h-4 w-4" style={{ color: '#0D9488' }} />
            </div>
            Book Appointment
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Fill in your details to confirm your appointment for <strong>{name}</strong>.
          </DialogDescription>
        </DialogHeader>

        {/* Summary Card */}
        <div className="rounded-2xl p-4 border space-y-2" style={{ background: '#F0FDFA', borderColor: '#99F6E4' }}>
          <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#0D9488' }}>
            <CheckCircle2 className="h-4 w-4" />
            Appointment Summary
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500">Service</span>
              <p className="font-semibold text-slate-900">{name}</p>
            </div>
            {selectedDoctor && (
              <div>
                <span className="text-slate-500">Doctor</span>
                <p className="font-semibold text-slate-900">Dr. {selectedDoctor.name}</p>
              </div>
            )}
            <div>
              <span className="text-slate-500">Department</span>
              <p className="font-semibold text-slate-900">{selectedDoctor?.departmentName || treatment.departmentName || 'General'}</p>
            </div>
            {consultFee && (
              <div>
                <span className="text-slate-500">Consultation Fee</span>
                <p className="font-bold text-lg" style={{ color: '#0D9488' }}>৳{consultFee}</p>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleBooking} className="space-y-3">
          {/* Date */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" style={{ color: '#0D9488' }} /> Appointment Date
            </Label>
            <Input type="text" disabled value={displayDate} className="bg-slate-50 font-medium text-slate-700 text-sm" />
          </div>

          {/* Slot */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" style={{ color: '#0D9488' }} /> Time Slot *
            </Label>
            <select
              name="slot"
              required
              className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            >
              {slots?.length > 0
                ? slots.map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
                  ))
                : <option disabled>No slots available for this date</option>
              }
            </select>
            {!slots?.length && (
              <p className="flex items-center gap-1 text-xs text-amber-600">
                <AlertCircle className="h-3 w-3" /> No slots available. Try another date.
              </p>
            )}
          </div>

          {/* Row: Name + Age */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" style={{ color: '#0D9488' }} /> Patient Name
              </Label>
              <Input type="text" disabled value={user?.displayName || user?.email?.split('@')[0] || ''} className="bg-slate-50 font-medium text-slate-700 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600">Age *</Label>
              <Input type="number" name="age" placeholder="e.g. 32" min="1" max="120" required />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" style={{ color: '#0D9488' }} /> Email Address
            </Label>
            <Input type="email" disabled value={user?.email || ''} className="bg-slate-50 font-medium text-slate-700 text-sm" />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" style={{ color: '#0D9488' }} /> Phone Number *
            </Label>
            <Input type="tel" name="phone" placeholder="+880 1X-XXXXXXXX" required />
          </div>

          {/* Chief Complaint */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600">Chief Complaint / Reason for Visit *</Label>
            <textarea
              name="complaint"
              required
              placeholder="Briefly describe your main health concern..."
              rows={2}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 resize-none focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-1">
            <Button type="button" variant="outline" onClick={() => setTreatment(null)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !slots?.length}
              className="font-semibold min-w-[140px]"
              style={{ background: '#0D9488' }}
            >
              {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
