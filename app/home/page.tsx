'use client'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  username: string;
  name: string;
  avatar: string;
};

export default function HomePage() {
  const [crushes, setCrushes] = useState<string[]>(['']);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [activeSearch, setActiveSearch] = useState<number | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const searchUsers = async () => {
      const searchTerm = crushes[activeSearch ?? 0] || '';
      if (searchTerm.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(`/api/users?search=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        setSearchResults(data.users || []);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Search failed',
          description: 'Could not fetch users',
        });
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [crushes, activeSearch, toast]);

  const handleSearch = (index: number, value: string) => {
    const newCrushes = [...crushes];
    newCrushes[index] = value;
    setCrushes(newCrushes);
    setActiveSearch(index);
  };

  const handleSelectCrush = (index: number, user: User) => {
    const newCrushes = [...crushes];
    newCrushes[index] = user.name;
    setCrushes(newCrushes);
    
    const newSelectedUsers = [...selectedUsers];
    newSelectedUsers[index] = user;
    setSelectedUsers(newSelectedUsers);
    
    setActiveSearch(null);
    setSearchResults([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/crushes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crushes: selectedUsers.filter(u => u?.id).map(u => u.id) })
      });

      if (!response.ok) throw new Error('Failed to save crushes');
      
      router.push('/waiting');
      
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error saving crushes',
        description: 'There was a problem saving your crushes',
      });
    }
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
            Who are your crushes? 😍
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {crushes.map((crush, index) => (
              <div key={index} className="relative">
                <Input
                  placeholder={`Crush #${index + 1}`}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-lg py-6"
                  value={crush}
                  onChange={(e) => handleSearch(index, e.target.value)}
                />
                {activeSearch === index && (searchResults?.length ?? 0) > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 w-full mt-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg"
                  >
                    {searchResults.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => handleSelectCrush(index, user)}
                        className="p-3 hover:bg-pink-100/50 cursor-pointer transition-colors text-pink-900 flex items-center gap-3"
                      >
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm">@{user.username}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {crushes.length < 3 && (
              <Button
                type="button"
                onClick={() => setCrushes([...crushes, ''])}
                className="w-full bg-white/20 text-white hover:bg-white/30 text-lg py-6 rounded-xl"
              >
                Add +
              </Button>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                type="submit"
                className="w-full bg-white text-pink-600 hover:bg-white/90 text-lg py-6 rounded-xl"
                disabled={!selectedUsers.some(user => user?.id)}
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