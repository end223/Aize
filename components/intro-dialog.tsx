"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface IntroDialogProps {
  isVisible: boolean
  onContinue: () => void
}

export default function IntroDialog({ isVisible, onContinue }: IntroDialogProps) {
  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        <motion.div
          className="relative z-10 max-w-md w-full"
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="relative w-full pt-[100%]">
            <div className="absolute inset-0">
              <Image
                src="/images/dialog-frame.png"
                alt="Decorative frame"
                fill
                className="object-contain pixelated"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-[12%] pt-[15%]">
              <h2
                className="text-xl text-red-600 text-center mb-4"
                style={{
                  fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace",
                  textShadow: "1px 1px 0px rgba(0,0,0,0.1)",
                }}
              >
                ♥ From Zhou ♥
              </h2>

              <div className="bg-[#fff8e1] rounded-lg p-4 mb-6 w-[90%] border-2 border-[#AA8866] shadow-inner">
                <p
                  className="text-sm md:text-base leading-relaxed text-[#663300] tracking-wide text-center"
                  style={{
                    fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace",
                  }}
                >
  Esse é um compilado de tudo que me faz pensar em você e mais alguns presentinhos.<br /><br />
  Abra todos os baús para liberar o coração.
</p>
              </div>

              <motion.button
                className="relative px-8 py-3 overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContinue}
              >
                <div className="absolute inset-0.5 bg-gradient-to-r from-emerald-200 to-green-200 rounded-lg"></div>
                <div className="relative flex items-center justify-center">
                  <span
                    className="text-green-900 font-bold"
                    style={{
                      fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace",
                    }}
                  >
                    Continuar
                  </span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
