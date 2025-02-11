'use client'
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <h1 className="text-4xl mb-8 text-rose-600 font-bold text-center">
        Yay! Can't wait to celebrate with you! 💖🎉
      </h1>
      <button
        onClick={() => router.back()}
        className="px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
} 