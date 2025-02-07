'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heart, Search, X } from 'lucide-react';
import Link from 'next/link';

// Mock data for user search - replace with actual API call
const mockUsers = [
  { id: 1, username: 'emma_wilson', name: 'Emma Wilson' },
  { id: 2, username: 'alex_smith', name: 'Alex Smith' },
  { id: 3, username: 'james_brown', name: 'James Brown' },
];

export default function Crushes() {
  const [crushes, setCrushes] = useState<Array<{ id: number; username: string; name: string }>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  const [activeInput, setActiveInput] = useState<number | null>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 0) {
      const results = mockUsers.filter(
        user => 
          user.username.toLowerCase().includes(term.toLowerCase()) ||
          user.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const addCrush = (user: any) => {
    if (crushes.length < 3 && !crushes.find(crush => crush.id === user.id)) {
      setCrushes([...crushes, user]);
      setSearchTerm('');
      setSearchResults([]);
      setActiveInput(null);
    }
  };

  const removeCrush = (userId: number) => {
    setCrushes(crushes.filter(crush => crush.id !== userId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (to be implemented)
    console.log('Submitted crushes:', crushes);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-4 left-4 text-white hover:text-pink-200 transition-colors">
        <div className="w-8 h-8">
          <Heart strokeWidth={1.5} />
        </div>
      </Link>
      
      <div className="w-full max-w-md">
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Add Your Crushes</h2>
          <p className="text-white/80 text-center mb-6">Select up to 3 people you like</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selected Crushes */}
            <div className="space-y-3">
              {crushes.map((crush, index) => (
                <div
                  key={crush.id}
                  className="flex items-center bg-white/10 rounded-lg p-3 pr-4"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">{crush.name}</p>
                    <p className="text-white/60 text-sm">@{crush.username}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCrush(crush.id)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Search Input */}
            {crushes.length < 3 && (
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input
                    placeholder="Search for someone..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setActiveInput(crushes.length)}
                  />
                </div>

                {/* Search Results Dropdown */}
                {searchResults.length > 0 && activeInput !== null && (
                  <div className="absolute w-full mt-2 bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden border border-white/20">
                    {searchResults.map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors text-white"
                        onClick={() => addCrush(user)}
                      >
                        <p className="font-medium">{user.name}</p>
                        <p className="text-white/60 text-sm">@{user.username}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full bg-white text-pink-600 hover:bg-white/90 transition-colors"
              disabled={crushes.length === 0}
            >
              {crushes.length > 0 ? 'Submit Your Crushes' : 'Add at least one crush'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Don&apos;t worry, we&apos;ll only let them know if they like you back!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}