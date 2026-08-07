import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import Loading from '../Shared/Loading';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { LogIn, Mail, Lock, Stethoscope } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [token] = useToken(user || gUser);

  let signInError;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  if (loading || gLoading) {
    return <Loading />;
  }

  if (error || gError) {
    signInError = <p className="text-xs text-red-500 font-semibold text-center">{error?.message || gError?.message}</p>;
  }

  const onSubmit = data => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg" style={{ background: '#0D9488' }}>
            <Stethoscope className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Welcome Back to <span style={{ color: '#0D9488' }}>MediCare Pro</span>
          </h2>
          <p className="text-xs text-slate-500">Sign in to manage your appointments and health records</p>
        </div>

        <Card className="border-slate-200/80 shadow-xl bg-white rounded-3xl p-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-slate-900 text-center">Account Login</CardTitle>
            <CardDescription className="text-xs text-slate-500 text-center">
              Enter your registered credentials below
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-teal-600" /> Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  {...register("email", {
                    required: { value: true, message: 'Email is Required' },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: 'Provide a valid Email'
                    }
                  })}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-teal-600" /> Password
                  </Label>
                  <Link to="/forgotpassword" className="text-xs font-semibold text-teal-600 hover:underline">
                    Forgot?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: { value: true, message: 'Password is Required' },
                    minLength: { value: 6, message: 'Must be 6 characters or longer' }
                  })}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>

              {signInError}

              <Button type="submit" className="w-full font-bold h-11 text-sm rounded-xl" style={{ background: '#0D9488' }}>
                <LogIn className="h-4 w-4 mr-2" /> Sign In
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                New to MediCare Pro?{' '}
                <Link to="/singup" className="font-bold text-teal-600 hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-semibold">Or continue with</span></div>
            </div>

            <Button
              onClick={() => signInWithGoogle()}
              variant="outline"
              className="w-full h-11 font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Google Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;