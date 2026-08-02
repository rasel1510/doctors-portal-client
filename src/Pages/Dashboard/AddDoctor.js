import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import doctors_consult from '../../assets/images/doctors_consult.jpg';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, UploadCloud } from 'lucide-react';

const AddDoctor = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  const { data: services, isLoading } = useQuery('services', () =>
    fetch('https://doctors-portal-server-psi.vercel.app/service').then((res) => res.json())
  );

  const imageStorageKey = '6d4c293ef648418de727023b7d745a1b';

  const onSubmit = async (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const doctor = {
            name: data.name,
            img: img,
            email: data.email,
            speciality: data.speciality,
          };

          fetch('https://doctors-portal-server-psi.vercel.app/doctor', {
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
        } else {
          toast.error('Failed to upload doctor photo');
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  const serviceList = Array.isArray(services) ? services : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900">Add New Doctor</h2>
        <p className="text-xs text-slate-500">Register a new medical specialist to the portal system</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Form Card */}
        <div className="lg:col-span-7">
          <Card className="border-slate-200/80 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-sky-500" /> Doctor Profile Details
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                All fields are required to display the doctor on the appointment list.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Doctor Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="doc-name">Doctor Full Name</Label>
                  <Input
                    id="doc-name"
                    type="text"
                    placeholder="Dr. Sarah Jenkins"
                    {...register("name", {
                      required: { value: true, message: "Doctor Name is required" }
                    })}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>
                  )}
                </div>

                {/* Doctor Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="doc-email">Email Address</Label>
                  <Input
                    id="doc-email"
                    type="email"
                    placeholder="dr.sarah@doctorsportal.com"
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                      pattern: {
                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        message: 'Provide a valid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>
                  )}
                </div>

                {/* Specialization */}
                <div className="space-y-1.5">
                  <Label htmlFor="doc-spec">Specialization Area</Label>
                  <select
                    id="doc-spec"
                    {...register("speciality")}
                    className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {serviceList.map((service) => (
                      <option key={service._id} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Photo Upload */}
                <div className="space-y-1.5">
                  <Label htmlFor="doc-img">Profile Photo</Label>
                  <Input
                    id="doc-img"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer file:text-sky-600 file:font-semibold"
                    {...register("image", {
                      required: { value: true, message: "Image photo is required" }
                    })}
                  />
                  {errors.image && (
                    <p className="text-xs text-red-500 font-medium">{errors.image.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full gap-2 font-semibold mt-4">
                  <UploadCloud className="h-4 w-4" /> Save Doctor Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Side Image Illustration */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <img src={doctors_consult} alt="Doctor Consultation" className="w-full object-cover h-[440px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-6">
              <p className="text-white text-xs font-medium leading-relaxed">
                Adding verified healthcare professionals ensures patients get high quality specialized consultations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;