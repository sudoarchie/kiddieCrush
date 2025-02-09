'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'

type MatchResult = {
  id: number
  name: string
  username: string
  avatar: string
}

export default function ResultsPage() {
  const [matches, setMatches] = useState<MatchResult[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/matches')
        const data = await response.json()
        
        if (data.matches.length > 0) {
          setMatches(data.matches)
        } else {
          toast({
            title: "No matches yet",
            description: "Check back later when your crushes respond!",
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error loading matches",
          description: "Failed to fetch match results",
        })
      }
    }
    fetchMatches()
  }, [toast])

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-xl text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">
            Your Matches 💞
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map((match) => (
              <motion.div
                key={match.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white/10 p-4 rounded-xl flex items-center gap-4"
              >
                <Image
                  src={match.avatar}
                  alt="Match avatar"
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-pink-300"
                />
                <div className="text-left">
                  <h3 className="text-white font-medium text-lg">{match.name}</h3>
                  <p className="text-white/60">@{match.username}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
} 