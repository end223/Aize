"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SparkleEffectProps {
  isActive: boolean
  children: React.ReactNode
}

interface Sparkle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
  color: string
}

export default function SparkleEffect({ isActive, children }: SparkleEffectProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    if (isActive) {
      // Generate sparkles around the chest
      const newSparkles: Sparkle[] = []
      const colors = ["#FFD700", "#FFA500", "#FF69B4", "#87CEFA", "#98FB98", "#FFFFFF"]

      for (let i = 0; i < 12; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100 - 50, // Random position around the chest
          y: Math.random() * 100 - 50,
          delay: Math.random() * 0.5,
          duration: 1 + Math.random() * 0.8,
          size: 2 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
      setSparkles(newSparkles)

      // Clear sparkles after animation
      const timeout = setTimeout(() => {
        setSparkles([])
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [isActive])

  return (
    <div className="relative">
      {/* Glow effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,215,0,0.3) 50%, transparent 70%)",
            filter: "blur(8px)",
            transform: "scale(1.5)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 0.7, 0],
            scale: [0.5, 1.8, 1.5, 2],
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        />
      )}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: `calc(50% + ${sparkle.x}px)`,
            top: `calc(50% + ${sparkle.y}px)`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: `radial-gradient(circle, ${sparkle.color} 0%, transparent 70%)`,
            borderRadius: "50%",
            boxShadow: `0 0 6px ${sparkle.color}`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 0.8, 0],
            rotate: [0, 180, 360],
            y: [0, -20, -40],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Pulsing ring effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 border-2 border-yellow-400 rounded-full pointer-events-none"
          style={{
            transform: "scale(1.2)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.8, 0.4, 0],
            scale: [0.8, 1.5, 2, 2.5],
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />
      )}

      {/* Starburst effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5 }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * 360
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-10 bg-gradient-to-t from-transparent via-yellow-300 to-white"
                style={{
                  left: "50%",
                  top: "50%",
                  transformOrigin: "bottom center",
                  transform: `rotate(${angle}deg) translateY(-50%)`,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1, 0], opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.7, delay: 0.1 }}
              />
            )
          })}
        </motion.div>
      )}

      {children}
    </div>
  )
}
