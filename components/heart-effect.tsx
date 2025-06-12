"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface HeartEffectProps {
  isActive: boolean
  children: React.ReactNode
}

interface FloatingHeart {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
  rotation: number
}

interface Sparkle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  color: string
}

export default function HeartEffect({ isActive, children }: HeartEffectProps) {
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([])
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    if (isActive) {
      // Generate floating hearts
      const newHearts: FloatingHeart[] = []
      for (let i = 0; i < 8; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 120 - 60, // Wider spread
          y: Math.random() * 120 - 60,
          delay: Math.random() * 0.8,
          duration: 2 + Math.random() * 1,
          size: 12 + Math.random() * 8,
          rotation: Math.random() * 360,
        })
      }
      setFloatingHearts(newHearts)

      // Generate romantic sparkles
      const newSparkles: Sparkle[] = []
      const romanticColors = ["#FF69B4", "#FFB6C1", "#FFC0CB", "#FF1493", "#DC143C", "#FFFFFF", "#FFD700"]

      for (let i = 0; i < 15; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          delay: Math.random() * 0.6,
          duration: 1.5 + Math.random() * 1,
          color: romanticColors[Math.floor(Math.random() * romanticColors.length)],
        })
      }
      setSparkles(newSparkles)

      // Clear effects after animation
      const timeout = setTimeout(() => {
        setFloatingHearts([])
        setSparkles([])
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [isActive])

  return (
    <div className="relative">
      {/* Romantic glow effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,105,180,0.8) 0%, rgba(255,182,193,0.6) 30%, rgba(255,192,203,0.4) 60%, transparent 80%)",
            filter: "blur(12px)",
            transform: "scale(2)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 0.8, 0.6, 0],
            scale: [0.5, 2.5, 2, 2.5, 3],
          }}
          transition={{
            duration: 3,
            ease: "easeOut",
          }}
        />
      )}

      {/* Pulsing heart rings */}
      {isActive && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute inset-0 border-2 rounded-full pointer-events-none"
              style={{
                borderColor: i === 0 ? "#FF69B4" : i === 1 ? "#FFB6C1" : "#FFC0CB",
                transform: "scale(1.2)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.8, 0.4, 0],
                scale: [0.8, 1.5 + i * 0.5, 2 + i * 0.5, 2.5 + i * 0.5],
              }}
              transition={{
                duration: 2 + i * 0.3,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Floating hearts */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute pointer-events-none"
          style={{
            left: `calc(50% + ${heart.x}px)`,
            top: `calc(50% + ${heart.y}px)`,
            fontSize: `${heart.size}px`,
            color: "#FF69B4",
            textShadow: "0 0 8px rgba(255,105,180,0.8)",
            transform: `rotate(${heart.rotation}deg)`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0.8],
            y: [0, -30, -60, -90],
            rotate: [heart.rotation, heart.rotation + 180, heart.rotation + 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Romantic sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: `calc(50% + ${sparkle.x}px)`,
            top: `calc(50% + ${sparkle.y}px)`,
            width: "4px",
            height: "4px",
            background: `radial-gradient(circle, ${sparkle.color} 0%, transparent 70%)`,
            borderRadius: "50%",
            boxShadow: `0 0 8px ${sparkle.color}`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0],
            rotate: [0, 180, 360],
            y: [0, -25, -50],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Heart burst effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1 }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transformOrigin: "center",
                  transform: `rotate(${angle}deg)`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0] }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                <motion.div
                  className="text-pink-400"
                  style={{
                    fontSize: "16px",
                    textShadow: "0 0 6px rgba(255,105,180,0.8)",
                  }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -40, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                >
                  ♥
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      {/* Love wave effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, rgba(255,105,180,0.3), transparent, rgba(255,182,193,0.3), transparent)",
            borderRadius: "50%",
          }}
          initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.6, 0],
            rotate: [0, 360],
            scale: [0.5, 3],
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        />
      )}

      {children}
    </div>
  )
}
