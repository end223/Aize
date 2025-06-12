"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function AnimatedTitle() {
  const [displayText, setDisplayText] = useState("")
  const fullText = ""

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.h1
      className="text-4xl md:text-5xl font-pixel text-center text-red-500 mb-8 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
        className="inline-block ml-1"
      >
        _
      </motion.span>
    </motion.h1>
  )
}
