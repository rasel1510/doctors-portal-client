import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, ArrowLeft, Loader2, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const success = await sendPasswordResetEmail(data.email);
    if (success !== false) {
      toast.success("Password reset email sent. Please check your inbox!");
      navigate('/login');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative bg-slate-50/50">
      <Card className="w-full max-w-md border-slate-200/80 shadow-xl bg-white rounded-3xl p-1 sm:p-2 relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg mb-2" style={{ background: '#0D9488' }}>
            <KeyRound className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-bold text-slate-900">Reset Password</CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Enter your registered email to receive a password reset link
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-700">Registered Email</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                enterKeyHint="send"
                placeholder="name@example.com"
                className="h-11 rounded-xl border-slate-200 focus:border-teal-500 text-sm"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                {error.message.replace(/^Firebase:\s*/i, '')}
              </div>
            )}

            <Button
              type="submit"
              disabled={sending}
              className="w-full font-bold h-11 text-sm rounded-xl text-white shadow-md active:scale-[0.99] transition-all"
              style={{ background: '#0D9488' }}
            >
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending Link...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" /> Send Reset Link
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <Link to="/login" className="flex items-center gap-1.5 font-bold text-teal-600 hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;