"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"

interface Position {
  x: number
  y: number
}

interface Direction {
  x: number
  y: number
}

interface CharacterProps {
  onMoveToChest?: (chestName: string) => void
  chestPositions?: Record<string, Position>
  isHoldingBouquet?: boolean
}

export default function Character({ onMoveToChest, chestPositions = {}, isHoldingBouquet = false }: CharacterProps) {
  const [position, setPosition] = useState<Position>({ x: 50, y: 80 })
  const [targetPosition, setTargetPosition] = useState<Position | null>(null)
  const [isMoving, setIsMoving] = useState(false)
  const [facingRight, setFacingRight] = useState(true)
  const [facingDirection, setFacingDirection] = useState<Direction>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const lastTimestampRef = useRef<number>(0)

  // Move to a specific position
  const moveToPosition = useCallback(
    (newTarget: Position) => {
      // Calculate direction vector
      const dx = newTarget.x - position.x
      const dy = newTarget.y - position.y

      // Determine primary direction (x or y)
      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)

      // Set facing direction based on the dominant movement axis
      if (absDx > absDy) {
        // Horizontal movement is dominant
        setFacingDirection({ x: dx > 0 ? 1 : -1, y: 0 })
        setFacingRight(dx > 0)
      } else {
        // Vertical movement is dominant
        setFacingDirection({ x: 0, y: dy > 0 ? 1 : -1 })
        // Keep the horizontal facing direction for vertical movement
      }

      setTargetPosition(newTarget)
      setIsMoving(true)
    },
    [position],
  )

  // Move to a chest by name
  const moveToChest = useCallback(
    (chestName: string) => {
      const chestPos = chestPositions[chestName]
      if (chestPos) {
        moveToPosition(chestPos)
        if (onMoveToChest) {
          onMoveToChest(chestName)
        }
      }
    },
    [chestPositions, moveToPosition, onMoveToChest],
  )

  // Handle click on the map
  const handleMapClick = useCallback(
    (e: React.MouseEvent) => {
      // Only handle left clicks
      if (e.button !== 0) return

      // Don't handle clicks on interactive elements
      if ((e.target as HTMLElement).closest(".interactive")) {
        return
      }

      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()

      // Calculate position as percentage of container width/height
      // Allow full range from 0% to 100% for both x and y
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))

      moveToPosition({ x, y })
    },
    [moveToPosition],
  )

  // Animation loop with optimized performance
  useEffect(() => {
    if (!targetPosition || !isMoving) return

    const FRAME_RATE = 60 // Limit to 60 FPS
    const FRAME_DURATION = 1000 / FRAME_RATE
    const SPEED = 0.8 // Reduced speed for smoother movement

    const animate = (timestamp: number) => {
      if (!targetPosition) return

      // Throttle frame rate
      if (timestamp - lastTimestampRef.current < FRAME_DURATION) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      lastTimestampRef.current = timestamp

      // Calculate distance to target
      const dx = targetPosition.x - position.x
      const dy = targetPosition.y - position.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // If we're close enough to the target, stop moving
      if (distance < 0.5) {
        setPosition(targetPosition)
        setIsMoving(false)
        setTargetPosition(null)
        return
      }

      // Move towards target
      const vx = (dx / distance) * SPEED
      const vy = (dy / distance) * SPEED

      setPosition((prev) => ({
        x: prev.x + vx,
        y: prev.y + vy,
      }))

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [targetPosition, position, isMoving])

  // Determine which image to show
  const getCharacterImage = () => {
    // If holding bouquet, show special image
    if (isHoldingBouquet) {
      return "/images/aize_buque.png"
    }

    if (isMoving) {
      return facingRight ? "/images/gif_direita.gif" : "/images/gif_esquerda.gif"
    }

    // When standing still, check if facing down
    if (facingDirection.y > 0) {
      return "/images/aize_frente.png" // Front-facing image
    }

    // Otherwise use the left/right images
    return facingRight ? "/images/aize_direita.png" : "/images/aize_esquerda.png"
  }

  // Expose moveToChest method to parent components
  useEffect(() => {
    if (window) {
      // @ts-ignore - Adding to window for debugging and global access
      window.moveCharacterToChest = moveToChest
    }
  }, [moveToChest])

  return (
    <div ref={containerRef} className="absolute inset-0 z-20" onClick={handleMapClick} style={{ pointerEvents: "all" }}>
      <div
        className="absolute w-[96px] h-[128px] pixelated pointer-events-none"
        style={{
          left: `calc(${position.x}% - 48px)`,
          top: `calc(${position.y}% - 64px)`,
          transition: isMoving ? "none" : "transform 0.3s ease-out",
        }}
      >
        <Image
          src={getCharacterImage() || "/placeholder.svg"}
          alt="Character"
          width={96}
          height={128}
          className="pixelated"
          priority
        />
      </div>
    </div>
  )
}
