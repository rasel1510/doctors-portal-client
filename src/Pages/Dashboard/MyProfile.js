import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { User, Phone, Calendar, Droplet, MapPin, Mail, Save } from 'lucide-react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';

const MyProfile = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    dob: '',
    bloodGroup: '',
    address: '',
    gender: 'male',
  });

  useEffect(() => {
    if (user?.email) {
      fetch(`${BASE_URL}/profile/${user.email}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
        .then((r) => r.json())
        .then((data) => {
          if (data && !data.message) {
            setProfile({
              name: data.name || user.displayName || '',
              phone: data.phone || '',
              dob: data.dob || '',
              bloodGroup: data.bloodGroup || '',
              address: data.address || '',
              gender: data.gender || 'male',
            });
          } else {
            setProfile((prev) => ({ ...prev, name: user.displayName || '' }));
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${BASE_URL}/profile/${user.email}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.acknowledged || data.modifiedCount > 0 || data.matchedCount > 0) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch {
      toast.error('Error updating profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="h-64 skeleton rounded-2xl" />;
  }

  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          My Profile
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">Manage your personal and medical profile details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Email (Read only) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-teal-600" /> Email Address (Non-editable)
          </label>
          <input
            type="email"
            disabled
            value={user?.email || ''}
            className="w-full h-11 px-4 rounded-xl bg-slate-100 border border-slate-200 text-sm font-medium text-slate-600 cursor-not-allowed"
          />
        </div>

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-teal-600" /> Full Name
          </label>
          <input
            type="text"
            required
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Enter your full name"
            className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
          />
        </div>

        {/* Grid: Phone + DOB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-teal-600" /> Phone Number
            </label>
            <input
              type="tel"
              required
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="+880 17XXXXXXXX"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-teal-600" /> Date of Birth
            </label>
            <input
              type="date"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
          </div>
        </div>

        {/* Grid: Blood Group + Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Droplet className="h-3.5 w-3.5 text-red-500" /> Blood Group
            </label>
            <select
              value={profile.bloodGroup}
              onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Gender</label>
            <select
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-teal-600" /> Residential Address
          </label>
          <textarea
            rows={3}
            value={profile.address}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            placeholder="House #, Street, City, Zip"
            className="w-full p-4 rounded-xl border border-slate-200 text-sm text-slate-900 resize-none focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
          />
        </div>

        {/* Save button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm shadow-md transition-all hover:scale-[1.02]"
            style={{ background: '#0D9488' }}
          >
            {saving ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
