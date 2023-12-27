import React from 'react';
import { useForm } from "react-hook-form"
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import doctors_consult from '../../assets/images/doctors_consult.jpg'


const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm() // hook form 

    const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()));

    const imageStorageKey = '6d4c293ef648418de727023b7d745a1b';


    const onSubmit = async (data) => {
        console.log(data)

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        //  const url=`https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY`
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(result => {
                const img = result.data.url;
                const doctor = {
                    name: data.name,
                    img: img,
                    email: data.email,
                    speciality: data.speciality
                }
                // console.log('imagebb result', result)
                //now send doctor in Backend  that (backend )will store it in database: 
                fetch('http://localhost:5000/doctor', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                    .then(res => res.json())
                    .then(inserted => {
                        if (inserted.insertedId) {
                            toast.success('Successfully Inserted Doctor ');
                            reset();
                        }
                        else {
                            toast.error('Failed to add doctor')
                        }
                    })
            })


    }

    if (isLoading) {
        return <Loading></Loading>
    }

    //7aY-hpCdyK*c2SgairBnb
    return (
        <div>


            <div className='flex h-screen justify-center items-center'>
                <div className="card flex   w-96 bg-base-100  shadow-xl text-primary-content">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold text-center">Add A Doctor</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* THis for name INput field*/}
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Name</span>
                                </div>
                                <input
                                    type="name"
                                    placeholder="Enter Your Name"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Name is required"
                                        }
                                    })}
                                />

                                <div className="label">
                                    {errors.name?.type === "required" && <span className="label-text text-red-500">{errors.name.message}</span>}
                                </div>
                            </label>

                            {/* THis for email INput field*/}
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Email</span>
                                </div>
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is required"
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a Valid email'
                                        }
                                    })}
                                />

                                <div className="label">
                                    {errors.email?.type === "required" && <span className="label-text text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === "pattern" && <span className="label-text text-red-500">{errors.email.message}</span>}

                                </div>
                            </label>

                            {/*This is for Speciality input field */}

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Specialization</span>
                                </div>

                                <select {...register("speciality")} className="select select-bordered w-full max-w-xs">
                                    {
                                        services.map(servce => <option
                                            key={servce._id}
                                            value={services.name}>{servce.name}
                                        </option>)
                                    }
                                </select>

                            </label>

                            {/* INput file*/}
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Photo</span>
                                </div>
                                <input
                                    type="file"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: "Image is required"
                                        }
                                    })}
                                />

                                <div className="label">
                                    {errors.image?.type === "required" && <span className="label-text text-red-500">{errors.image.message}</span>}
                                </div>
                            </label>


                            <input className="btn mt-5 mb-2 w-full max-w-xs text-white   btn-neutral" type="submit" value="ADD" />

                        </form>

                    </div>
                </div>

                <div className='basis-2/4 ml-20'>
                    <img  src={doctors_consult} alt="" />
                </div>

            </div>



        </div>
    );
};

export default AddDoctor;