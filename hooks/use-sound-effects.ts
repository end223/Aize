"use client"

import { useCallback, useRef } from "react"

export function useSoundEffects() {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

  const playSound = useCallback((soundPath: string, volume = 0.5) => {
    try {
      // Create or reuse audio element
      if (!audioRefs.current[soundPath]) {
        audioRefs.current[soundPath] = new Audio(soundPath)
        audioRefs.current[soundPath].preload = "auto"
      }

      const audio = audioRefs.current[soundPath]
      audio.volume = volume
      audio.currentTime = 0 // Reset to beginning

      // Play the sound
      const playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play failed:", error)
        })
      }
    } catch (error) {
      console.log("Sound effect error:", error)
    }
  }, [])

  const preloadSounds = useCallback((soundPaths: string[]) => {
    soundPaths.forEach((path) => {
      if (!audioRefs.current[path]) {
        audioRefs.current[path] = new Audio(path)
        audioRefs.current[path].preload = "auto"
      }
    })
  }, [])

  return { playSound, preloadSounds }
}
