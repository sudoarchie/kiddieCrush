'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heart, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    instagram: '',
    twitter: '',
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
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Full Name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            
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
                type="email"
                placeholder="Email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <Input
                placeholder="Instagram Username (Optional)"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              />
            </div>
            
            <div className="relative">
              <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <Input
                placeholder="X/Twitter Username (Optional)"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
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
              Sign Up
            </Button>
          </form>
          
          <p className="text-white/80 text-center mt-6">
            Already have an account?{' '}
            <Link href="/signin" className="text-white hover:text-pink-200 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}