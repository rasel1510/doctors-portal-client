import React from 'react';
import {
  useSignInWithGoogle,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useUpdateProfile
} from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Stethoscope, UserPlus } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
  const [signInWithGoogle, gUser, gError, gLoading] = useSignInWithGoogle(auth);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, UpdateError] = useUpdateProfile(auth);
  const [token] = useToken(gUser || user);
  const [sendEmailVerification, emailVarifySending, VarifyError] = useSendEmailVerification(auth);

  const navigate = useNavigate();

  if (gLoading || loading || updating || emailVarifySending) {
    return <Loading />;
  }

  if (token) {
    navigate('/appointment');
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    await sendEmailVerification();
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-sky-300/20 blur-3xl rounded-full pointer-events-none" />

      <Card className="w-full max-w-md border-slate-200/80 shadow-xl bg-white/90 backdrop-blur-md rounded-2xl relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-white shadow-md mb-2">
            <Stethoscope className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">Create Account</CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Join Doctors Portal for fast healthcare scheduling
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name", {
                  required: { value: true, message: "Full Name is required" }
                })}
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
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

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
              />
              {errors.password && (
                <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>
              )}
            </div>

            {/* Error Message */}
            {(error || gError || UpdateError || VarifyError) && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                {error?.message || gError?.message || UpdateError?.message || VarifyError?.message}
              </div>
            )}

            <Button type="submit" className="w-full gap-2 text-base font-semibold py-5">
              <UserPlus className="h-4 w-4" />
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-medium">Or register with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            type="button"
            variant="outline"
            onClick={() => signInWithGoogle()}
            className="w-full gap-2 py-5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="justify-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Already have an account?&nbsp;
          <Link to="/login" className="font-bold text-sky-600 hover:underline">
            Please login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;