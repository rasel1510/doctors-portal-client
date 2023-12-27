import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSendEmailVerification } from 'react-firebase-hooks/auth';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form"
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';


const SignUp = () => {
    const [signInWithGoogle, gUser, gError, gLoading] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm() // hook form 
    // for user create account with email and password
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    // user update profile then navigate 
    const [updateProfile, updating, UpdateError] = useUpdateProfile(auth);
    // Varifying user ussing token;
    const [token]=useToken(gUser || user)

    // email varifiacation 
    const [sendEmailVerification, emailVarifySending, VarifyError] = useSendEmailVerification(auth);

    const navigate = useNavigate();

    // displaying SingUp Error in Form using variable
    let SignUperror;

    if (gLoading || loading || updating ||emailVarifySending) {
        return <Loading />;
    }

    if (gError || error || UpdateError ||VarifyError) {
        SignUperror = <p className='text-red-500'><small>{error?.message || gError?.message || UpdateError?.message}</small></p>;
    }


    if (token) {

       navigate("/appointment")
    }

    const onSubmit = async (data) => {
        console.log(data)
       
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ name: data.name })
        const success = await sendEmailVerification();
        if (success) {
          alert('Sent email Varify Its Your !');
        }
        //now navigate to appointment
       
    }




    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100  shadow-xl text-primary-content">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Sign Up</h2>


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

                        {/*This is for Password input field */}

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Enter more than 6 charecters'
                                    }
                                })}
                            />

                            <div className="label">
                                {errors.password?.type === "required" && <span className="label-text text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === "minLength" && <span className="label-text text-red-500">{errors.password.message}</span>}

                            </div>
                        </label>

                        {SignUperror}
                        <input className="btn mb-2 w-full max-w-xs text-white   btn-neutral" type="submit" value="Sign Up" />
                        <p><small>All ready have an account? <Link className='text-secondary' to="/login">Please login</Link></small></p>
                    </form>



                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline">Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;