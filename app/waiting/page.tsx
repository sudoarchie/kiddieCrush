'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function WaitingPage() {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const now = new Date();
    const valentinesDay = new Date(now.getFullYear(), 1, 14); // February is month 1 (0-indexed)
    
    if (now > valentinesDay) {
      valentinesDay.setFullYear(now.getFullYear() + 1);
    }

    const difference = valentinesDay.getTime() - now.getTime();
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
            Counting Down to Valentine's Day 💖
          </h1>
          
          {timeRemaining.days >= 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8 px-4">
              <div className="bg-white/10 p-3 md:p-4 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-white">{timeRemaining.days}</div>
                <div className="text-white/80 text-sm md:text-base">Days</div>
              </div>
              <div className="bg-white/10 p-3 md:p-4 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-white">{timeRemaining.hours}</div>
                <div className="text-white/80 text-sm md:text-base">Hours</div>
              </div>
              <div className="bg-white/10 p-3 md:p-4 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-white">{timeRemaining.minutes}</div>
                <div className="text-white/80 text-sm md:text-base">Minutes</div>
              </div>
              <div className="bg-white/10 p-3 md:p-4 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-white">{timeRemaining.seconds}</div>
                <div className="text-white/80 text-sm md:text-base">Seconds</div>
              </div>
            </div>
          ) : (
            <div className="text-2xl font-bold text-white py-8">
              Happy Valentine's Day! 🎉
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-base md:text-lg"
          >
            The wait will be worth it! 💌
            <div className="mt-4 animate-pulse">
              ❤️🧡💛💚💙💜
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 