'use client'

import Link from 'next/link';
import { useState } from 'react';
import { Heart, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

// Note: Removed unused imports (useForm, zodResolver, useMutation, axios, z)
// as they're causing errors since the required libraries aren't available

interface FormData {
  name?: string;
  email?: string;
  username: string;
  password: string;
  instagram?: string;
  twitter?: string;
}

export default function AuthPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<'signin' | 'signup'>('signin');
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (data: FormData): boolean => {
    const errors: Partial<Record<keyof FormData, string>> = {};

    if (activeView === 'signup') {
      if (!data.name || data.name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
      }
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Invalid email address';
      }
      if (!data.username || data.username.length < 3 || data.username.length > 20) {
        errors.username = 'Username must be between 3 and 20 characters';
      }
      if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
        errors.username = 'Invalid characters in username';
      }
      if (!data.password || data.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
   
    } else {
      if (!data.username) {
        errors.username = 'Username is required';
      }
      if (!data.password) {
        errors.password = 'Password is required';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data: FormData = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    if (activeView === 'signup') {
      data.name = formData.get('name') as string;
      data.email = formData.get('email') as string;
      data.instagram = formData.get('instagram') as string;
      data.twitter = formData.get('twitter') as string;
    }

    if (!validateForm(data)) {
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = activeView === 'signup' ? '/api/signup' : '/api/signin';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(
          activeView === 'signup' 
            ? 'Account created! Your account has been successfully created'
            : 'Welcome back! You have been logged in',
          {
            duration: 4000,
            position: 'bottom-center',
            style: {
              background: '#4CAF50',
              color: '#fff',
            },
          }
        );
        router.push('/home');
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Authentication failed',
        {
          duration: 4000,
          position: 'bottom-center',
          style: {
            background: '#FF5252',
            color: '#fff',
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <Toaster />
      <div className="w-16 h-16 text-white mb-4 mx-auto">
        <Heart strokeWidth={1.5} className="w-full h-full" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">KiddieCrush</h1>
      <p className="text-white/90 text-lg mb-8">Find out if your crush likes you back! 💝</p>

      <div className="w-full max-w-md">
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="flex gap-4 mb-8 relative">
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-white"
              initial={false}
              animate={{
                left: activeView === 'signin' ? '0%' : '50%'
              }}
              transition={{ duration: 0.3 }}
            />
            <Button
              type="button"
              onClick={() => {
                setActiveView('signup');
                setFormErrors({});
              }}
              className={cn(
                'flex-1 transition-colors',
                activeView === 'signup' 
                  ? 'bg-white text-pink-600' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              )}
            >
              Sign Up
            </Button>
            <Button
              type="button"
              onClick={() => {
                setActiveView('signin');
                setFormErrors({});
              }}
              className={cn(
                'flex-1 transition-colors',
                activeView === 'signin' 
                  ? 'bg-white text-pink-600' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              )}
            >
              Sign In
            </Button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={activeView}
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeView === 'signup' && (
                <>
                  <Input
                    name="name"
                    placeholder="Full Name"
                    className={cn(
                      'bg-white/10 text-white placeholder:text-white/60 border-white/20',
                      formErrors.name && 'border-red-500/50 focus-visible:ring-red-500'
                    )}
                    aria-invalid={!!formErrors.name}
                    aria-errormessage={formErrors.name}
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={cn(
                      'bg-white/10 text-white placeholder:text-white/60 border-white/20',
                      formErrors.email && 'border-red-500/50 focus-visible:ring-red-500'
                    )}
                    aria-invalid={!!formErrors.email}
                    aria-errormessage={formErrors.email}
                  />
                </>
              )}

              <Input
                name="username"
                placeholder="Username"
                className={cn(
                  'bg-white/10 text-white placeholder:text-white/60 border-white/20',
                  formErrors.username && 'border-red-500/50 focus-visible:ring-red-500'
                )}
                aria-invalid={!!formErrors.username}
                aria-errormessage={formErrors.username}
              />

              {activeView === 'signup' && (
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                    <Input
                      name="instagram"
                      placeholder="Instagram (Optional)"
                      className="bg-white/10 text-white placeholder:text-white/60 border-white/20 pl-10"
                    />
                  </div>
                  <div className="relative flex-1">
                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                    <Input
                      name="twitter"
                      placeholder="Twitter (Optional)"
                      className="bg-white/10 text-white placeholder:text-white/60 border-white/20 pl-10"
                    />
                  </div>
                </div>
              )}

              <Input
                name="password"
                type="password"
                placeholder="Password"
                className={cn(
                  'bg-white/10 text-white placeholder:text-white/60 border-white/20',
                  formErrors.password && 'border-red-500/50 focus-visible:ring-red-500'
                )}
                aria-invalid={!!formErrors.password}
                aria-errormessage={formErrors.password}
              />

              <Button 
                type="submit"
                className="w-full bg-white text-pink-600 hover:bg-white/90"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : (activeView === 'signin' ? 'Sign In' : 'Sign Up')}
              </Button>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}