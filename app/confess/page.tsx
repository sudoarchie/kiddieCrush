"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const gifs = [
  '/0.gif',
  '/1.gif',
  '/2.gif',
  '/3.gif',
  '/4.gif'
];

const messages = [
  "Ooh, getting handsy already? 😏",
  "Can't catch me!",
  "First try!",
  "Getting warm!",
  "So close!",
  "Almost there!",
  "Persistent, aren't we?",
  "Okay, this is getting serious",
  "I'm starting to doubt your dedication...",
  "Maybe try from the other side?",
  "This is the last message... PSYCHE!",
];

export default function ValentinePage() {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [attempts, setAttempts] = useState(0);
  const [gifIndex, setGifIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    // Initialize window size
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial window size
    updateWindowSize();

    // Add resize listener
    window.addEventListener('resize', updateWindowSize);

    // Set initial button position to be next to "Yes" button
    setPosition({
      x: window.innerWidth / 2 + 120,  // Offset from center
      y: window.innerHeight / 2        // Vertically centered
    });

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const moveButton = () => {
    const buttonWidth = 116;  // Width of button including padding
    const buttonHeight = 56;  // Height of button including padding
    const padding = 20;      // Minimum padding from screen edges
    
    // Calculate new random position while keeping button fully visible
    const newX = Math.random() * (windowSize.width - buttonWidth - padding * 2) + padding;
    const newY = Math.random() * (windowSize.height - buttonHeight - padding * 2) + padding;
    
    setPosition({ x: newX, y: newY });
    setGifIndex(prev => {
      const newIndex = prev + 1;
      setCurrentMessage(messages[newIndex % messages.length]);
      return newIndex;
    });
  };

  const handleNoClick = () => {
    moveButton();
    setAttempts(prev => prev + 1);
  };

  const handleYes = () => {
    router.push('confess/thank-you');
  };

  if (attempts > 5) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
        <h1 className="text-4xl mb-8 text-rose-600 font-bold text-center px-4">
          The universe wants you to say Yes! 🌌
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 relative overflow-hidden">
      <div className="flex flex-col items-center px-4 max-w-2xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl mb-6 md:mb-8 text-rose-600 font-bold text-center">
          Hey! I have a crush on you... will you be my Valentine? 💘
        </h1>
        
        <div className="mb-6 md:mb-8 relative w-full max-w-[320px] aspect-square">
          <Image
            src={gifs[gifIndex % gifs.length]}
            alt="Cute reaction GIF"
            fill
            className="rounded-lg shadow-lg object-cover"
            unoptimized
          />
        </div>
          <p className="text-center mt-4 text-base md:text-lg font-semibold text-rose-600 animate-bounce px-2">
            {gifIndex === 0 ? 
              "Bet you can't catch me 😘" : 
              `${currentMessage} `}
          </p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full justify-center items-center">
          <Link href={'/confess/thank-you'} className="w-full md:w-auto">
            <button className="w-full px-6 py-3 md:px-8 md:py-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-lg font-semibold">
              Yes! 😍
            </button>
          </Link>
          
          <button
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            onClick={handleNoClick}
            style={{
              position: 'absolute',
              left: `${position.x}px`,
              top: `${position.y}px`,
              transition: 'all 0.3s ease',
            }}
            className="px-6 py-3 md:px-8 md:py-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all text-lg font-semibold whitespace-nowrap"
          >
            No 😢
          </button>
        </div>
      </div>
    </div>
  );
}