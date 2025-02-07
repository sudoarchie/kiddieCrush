import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="w-16 h-16 text-white mb-4 mx-auto">
          <Heart strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">KiddieCrush</h1>
        <p className="text-white/90 text-lg">Find out if your crush likes you back! 💝</p>
      </div>
      
      <div className="w-full max-w-md">
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="flex gap-4 mb-8">
            <Link 
              href="/signup" 
              className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-center transition-colors"
            >
              Sign Up
            </Link>
            <Link 
              href="/signin" 
              className="flex-1 bg-white text-pink-600 py-2 rounded-lg text-center transition-colors hover:bg-white/90"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}