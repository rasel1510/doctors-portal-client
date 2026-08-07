import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { UserPlus, UploadCloud } from 'lucide-react';
import { BASE_URL } from '../../config';

const DEPARTMENTS = [
  { id: 'cardiology', name: 'Cardiology' },
  { id: 'orthopedics', name: 'Orthopedics' },
  { id: 'dermatology', name: 'Dermatology' },
  { id: 'neurology', name: 'Neurology' },
  { id: 'pediatrics', name: 'Pediatrics' },
  { id: 'gynecology', name: 'Gynecology' },
  { id: 'ent', name: 'ENT' },
  { id: 'ophthalmology', name: 'Ophthalmology' },
  { id: 'general', name: 'General Medicine' },
];

const AddDoctor = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const imageStorageKey = '6d4c293ef648418de727023b7d745a1b';

  const onSubmit = async (data) => {
    let imgUrl = '';
    if (data.image && data.image[0]) {
      const image = data.image[0];
      const formData = new FormData();
      formData.append('image', image);
      try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${imageStorageKey}`, {
          method: 'POST',
          body: formData,
        });
        const imgResult = await res.json();
        if (imgResult.success) {
          imgUrl = imgResult.data.url;
        }
      } catch (err) {
        console.log('Image upload error:', err);
      }
    }

    const selectedDept = DEPARTMENTS.find(d => d.id === data.departmentId) || DEPARTMENTS[8];

    const doctor = {
      name: data.name,
      email: data.email,
      departmentId: selectedDept.id,
      departmentName: selectedDept.name,
      speciality: selectedDept.name,
      qualification: data.qualification || 'MBBS, MD',
      experience: data.experience || '5',
      fee: data.fee || 500,
      img: imgUrl,
    };

    fetch(`${BASE_URL}/doctor`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(doctor),
    })
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted.insertedId) {
          toast.success(`Successfully added Dr. ${data.name}!`);
          reset();
        } else {
          toast.error('Failed to add doctor');
        }
      });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Add New Doctor
        </h2>
        <p className="text-xs text-slate-500">Register a medical specialist to a department</p>
      </div>

      <Card className="border-slate-200/80 shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-teal-600" /> Doctor Profile Details
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Fill in the specialist details to list them on the appointment booking page.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Grid: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="doc-name">Doctor Full Name *</Label>
                <Input
                  id="doc-name"
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  {...register("name", { required: "Doctor Name is required" })}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="doc-email">Email Address *</Label>
                <Input
                  id="doc-email"
                  type="email"
                  placeholder="dr.sarah@medicare.com"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            {/* Grid: Department + Fee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="doc-dept">Department *</Label>
                <select
                  id="doc-dept"
                  {...register("departmentId")}
                  className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="doc-fee">Consultation Fee (৳) *</Label>
                <Input
                  id="doc-fee"
                  type="number"
                  placeholder="500"
                  defaultValue="500"
                  {...register("fee", { required: "Fee is required" })}
                />
              </div>
            </div>

            {/* Grid: Qualification + Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="doc-qual">Qualification *</Label>
                <Input
                  id="doc-qual"
                  type="text"
                  placeholder="e.g. MBBS, FCPS, MD"
                  defaultValue="MBBS, MD"
                  {...register("qualification", { required: "Qualification is required" })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="doc-exp">Years of Experience *</Label>
                <Input
                  id="doc-exp"
                  type="number"
                  placeholder="8"
                  defaultValue="5"
                  {...register("experience", { required: "Experience is required" })}
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-1.5">
              <Label htmlFor="doc-img">Profile Photo</Label>
              <Input
                id="doc-img"
                type="file"
                accept="image/*"
                className="cursor-pointer"
                {...register("image")}
              />
            </div>

            <Button type="submit" className="w-full gap-2 font-semibold mt-4" style={{ background: '#0D9488' }}>
              <UploadCloud className="h-4 w-4" /> Save Doctor Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDoctor;