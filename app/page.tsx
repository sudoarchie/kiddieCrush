'use client'
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activeView, setActiveView] = useState<'signin' | 'signup'>('signin');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    instagram: '',
    twitter: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="w-16 h-16 text-white mb-4 mx-auto">
        <Heart strokeWidth={1.5} className="w-full h-full" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">KiddieCrush</h1>
      <p className="text-white/90 text-lg mb-8">Find out if your crush likes you back! 💝</p>

      <div className="w-full max-w-md">
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="flex gap-4 mb-8 relative">
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
              style={{
                width: `${activeView === 'signin' ? 50 : 50}%`,
                left: `${activeView === 'signin' ? 0 : '50%'}`
              }}
            />
            <Button
              onClick={() => setActiveView('signup')}
              className={`flex-1 transition-colors ${
                activeView === 'signup' ? 'bg-white text-pink-600' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Sign Up
            </Button>
            <Button
              onClick={() => setActiveView('signin')}
              className={`flex-1 transition-colors ${
                activeView === 'signin' ? 'bg-white text-pink-600' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Sign In
            </Button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {activeView === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Input
                      placeholder="Full Name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </motion.div>
                )}

                {activeView === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Input
                      placeholder="Email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Input
                    placeholder="Username"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </motion.div>

                {activeView === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className='flex gap-4'>
                      <div className="relative">
                        <Input
                          placeholder="Instagram Username (Optional)"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 "
                          value={formData.instagram}
                          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        />
                      </div>

                      <div className="relative">
                        <Input
                          placeholder="X/Twitter Username (Optional)"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 "
                          value={formData.twitter}
                          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Input
                    type="password"
                    placeholder="Password"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button 
                    type="submit"
                    className="w-full bg-white text-pink-600 hover:bg-white/90 transition-colors"
                  >
                    {activeView === 'signin' ? 'Sign In' : 'Sign Up'}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </main>
  );
}