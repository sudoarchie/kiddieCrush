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
  matchPercentage: number
  commonInterests: string[]
}

export default function ResultsPage() {
  const [match, setMatch] = useState<MatchResult | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/matches')
        const data = await response.json()
        
        if (data.matches.length > 0) {
          setMatch(data.matches[0])
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

  if (!match) return null

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

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8 md:mb-12">
            <motion.div
              initial={{ scale: 0, x: -100 }}
              animate={{ scale: 1, x: 0 }}
              className="relative mb-4 md:mb-0"
            >
              <Image
                src={match.avatar}
                alt="Match avatar"
                width={100}
                height={100}
                className="rounded-full border-4 border-pink-300 w-24 h-24 md:w-32 md:h-32"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-2 py-1 text-sm md:px-4 md:py-1 md:text-base rounded-full">
                {match.name}
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-6xl mx-2 md:mx-4"
            >
              ❤️
              <div className="text-xl md:text-2xl font-bold text-white mt-1 md:mt-2">
                {match.matchPercentage}% Match!
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/10 p-4 md:p-6 rounded-xl mb-6 md:mb-8 text-left space-y-4"
          >
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-white">
              Common Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {match.commonInterests.map((interest, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-pink-500/20 text-pink-200 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
} 