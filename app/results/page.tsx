'use client'
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Mock data - replace with actual data source
const userData = {
  name: "John Doe",
  avatar: "/avatars/user.png",
  email: "john@example.com",
  topCrush: {
    name: "Crush",
    matchPercentage: 98,
    avatar: "/avatars/crush.png"
  }
};

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-xl text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">
            Your Perfect Match! 💞
          </h1>

          {/* Paired Avatars Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8 md:mb-12">
            {/* User Avatar */}
            <motion.div
              initial={{ scale: 0, x: -100 }}
              animate={{ scale: 1, x: 0 }}
              className="relative mb-4 md:mb-0"
            >
              <Image
                src={userData.avatar}
                alt="Your avatar"
                width={100}
                height={100}
                className="rounded-full border-4 border-blue-300 w-24 h-24 md:w-32 md:h-32"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-2 py-1 text-sm md:px-4 md:py-1 md:text-base rounded-full">
                You
              </div>
            </motion.div>

            {/* Heart Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-6xl mx-2 md:mx-4"
            >
              ❤️
              <div className="text-xl md:text-2xl font-bold text-white mt-1 md:mt-2">
                {userData.topCrush.matchPercentage}% Match!
              </div>
            </motion.div>

            {/* Crush Avatar */}
            <motion.div
              initial={{ scale: 0, x: 100 }}
              animate={{ scale: 1, x: 0 }}
              className="relative mt-4 md:mt-0"
            >
              <Image
                src={userData.topCrush.avatar}
                alt={userData.topCrush.name}
                width={100}
                height={100}
                className="rounded-full border-4 border-pink-300 w-24 h-24 md:w-32 md:h-32"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-2 py-1 text-sm md:px-4 md:py-1 md:text-base rounded-full">
                {userData.topCrush.name}
              </div>
            </motion.div>
          </div>

          {/* Compatibility Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/10 p-4 md:p-6 rounded-xl mb-6 md:mb-8 text-left space-y-4"
          >
            <div className="text-white">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Compatibility Breakdown</h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span>Interest Match</span>
                  <span className="font-bold">95%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full" 
                    style={{ width: '95%' }}
                  />
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span>Personality Match</span>
                  <span className="font-bold">89%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: '89%' }}
                  />
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span>Chemistry Score</span>
                  <span className="font-bold">98%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-pink-400 h-2 rounded-full" 
                    style={{ width: '98%' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 md:mt-8 flex flex-col md:flex-row justify-center gap-3 md:gap-4"
          >
            <Button className="bg-pink-500 hover:bg-pink-600 text-white text-base md:text-lg px-6 py-3 md:px-8 md:py-4 rounded-xl w-full md:w-auto">
              Send Message 💌
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white text-base md:text-lg px-6 py-3 md:px-8 md:py-4 rounded-xl w-full md:w-auto">
              Share Match 🎉
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 