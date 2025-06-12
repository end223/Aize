"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { categorias } from "@/data/categorias"
import type { Categoria } from "@/types"
import ChestMap from "@/components/chest-map"
import Popup from "@/components/popup"
import AnimatedTitle from "@/components/animated-title"
import Character from "@/components/character"
import SecondCharacter from "@/components/second-character"
import CharacterHUD from "@/components/character-hud"
import FinalDialog from "@/components/final-dialog"
import FallingPetals from "@/components/falling-petals"
import FinalObjektsChoiceDialog from "@/components/final-objekts-choice-dialog"
import { Menu } from "lucide-react"

interface Position {
  x: number
  y: number
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Categoria | null>(null)
  const [openChestName, setOpenChestName] = useState<string | null>(null)
  const [openedChests, setOpenedChests] = useState<Set<string>>(new Set())
  const [chestPositions, setChestPositions] = useState<Record<string, Position>>({})
  const [aizeCurrentPosition, setAizeCurrentPosition] = useState<Position>({ x: 50, y: 80 })
  const [heartPosition, setHeartPosition] = useState<Position | null>(null)
  const [allChestsOpened, setAllChestsOpened] = useState(false)
  const [aizeHoldingBouquet, setAizeHoldingBouquet] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  const [heartClicked, setHeartClicked] = useState(false)
  const [heartDialogClosed, setHeartDialogClosed] = useState(false)
  const [secondCharacterVisible, setSecondCharacterVisible] = useState(false)
  const [bouquetDelivered, setBouquetDelivered] = useState(false)
  const [showFinalScene, setShowFinalScene] = useState(false)
  const [charactersHidden, setCharactersHidden] = useState(false)

  // Estados para a sequência final simplificados
  const [showFinalObjektsChoice, setShowFinalObjektsChoice] = useState(false)
  const [showFinalDialog, setShowFinalDialog] = useState(false)
  const [isExploringMapMode, setIsExploringMapMode] = useState(false)

  const [currentMap, setCurrentMap] = useState<string>("/images/mapa.png")
  const [isTransitioningMap, setIsTransitioningMap] = useState(false)
  const bouquetDeliveryInProgressRef = useRef(false)

  useEffect(() => {
    if (!mapRef.current) return
    const chestElements = mapRef.current.querySelectorAll(".chest-button")
    const positions: Record<string, Position> = {}
    let heartPos: Position | null = null
    chestElements.forEach((chest) => {
      const name = chest.getAttribute("data-chest-name")
      const x = Number.parseFloat(chest.getAttribute("data-chest-position-x") || "0")
      const y = Number.parseFloat(chest.getAttribute("data-chest-position-y") || "0")
      if (name) {
        positions[name] = { x, y }
        if (name === "❤️") heartPos = { x, y }
      }
    })
    setChestPositions(positions)
    setHeartPosition(heartPos)
  }, [])

  useEffect(() => {
    const regularChests = categorias.filter((cat) => cat.nome !== "❤️")
    const allRegularChestsOpened = regularChests.every((cat) => openedChests.has(cat.nome))
    if (allRegularChestsOpened) {
      setAllChestsOpened(true)
      setOpenChestName((prev) => (prev === "❤️" ? prev : "all_opened"))
    }
  }, [openedChests])

  useEffect(() => {
    if (heartClicked && heartDialogClosed && !bouquetDelivered && !secondCharacterVisible) {
      setSecondCharacterVisible(true)
    }
  }, [heartClicked, heartDialogClosed, bouquetDelivered, secondCharacterVisible])

  useEffect(() => {
    if (showFinalScene && !showFinalObjektsChoice && !showFinalDialog && !isExploringMapMode) {
      const timer = setTimeout(() => {
        setShowFinalObjektsChoice(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showFinalScene, showFinalObjektsChoice, showFinalDialog, isExploringMapMode])

  const handleChestClick = useCallback(
    (categoryName: string) => {
      if (isExploringMapMode) return
      const categoryData = categorias.find((cat) => cat.nome === categoryName)
      if (!categoryData) return
      setOpenChestName(categoryName)
      if (categoryName === "Fenomeno") {
        if (currentMap !== "/images/mapa_arco_iris.jpeg") {
          setIsTransitioningMap(true)
          return
        }
      }
      setSelectedCategory(categoryData)
      if (categoryName === "❤️") {
        if (openChestName === "all_opened" || openChestName === categoryName) {
          setHeartClicked(true)
        } else {
          setSelectedCategory(null)
          setOpenChestName(null)
        }
        return
      }
      if (categoryName !== "Fenomeno" || currentMap === "/images/mapa_arco_iris.jpeg") {
        setOpenedChests((prev) => new Set(prev).add(categoryName))
      }
    },
    [openChestName, currentMap, isExploringMapMode],
  )

  useEffect(() => {
    if (isTransitioningMap && openChestName === "Fenomeno") {
      setTimeout(() => {
        setCurrentMap("/images/mapa_arco_iris.jpeg")
        setIsTransitioningMap(false)
        const fenomenoData = categorias.find((cat) => cat.nome === "Fenomeno")
        if (fenomenoData) {
          setSelectedCategory(fenomenoData)
          setOpenedChests((prev) => new Set(prev).add("Fenomeno"))
        }
      }, 500)
    }
  }, [openChestName, isTransitioningMap])

  const handleClosePopup = () => {
    if (selectedCategory?.nome === "❤️") {
      setHeartDialogClosed(true)
    }
    setSelectedCategory(null)
  }

  const handleFinalObjektsChoiceComplete = () => {
    setShowFinalObjektsChoice(false)
    setShowFinalDialog(true) 
  }

  const handleExploreMap = () => {
    setShowFinalDialog(false)
    setIsExploringMapMode(true)
  }

  const handleReturnToFinalDialog = () => {
    setIsExploringMapMode(false)
    setShowFinalDialog(true)
  }

  const handleSecondCharacterReachTarget = useCallback(() => {
    if (bouquetDeliveryInProgressRef.current) return
    bouquetDeliveryInProgressRef.current = true
    setBouquetDelivered(true)
    setAizeHoldingBouquet(true)
    setTimeout(() => {
      setCharactersHidden(true)
      setTimeout(() => setShowFinalScene(true), 100)
    }, 1000)
  }, [])

  const mapVariants = {
    hidden: { opacity: 0, transition: { duration: 0.5 } },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } },
  }

  return (
    <main className="min-h-screen bg-[#331800] text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentMap}
            variants={mapVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0"
          >
            <Image
              src={currentMap || "/placeholder.svg"}
              alt="Map Background"
              fill
              className="object-cover pixelated"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <FallingPetals isActive={showFinalScene} />
      <div className="relative w-full z-10 px-0 py-8">
        <AnimatedTitle />
        <div className="mt-8 relative" ref={mapRef}>
          {!charactersHidden && (
            <>
              <Character chestPositions={chestPositions} isHoldingBouquet={aizeHoldingBouquet} />
              <SecondCharacter
                targetCharacterPosition={aizeCurrentPosition}
                heartPosition={heartPosition}
                allChestsOpened={allChestsOpened}
                onReachTarget={handleSecondCharacterReachTarget}
                shouldMoveToAize={heartClicked && heartDialogClosed}
                isVisible={secondCharacterVisible}
              />
            </>
          )}
          <ChestMap
            categories={categorias}
            onChestClick={handleChestClick}
            openChest={openChestName}
            showFinalScene={showFinalScene}
          />
        </div>
        <AnimatePresence>
          {selectedCategory && <Popup category={selectedCategory} onClose={handleClosePopup} />}
        </AnimatePresence>
      </div>
      {!charactersHidden && <CharacterHUD />}
      <FinalObjektsChoiceDialog isVisible={showFinalObjektsChoice} onComplete={handleFinalObjektsChoiceComplete} />
      <FinalDialog isVisible={showFinalDialog} onExploreMap={handleExploreMap} />
      {isExploringMapMode && (
        <motion.button
          onClick={handleReturnToFinalDialog}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-pixel p-3 rounded-full shadow-xl hover:from-purple-600 hover:to-indigo-700 transition-all"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={28} />
          <span className="sr-only">Voltar ao Menu Final</span>
        </motion.button>
      )}
    </main>
  )
}
