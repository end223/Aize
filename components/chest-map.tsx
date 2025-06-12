"use client"

import type React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import type { Categoria } from "@/types"
import { useCallback, useEffect, useState, useMemo } from "react"
import SparkleEffect from "./sparkle-effect"
import HeartEffect from "./heart-effect"
import { useSoundEffects } from "@/hooks/use-sound-effects"

interface ChestMapProps {
  categories: Categoria[]
  onChestClick: (categoryName: string) => void
  openChest: string | null
  showFinalScene?: boolean
  heartPosition?: Position | null // Esta prop pode ser removida ou usada como fallback
}

interface Position {
  x: number
  y: number
}

// Posições predefinidas para os baús no mapa
const allPossibleChestPositions: Position[] = [
  { x: 49, y: 60 }, { x: 41, y: 45 }, { x: 33, y: 70 }, { x: 72, y: 70 },
  { x: 60, y: 15 }, { x: 60, y: 70 }, { x: 58, y: 45 }, { x: 35, y: 55 },
  { x: 65, y: 45 }, { x: 95, y: 55 }, { x: 10, y: 70 }, { x: 40, y: 75 },
  { x: 60, y: 70 }, { x: 85, y: 80 }, { x: 50, y: 60 },
  // A 16ª posição era a original do coração, vamos reservá-la
  // { x: 72, y: 13 } // Posição original do coração
]

const FIXED_HEART_POSITION: Position = { x: 72, y: 13 }

export default function ChestMap({
  categories,
  onChestClick,
  openChest,
  showFinalScene = false,
}: ChestMapProps) {
  const { playSound, preloadSounds } = useSoundEffects()
  const [recentlyOpenedChests, setRecentlyOpenedChests] = useState<Set<string>>(new Set())
  const [heartClicked, setHeartClicked] = useState(false)

  const heartCategoryName = "❤️"

  // Separar a categoria do coração das outras
  const regularCategories = useMemo(
    () => categories.filter((cat) => cat.nome !== heartCategoryName),
    [categories, heartCategoryName],
  )
  const heartCategory = useMemo(
    () => categories.find((cat) => cat.nome === heartCategoryName),
    [categories, heartCategoryName],
  )

  // Gerar posições para as categorias regulares
  const regularChestPositions = useMemo(() => {
    // Usar as primeiras N posições disponíveis para as categorias regulares
    return allPossibleChestPositions.slice(0, regularCategories.length)
  }, [regularCategories.length])

  useEffect(() => {
    preloadSounds(["/sounds/chest-click.mp3", "/sounds/fairy-twinkle.mp3", "/sounds/heart-magic.mp3"])
  }, [preloadSounds])

  useEffect(() => {
    if (openChest && openChest !== "all_opened" && openChest !== heartCategoryName) {
      setRecentlyOpenedChests((prev) => {
        const newSet = new Set(prev)
        newSet.add(openChest)
        return newSet
      })
      playSound("/sounds/fairy-twinkle.mp3", 0.6)
      const timeout = setTimeout(() => {
        setRecentlyOpenedChests((prev) => {
          const newSet = new Set(prev)
          newSet.delete(openChest)
          return newSet
        })
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [openChest, playSound, heartCategoryName])

  const floatingAnimation = {
    float: { y: [0, -10, 0], transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } },
  }
  const spinningAnimation = {
    spin: {
      rotate: [0, 10, 0, -10, 0],
      scale: [1, 1.1, 1, 1.1, 1],
      filter: [
        "brightness(1) drop-shadow(0 0 0px rgba(255,105,180,0))",
        "brightness(1.3) drop-shadow(0 0 15px rgba(255,105,180,0.8))",
        "brightness(1) drop-shadow(0 0 8px rgba(255,105,180,0.4))",
        "brightness(1.3) drop-shadow(0 0 15px rgba(255,105,180,0.8))",
        "brightness(1) drop-shadow(0 0 0px rgba(255,105,180,0))",
      ],
      transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
    },
  }
  const openChestAnimation = {
    pulse: {
      scale: [1, 1.05, 1],
      filter: [
        "brightness(1) drop-shadow(0 0 0px rgba(255,215,0,0))",
        "brightness(1.2) drop-shadow(0 0 10px rgba(255,215,0,0.8))",
        "brightness(1) drop-shadow(0 0 5px rgba(255,215,0,0.4))",
      ],
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
    },
  }

  const handleChestClickInternal = useCallback(
    (e: React.MouseEvent, categoryName: string) => {
      e.stopPropagation()
      const isHeart = categoryName === heartCategoryName
      if (isHeart && openChest !== "all_opened") return

      if (isHeart && openChest === "all_opened") {
        playSound("/sounds/heart-magic.mp3", 0.7)
        setHeartClicked(true)
        setTimeout(() => setHeartClicked(false), 3000)
      } else if (!isHeart) {
        playSound("/sounds/chest-click.mp3", 0.3)
      }

      if (window && (window as any).moveCharacterToChest) {
        (window as any).moveCharacterToChest(categoryName)
      }
      onChestClick(categoryName)
    },
    [onChestClick, openChest, playSound, heartCategoryName],
  )

  const renderChest = (category: Categoria, position: Position, isHeart: boolean) => {
    const isHeartLocked = isHeart && openChest !== "all_opened"
    const isChestOpen = openChest === category.nome
    const isRecentlyOpened = recentlyOpenedChests.has(category.nome)
    const EffectComponent = isHeart ? HeartEffect : SparkleEffect
    const effectActive = isHeart ? heartClicked : isRecentlyOpened

    return (
      <motion.div
        key={category.nome}
        className={`absolute cursor-pointer z-30 interactive chest-button ${isHeartLocked ? "opacity-50" : ""}`}
        style={{ top: `${position.y}%`, left: `${position.x}%` }}
        whileHover={{ scale: isHeartLocked ? 1.0 : 1.1 }}
        animate={isChestOpen && !isHeart ? "pulse" : isHeart ? "spin" : "float"}
        variants={isChestOpen && !isHeart ? openChestAnimation : isHeart ? spinningAnimation : floatingAnimation}
        onClick={(e) => handleChestClickInternal(e, category.nome)}
        data-chest-name={category.nome}
        data-chest-position-x={position.x}
        data-chest-position-y={position.y}
      >
        <EffectComponent isActive={effectActive}>
          <div className="relative">
            <div className="w-16 h-16 relative">
              <Image
                src={isHeart ? "/images/heart.png" : isChestOpen ? "/images/bau.png" : "/images/bau fechado.png"}
                alt={category.nome}
                width={64}
                height={64}
                className="pixelated"
              />
            </div>
            <div
              className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-pixel ${
                isHeart ? "text-yellow-300 bg-[#990000dd] hidden" : "text-white bg-[#000000aa]"
              } px-2 py-1 rounded whitespace-nowrap`}
            >
              {category.nome}
            </div>
          </div>
        </EffectComponent>
      </motion.div>
    )
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg">
      {showFinalScene && heartCategory && (
        <motion.div
          className="absolute z-40"
          style={{
            top: `${FIXED_HEART_POSITION.y}%`,
            left: `${FIXED_HEART_POSITION.x}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-32 h-32 relative">
            <Image src="/images/balanco.png" alt="Final Scene" width={128} height={128} className="pixelated" />
          </div>
        </motion.div>
      )}

      {!showFinalScene && (
        <>
          {regularCategories.map((category, index) =>
            renderChest(category, regularChestPositions[index], false),
          )}
          {heartCategory && renderChest(heartCategory, FIXED_HEART_POSITION, true)}
        </>
      )}
    </div>
  )
}
