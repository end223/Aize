"use client"

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

interface SecondCharacterProps {
  targetCharacterPosition?: Position
  heartPosition?: Position
  allChestsOpened?: boolean
  onReachTarget?: () => void
  shouldMoveToAize?: boolean
  isVisible?: boolean
}

export default function SecondCharacter({
  targetCharacterPosition,
  heartPosition,
  allChestsOpened = false,
  onReachTarget,
  shouldMoveToAize = false,
  isVisible = false,
}: SecondCharacterProps) {
  const [position, setPosition] = useState<Position>({ x: 10, y: 90 })
  const [targetPosition, setTargetPosition] = useState<Position | null>(null)
  const [isMoving, setIsMoving] = useState(false)
  const [facingRight, setFacingRight] = useState(true)
  const [facingDirection, setFacingDirection] = useState<Direction>({ x: 0, y: 0 })
  const [isHoldingBouquet, setIsHoldingBouquet] = useState(false)
  const [hasReachedHeart, setHasReachedHeart] = useState(false)
  const [isMovingToAize, setIsMovingToAize] = useState(false)
  const [hasReachedAize, setHasReachedAize] = useState(false)
  const [deliveredBouquet, setDeliveredBouquet] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const lastTimestampRef = useRef<number>(0)
  const movementSpeed = 0.8
  const finalPositionRef = useRef<Position | null>(null)

  // Estado para controlar se o personagem está indo para o coração
  const [isMovingToHeart, setIsMovingToHeart] = useState(false)

  // Flag para controlar se já iniciamos o movimento para o coração
  const hasStartedMovementRef = useRef(false)

  // Move to a specific position
  const moveToPosition = useCallback(
    (newTarget: Position) => {
      // Se já entregou o buquê, não permitir mais movimentos
      if (deliveredBouquet || hasReachedAize) {
        return
      }

      const dx = newTarget.x - position.x
      const dy = newTarget.y - position.y

      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)

      if (absDx > absDy) {
        setFacingDirection({ x: dx > 0 ? 1 : -1, y: 0 })
        setFacingRight(dx > 0)
      } else {
        setFacingDirection({ x: 0, y: dy > 0 ? 1 : -1 })
      }

      setTargetPosition(newTarget)
      setIsMoving(true)
    },
    [position, deliveredBouquet, hasReachedAize],
  )

  // Iniciar sequência quando o personagem se tornar visível
  useEffect(() => {
    if (isVisible && heartPosition && !hasReachedHeart && !isMovingToHeart && !hasStartedMovementRef.current) {
      console.log("Second character is now visible, starting movement to heart")
      setIsMovingToHeart(true)
      hasStartedMovementRef.current = true
      moveToPosition(heartPosition)
    }
  }, [isVisible, heartPosition, hasReachedHeart, isMovingToHeart, moveToPosition])

  // Quando chegar ao coração
  useEffect(() => {
    if (
      isMovingToHeart &&
      !isMoving &&
      heartPosition &&
      Math.abs(position.x - heartPosition.x) < 2 &&
      Math.abs(position.y - heartPosition.y) < 2 &&
      !hasReachedHeart
    ) {
      console.log("Reached heart, picking up bouquet")
      setHasReachedHeart(true)
      setIsHoldingBouquet(true)
      setIsMovingToHeart(false)

      if (targetCharacterPosition) {
        setTimeout(() => {
          console.log("Starting movement to Aize with bouquet")
          setIsMovingToAize(true)
          const nearAizePosition = {
            x: targetCharacterPosition.x - 8,
            y: targetCharacterPosition.y,
          }
          finalPositionRef.current = nearAizePosition
          moveToPosition(nearAizePosition)
        }, 1000)
      }
    }
  }, [heartPosition, position, isMoving, hasReachedHeart, targetCharacterPosition, moveToPosition, isMovingToHeart])

  // Quando chegar à Aize
  useEffect(() => {
    if (
      isMovingToAize &&
      !isMoving &&
      finalPositionRef.current &&
      Math.abs(position.x - finalPositionRef.current.x) < 2 &&
      Math.abs(position.y - finalPositionRef.current.y) < 2 &&
      !hasReachedAize &&
      !deliveredBouquet
    ) {
      console.log("Reached Aize, delivering bouquet")
      // Fixar a posição final para evitar qualquer movimento adicional
      setPosition(finalPositionRef.current)
      setHasReachedAize(true)
      setIsMovingToAize(false)

      // Marcar que o buquê foi entregue para bloquear qualquer movimento adicional
      setDeliveredBouquet(true)

      // Cancelar qualquer animação em andamento
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }

      // Entregar o buquê e chamar o callback após 1 segundo
      setTimeout(() => {
        console.log("Giving bouquet to Aize and disappearing")
        setIsHoldingBouquet(false)
        if (onReachTarget) {
          onReachTarget()
        }
      }, 1000)
    }
  }, [isMovingToAize, isMoving, position, hasReachedAize, onReachTarget, deliveredBouquet])

  // Animation loop
  useEffect(() => {
    // Se já entregou o buquê, não permitir mais animações
    if (!targetPosition || !isMoving || deliveredBouquet || hasReachedAize) return

    const FRAME_RATE = 60
    const FRAME_DURATION = 1000 / FRAME_RATE
    const SPEED = 0.8

    const animate = (timestamp: number) => {
      // Verificar novamente se já entregou o buquê
      if (deliveredBouquet || hasReachedAize) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }
        return
      }

      if (!targetPosition) return

      if (timestamp - lastTimestampRef.current < FRAME_DURATION) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      lastTimestampRef.current = timestamp

      const dx = targetPosition.x - position.x
      const dy = targetPosition.y - position.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 0.5) {
        setPosition(targetPosition)
        setIsMoving(false)
        setTargetPosition(null)
        return
      }

      const vx = (dx / distance) * SPEED
      const vy = (dy / distance) * SPEED

      setPosition((prev) => ({
        x: prev.x + vx,
        y: prev.y + vy,
      }))

      animationRef.current = requestAnimationFrame(animate)
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [targetPosition, position, isMoving, deliveredBouquet, hasReachedAize])

  // Limpar qualquer animação quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [])

  const getCharacterImage = () => {
    // Animação com buquê quando indo para Aize
    if (isMovingToAize && isMoving) {
      console.log("Using bouquet walking animation to Aize")
      return "/images/eu_andando_gif_buque.gif"
    }

    // Animação normal quando indo para o coração
    if (isMovingToHeart && isMoving) {
      console.log("Using normal walking animation to heart")
      return facingRight ? "/images/eu_andando_gif_buque.gif" : "/images/eu_gif_andando_esquerda.gif"
    }

    // Imagem estática com buquê quando parado com o buquê
    if (isHoldingBouquet) {
      return "/images/eu_buque_direita.png"
    }

    // Após entregar o buquê para Aize
    if (hasReachedAize) {
      return "/images/eu_direita.png"
    }

    // Animações normais de movimento
    if (isMoving) {
      return facingRight ? "/images/eu_gif_andando_direita.gif" : "/images/eu_gif_andando_esquerda.gif"
    }

    // Quando parado, verificar se está olhando para baixo
    if (facingDirection.y > 0) {
      return "/images/eu.png"
    }

    // Caso contrário, usar as imagens de esquerda/direita
    return facingRight ? "/images/eu_direita.png" : "/images/eu_esquerda.png"
  }

  // Não renderizar se não estiver visível
  if (!isVisible) {
    return null
  }

  return (
    <div ref={containerRef} className="absolute inset-0 z-19" style={{ pointerEvents: "none" }}>
      <div
        className="absolute w-[96px] h-[128px] pixelated pointer-events-none"
        style={{
          left: `calc(${position.x}% - 48px)`,
          top: `calc(${position.y}% - 64px)`,
          transition: "none", // Remover qualquer transição para evitar movimentos indesejados
        }}
      >
        <Image
          src={getCharacterImage() || "/placeholder.svg"}
          alt="Second Character"
          width={76}
          height={108}
          className="pixelated"
          priority
        />
      </div>
    </div>
  )
}
