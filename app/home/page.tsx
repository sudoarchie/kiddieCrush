'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [crushes, setCrushes] = useState(['', '', '']);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [activeSearch, setActiveSearch] = useState<number | null>(null);

  const handleSearch = (index: number, value: string) => {
    // In a real app, you would fetch search results from an API here
    const mockResults = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William'];
    setSearchResults(mockResults.filter(name => 
      name.toLowerCase().includes(value.toLowerCase())
    ));
    setActiveSearch(index);
    const newCrushes = [...crushes];
    newCrushes[index] = value;
    setCrushes(newCrushes);
  };

  const handleSelectCrush = (index: number, name: string) => {
    const newCrushes = [...crushes];
    newCrushes[index] = name;
    setCrushes(newCrushes);
    setActiveSearch(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle final submission
    console.log('Selected crushes:', crushes);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
        >
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Who are your 3 crushes? 😍
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {[0, 1, 2].map((index) => (
              <div key={index} className="relative">
                <Input
                  placeholder={`Crush #${index + 1}`}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-lg py-6"
                  value={crushes[index]}
                  onChange={(e) => handleSearch(index, e.target.value)}
                />
                {activeSearch === index && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 w-full mt-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg"
                  >
                    {searchResults.map((result) => (
                      <div
                        key={result}
                        onClick={() => handleSelectCrush(index, result)}
                        className="p-3 hover:bg-pink-100/50 cursor-pointer transition-colors text-pink-900"
                      >
                        {result}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                type="submit"
                className="w-full bg-white text-pink-600 hover:bg-white/90 text-lg py-6 rounded-xl"
                disabled={!crushes.every(crush => crush.length > 0)}
              >
                Find My Matches! 💘
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </main>
  );
} 