'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { signupSchema, SignupInput } from '@/lib/validations';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { LoadingOverlay } from '@/components/ui/LoadingComponents';
import { ThemeToggle } from '@/components/ThemeToggle';

// Swipe right to left animation
const slideInFromRight = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function SignupPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Attempting signup with:', { name: data.name, email: data.email });

      const response = await authAPI.signup({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      console.log('Signup successful:', response);

      if (!response.user || !response.token) {
        throw new Error('Invalid response from server');
      }

      setAuth(response.user, response.token);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Signup error:', err);
      const errorMessage = err.response?.data?.detail
        || err.response?.data?.message
        || err.message
        || 'An error occurred during signup';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Theme Toggle - Fixed Position */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <LoadingOverlay show={isLoading} message="Creating account..." />

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={slideInFromRight}
        className="w-full max-w-md relative z-10"
      >
        <Card className="backdrop-blur-md bg-white/80 dark:bg-white/10 border-gray-200 dark:border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-2 block">
              TaskMaster Pro
            </Link>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Sign up to start managing your tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-danger/20 border border-danger/50 text-danger text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2 relative">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="bg-gray-100 dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 py-6"
                  {...register('name')}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-danger text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-100 dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 py-6"
                  {...register('email')}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-danger text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="bg-gray-100 dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 py-6 pr-12"
                    {...register('password')}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-danger text-sm">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-200">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="bg-gray-100 dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 py-6 pr-12"
                    {...register('confirmPassword')}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-danger text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>

              <label className="flex items-start space-x-2 text-gray-600 dark:text-gray-300 cursor-pointer">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-primary rounded mt-0.5" />
                <span>I agree to the <Link href="#" className="text-primary hover:underline">Terms & Conditions</Link></span>
              </label>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-6 text-lg font-semibold transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>

              <div className="text-center text-gray-600 dark:text-gray-300 text-sm">
                <p>Already have an account?{' '}
                  <Link href="/login" className="text-primary hover:underline font-semibold">
                    Log in
                  </Link>
                </p>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-transparent px-2 text-gray-500 dark:text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-300 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 py-6"
                  >
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-300 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 py-6"
                  >
                    GitHub
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
