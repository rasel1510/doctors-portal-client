import React from 'react';

import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form"
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {


    const { register, formState: { errors }, handleSubmit } = useForm() // hook form 
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
    // displaying SingIn Error in Form using variable
    let SignInerror;

    // for Protected Route Redirecting 
    const navigate = useNavigate();

    if (sending) {
        <Loading></Loading>
    }

    if (error) {
        SignInerror = <p className='text-red-500'><small>{error?.message}</small></p>;
    }





    const onSubmit = async (data) => {
        console.log(data)
        await sendPasswordResetEmail(data.email).then(data => {
            alert("Check Your Email");

        })
        navigate("/login")

    }





    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100  shadow-xl text-primary-content">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Reset Password ! </h2>


                    <form onSubmit={handleSubmit(onSubmit)}>

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





                        {SignInerror}
                        <input className="btn mb-2 w-full max-w-xs text-white   btn-neutral" type="submit" value="Reset" />
                        <p><small><Link className='text-secondary' to="/login">All ready have an account ?</Link></small></p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;