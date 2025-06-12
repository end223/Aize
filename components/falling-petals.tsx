"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Petal {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  delay: number
  duration: number
}

interface FallingPetalsProps {
  isActive: boolean
}

export default function FallingPetals({ isActive }: FallingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    if (isActive) {
      const newPetals: Petal[] = []

      // Criar 20 pétalas com posições e animações aleatórias
      for (let i = 0; i < 20; i++) {
        newPetals.push({
          id: i,
          x: Math.random() * 100, // posição horizontal aleatória (0-100%)
          y: -10 - Math.random() * 20, // começar acima da tela
          rotation: Math.random() * 360, // rotação aleatória
          scale: 0.5 + Math.random() * 0.5, // tamanho aleatório
          delay: Math.random() * 5, // atraso aleatório para começar a cair
          duration: 5 + Math.random() * 10, // duração aleatória da queda
        })
      }

      setPetals(newPetals)
    } else {
      setPetals([])
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
          }}
          initial={{
            y: `${petal.y}%`,
            x: `${petal.x}%`,
            rotate: petal.rotation,
            scale: petal.scale,
          }}
          animate={{
            y: "120%",
            x: `${petal.x + (Math.random() * 20 - 10)}%`,
            rotate: petal.rotation + 360 * (Math.random() > 0.5 ? 1 : -1),
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 2,
          }}
        >
          <div
            className="w-4 h-4 bg-pink-500 opacity-80"
            style={{
              clipPath: "polygon(50% 0%, 80% 30%, 100% 50%, 80% 70%, 50% 100%, 20% 70%, 0% 50%, 20% 30%)",
              boxShadow: "0 0 5px rgba(236, 72, 153, 0.5)",
            }}
          ></div>
        </motion.div>
      ))}
    </div>
  )
}
