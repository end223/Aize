"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  life: number
}

interface ParticleBurstProps {
  isActive: boolean
  particleCount?: number
}

export default function ParticleBurst({ isActive, particleCount = 12 }: ParticleBurstProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (isActive) {
      const colors = ["#FFD700", "#FFA500", "#FF6347", "#FF69B4", "#00CED1", "#98FB98"]

      const newParticles: Particle[] = []
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2
        const velocity = 2 + Math.random() * 3

        newParticles.push({
          id: i,
          x: 0,
          y: 0,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 3 + Math.random() * 4,
          life: 1 + Math.random() * 0.5,
        })
      }

      setParticles(newParticles)

      // Clear particles after animation
      const timeout = setTimeout(() => {
        setParticles([])
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [isActive, particleCount])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            left: "50%",
            top: "50%",
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: particle.vx * 30,
            y: particle.vy * 30,
            opacity: 0,
            scale: 0.2,
          }}
          transition={{
            duration: particle.life,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}
