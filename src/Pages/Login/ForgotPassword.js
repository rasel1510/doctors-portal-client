import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
  const navigate = useNavigate();

  if (sending) {
    return <Loading />;
  }

  const onSubmit = async (data) => {
    await sendPasswordResetEmail(data.email);
    toast.success("Password reset email sent. Please check your inbox!");
    navigate('/login');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-sky-400/20 to-indigo-300/20 blur-3xl rounded-full pointer-events-none" />

      <Card className="w-full max-w-md border-slate-200/80 shadow-xl bg-white/90 backdrop-blur-md rounded-2xl relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 text-white shadow-md mb-2">
            <KeyRound className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">Reset Password</CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Registered Email</Label>
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

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                {error.message}
              </div>
            )}

            <Button type="submit" className="w-full gap-2 text-base font-semibold py-5">
              Send Reset Link
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <Link to="/login" className="flex items-center gap-1.5 font-bold text-sky-600 hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;