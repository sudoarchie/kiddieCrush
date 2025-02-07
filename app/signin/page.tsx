'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (to be implemented)
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-4 left-4 text-white hover:text-pink-200 transition-colors">
        <Heart className="w-8 h-8" />
      </Link>
      
      <div className="w-full max-w-md">
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Username"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-white text-pink-600 hover:bg-white/90 transition-colors"
            >
              Sign In
            </Button>
          </form>
          
          <p className="text-white/80 text-center mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-white hover:text-pink-200 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}