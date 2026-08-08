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
import { offlineSync } from '../../utils/offlineSync';

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

    // If device is explicitly offline, queue request directly without waiting for fetch timeout
    if (!navigator.onLine) {
      await offlineSync.queueRequest('BOOKING', `${BASE_URL}/booking`, 'POST', booking);
      toast.info(`📶 You are offline. Appointment for ${displayDate} at ${slot} queued and will sync when internet returns.`, {
        autoClose: 6000,
      });
      setTreatment(null);
      setIsSubmitting(false);
      return;
    }

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
      // Fallback: If network request dropped mid-fetch
      await offlineSync.queueRequest('BOOKING', `${BASE_URL}/booking`, 'POST', booking);
      toast.info(`📶 Network connection lost. Appointment saved offline & will sync automatically when back online.`, {
        autoClose: 6000,
      });
      setTreatment(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const consultFee = selectedDoctor?.fee || price;

  return (
    <Dialog open={Boolean(treatment)} onOpenChange={(open) => !open && setTreatment(null)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#CCFBF1' }}>
              <Stethoscope className="h-3.5 w-3.5" style={{ color: '#0D9488' }} />
            </div>
            Book Appointment
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Confirm your appointment for <strong>{name}</strong>.
          </DialogDescription>
        </DialogHeader>

        {/* Compact Summary Card */}
        <div className="rounded-xl p-3 border" style={{ background: '#F0FDFA', borderColor: '#99F6E4' }}>
          <div className="flex items-center justify-between flex-wrap gap-x-4 gap-y-1 text-xs">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" style={{ color: '#0D9488' }} />
              <span className="font-semibold text-slate-800">{name}</span>
            </div>
            {selectedDoctor && (
              <span className="text-slate-600">Dr. {selectedDoctor.name}</span>
            )}
            <span className="text-slate-500">{selectedDoctor?.departmentName || treatment.departmentName || 'General'}</span>
            {consultFee && (
              <span className="font-bold" style={{ color: '#0D9488' }}>৳{consultFee}</span>
            )}
          </div>
        </div>

        <form onSubmit={handleBooking} className="space-y-2.5">
          {/* Row: Date + Slot */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Calendar className="h-3 w-3" style={{ color: '#0D9488' }} /> Date
              </Label>
              <Input type="text" disabled value={displayDate} className="bg-slate-50 font-medium text-slate-700 text-xs h-9" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Clock className="h-3 w-3" style={{ color: '#0D9488' }} /> Time Slot *
              </Label>
              <select
                name="slot"
                required
                className="flex h-9 w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              >
                {slots?.length > 0
                  ? slots.map((slot, index) => (
                      <option key={index} value={slot}>{slot}</option>
                    ))
                  : <option disabled>No slots available</option>
                }
              </select>
            </div>
          </div>
          {!slots?.length && (
            <p className="flex items-center gap-1 text-xs text-amber-600">
              <AlertCircle className="h-3 w-3" /> No slots available. Try another date.
            </p>
          )}

          {/* Row: Name + Age */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1">
              <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <User className="h-3 w-3" style={{ color: '#0D9488' }} /> Patient
              </Label>
              <Input type="text" disabled value={user?.displayName || user?.email?.split('@')[0] || ''} className="bg-slate-50 font-medium text-slate-700 text-xs h-9" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-600">Age *</Label>
              <Input type="number" name="age" placeholder="e.g. 32" min="1" max="120" required className="text-xs h-9" />
            </div>
          </div>

          {/* Row: Email + Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Mail className="h-3 w-3" style={{ color: '#0D9488' }} /> Email
              </Label>
              <Input type="email" disabled value={user?.email || ''} className="bg-slate-50 font-medium text-slate-700 text-xs h-9" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Phone className="h-3 w-3" style={{ color: '#0D9488' }} /> Phone *
              </Label>
              <Input type="tel" name="phone" placeholder="+880 1X-XXXX" required className="text-xs h-9" />
            </div>
          </div>

          {/* Chief Complaint */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-slate-600">Chief Complaint *</Label>
            <textarea
              name="complaint"
              required
              placeholder="Briefly describe your main health concern..."
              rows={1}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 resize-none focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setTreatment(null)} disabled={isSubmitting} className="h-9 text-xs">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !slots?.length}
              className="font-semibold min-w-[130px] h-9 text-xs"
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
