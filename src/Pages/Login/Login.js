import React, { useEffect, useState } from 'react';
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { LogIn, Mail, Lock, Eye, EyeOff, Stethoscope, HelpCircle, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthDomainHelpModal from '@/components/auth/AuthDomainHelpModal';

const getFriendlyErrorMessage = (err) => {
  if (!err) return null;
  const code = err.code || '';
  const message = err.message || '';

  if (code === 'auth/unauthorized-domain' || message.toLowerCase().includes('unauthorized domain') || message.toLowerCase().includes('unauthorized-domain')) {
    return {
      isDomainError: true,
      text: 'This domain/IP is not authorized in your Firebase project. Tap "Domain Setup Help" for 1-step solution.'
    };
  }
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    return { isDomainError: false, text: 'Invalid email or password. Please check your credentials.' };
  }
  if (code === 'auth/popup-closed-by-user') {
    return { isDomainError: false, text: 'Google sign-in popup was closed before completing.' };
  }
  if (code === 'auth/popup-blocked') {
    return { isDomainError: false, text: 'Pop-up blocked by browser. Please allow popups or tap sign-in again.' };
  }
  return { isDomainError: false, text: message.replace(/^Firebase:\s*/i, '') };
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [authUser] = useAuthState(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [token] = useToken(user || gUser || authUser);
  const navigate = useNavigate();
  const location = useLocation();

  let targetPath = location.state?.from?.pathname;
  if (!targetPath || targetPath === '/' || targetPath === '/login' || targetPath === '/singup') {
    targetPath = '/appointment';
  }

  const activeError = error || gError;
  const errorInfo = getFriendlyErrorMessage(activeError);

  useEffect(() => {
    if (token || user || gUser || authUser) {
      navigate(targetPath, { replace: true });
    }
  }, [token, user, gUser, authUser, navigate, targetPath]);

  // Automatically trigger domain help modal if unauthorized domain error detected
  useEffect(() => {
    if (errorInfo?.isDomainError) {
      setIsHelpOpen(true);
    }
  }, [errorInfo]);

  const onSubmit = data => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  // Fast Auto-fill for mobile testing
  const handleQuickDemo = (demoEmail, demoPass) => {
    setValue('email', demoEmail, { shouldValidate: true });
    setValue('password', demoPass, { shouldValidate: true });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="w-full max-w-md space-y-5">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg shadow-teal-500/20" style={{ background: '#0D9488' }}>
            <Stethoscope className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome Back to <span style={{ color: '#0D9488' }}>MediCare Pro</span>
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Fast, secure medical portal sign in for appointments & health records
          </p>
        </div>

        <Card className="border-slate-200/80 shadow-xl bg-white rounded-3xl p-1 sm:p-2">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-lg font-bold text-slate-900">Account Login</CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Enter your registered credentials or continue with Google
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            
            {/* Display Friendly Error Alert */}
            {errorInfo && (
              <div className={`p-3.5 rounded-2xl border text-xs flex items-start gap-2.5 transition-all ${
                errorInfo.isDomainError 
                  ? 'bg-amber-50 border-amber-200 text-amber-900' 
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <AlertTriangle className={`h-4 w-4 shrink-0 mt-0.5 ${errorInfo.isDomainError ? 'text-amber-600' : 'text-red-500'}`} />
                <div className="flex-1 space-y-1">
                  <p className="font-semibold leading-relaxed">{errorInfo.text}</p>
                  {errorInfo.isDomainError && (
                    <button
                      type="button"
                      onClick={() => setIsHelpOpen(true)}
                      className="text-[11px] font-bold text-amber-800 underline hover:text-amber-950 flex items-center gap-1 mt-1"
                    >
                      <HelpCircle className="h-3 w-3" /> View 1-Step Domain Fix Instructions
                    </button>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-teal-600" /> Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="your.email@example.com"
                  className="h-11 rounded-xl border-slate-200 focus:border-teal-500 text-sm"
                  {...register("email", {
                    required: { value: true, message: 'Email is required' },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Provide a valid email address'
                    }
                  })}
                />
                {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
              </div>

              {/* Password Input with Visibility Toggle */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-teal-600" /> Password
                  </Label>
                  <Link to="/forgotpassword" className="text-xs font-semibold text-teal-600 hover:underline">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    enterKeyHint="go"
                    placeholder="••••••••"
                    className="h-11 rounded-xl border-slate-200 focus:border-teal-500 text-sm pr-10"
                    {...register("password", {
                      required: { value: true, message: 'Password is required' },
                      minLength: { value: 6, message: 'Must be 6 characters or longer' }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>}
              </div>

              {/* Submit Button with Inline Loading */}
              <Button
                type="submit"
                disabled={loading || gLoading}
                className="w-full font-bold h-11 text-sm rounded-xl text-white transition-all shadow-md active:scale-[0.99]"
                style={{ background: '#0D9488' }}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" /> Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-1">
              <p className="text-xs text-slate-500">
                New to MediCare Pro?{' '}
                <Link to="/singup" className="font-bold text-teal-600 hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-semibold">Or continue with</span></div>
            </div>

            {/* Google Sign In Button with Inline Loading */}
            <Button
              type="button"
              onClick={() => signInWithGoogle()}
              disabled={loading || gLoading}
              variant="outline"
              className="w-full h-11 font-semibold text-slate-700 hover:bg-slate-50 rounded-xl border-slate-200 active:scale-[0.99] transition-all"
            >
              {gLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-teal-600" /> Connecting Google...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Google Login
                </>
              )}
            </Button>

            {/* Quick Demo Fill & Domain Help Launcher */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <button
                type="button"
                onClick={() => handleQuickDemo('patient@gmail.com', '123456')}
                className="font-medium text-slate-600 hover:text-teal-600 flex items-center gap-1 py-1"
              >
                <Sparkles className="h-3 w-3 text-amber-500" /> Auto-fill Demo Account
              </button>

              <button
                type="button"
                onClick={() => setIsHelpOpen(true)}
                className="font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 py-1"
              >
                <HelpCircle className="h-3 w-3 text-sky-600" /> Domain Help
              </button>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Domain Authorization Diagnostic Modal */}
      <AuthDomainHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
};

export default Login;