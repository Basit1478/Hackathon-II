'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { LoadingOverlay } from '@/components/ui/LoadingComponents';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, initialize } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    initialize();

    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      router.push('/dashboard');
    }

    // Set a small timeout to hide the loading indicator after initialization
    const timer = setTimeout(() => {
      setIsLoadingAuth(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router, initialize]);

  // Don't render the landing page until we know auth status
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-900 dark:text-white text-lg">Loading...</div>
      </div>
    );
  }

  // If user is authenticated, don't show landing page
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-900 dark:text-white text-lg">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900 dark:text-white overflow-hidden">
      <LoadingOverlay show={isLoadingAuth} message="Initializing..." />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent"
          >
            TaskMaster Pro
          </motion.div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <Button
                variant="outline"
                className="border-gray-300 dark:border-white/30 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 backdrop-blur-sm"
              >
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between pt-20 pb-16">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Master
              </span>{' '}
              <br />
              <span className="text-gray-900 dark:text-white">Your Tasks</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              The ultimate task management app designed for Gen Z productivity.
              Organize, prioritize, and crush your goals with style and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-6 text-lg font-semibold">
                  Get Started - It's Lit! 🔥
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-white/30 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg font-semibold"
                >
                  Already a User?
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl shadow-2xl transform rotate-6"></div>
              <div className="absolute inset-0 w-80 h-80 bg-gradient-to-br from-pink-400 to-cyan-400 rounded-2xl shadow-2xl transform -rotate-6"></div>
              <div className="absolute inset-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-200 dark:border-white/20">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    ✨
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">TaskMaster Pro</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Your productivity, reimagined</p>
                </div>
                <div className="w-full space-y-3">
                  <div className="flex items-center p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-900 dark:text-white text-sm">Add new task</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                    <div className="w-4 h-4 bg-gray-400 dark:bg-gray-500 rounded-full mr-3"></div>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">Review notes</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                    <div className="w-4 h-4 bg-gray-400 dark:bg-gray-500 rounded-full mr-3"></div>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">Check messages</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          className="py-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why TaskMaster Pro?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Designed specifically for Gen Z productivity needs with modern features and aesthetics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Lightning Fast',
                description: 'Blazing fast performance that keeps up with your workflow',
                emoji: '⚡'
              },
              {
                title: 'Aesthetic Design',
                description: 'Beautiful UI that makes task management enjoyable',
                emoji: '✨'
              },
              {
                title: 'Smart Organization',
                description: 'Intelligent features to keep you on track',
                emoji: '🧠'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/20 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="py-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Master Your Tasks?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of Gen Z users who have transformed their productivity with TaskMaster Pro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-gray-300 dark:border-white/30 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 dark:text-gray-400">
          <p>© 2026 TaskMaster Pro. Built for Gen Z productivity.</p>
        </footer>
      </div>

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
