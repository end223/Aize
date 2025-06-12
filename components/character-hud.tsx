"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function CharacterHUD() {
  return (
    <motion.div
      className="fixed bottom-20 right-4 z-40 pixelated"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="relative w-64 h-24">
        <Image src="/images/hud_aize.png" alt="Character HUD" width={256} height={96} className="pixelated" />
      </div>
    </motion.div>
  )
}
