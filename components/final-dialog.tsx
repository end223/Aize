"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Map } from "lucide-react"

interface FinalDialogProps {
  isVisible: boolean
  onExploreMap: () => void // Nova prop para o botão de explorar
}

export default function FinalDialog({ isVisible, onExploreMap }: FinalDialogProps) {
  const [showPolaroid, setShowPolaroid] = useState(false)

  // Resetar a visualização da polaroid quando o diálogo principal se torna invisível
  if (!isVisible && showPolaroid) {
    setShowPolaroid(false)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {!showPolaroid ? (
        <motion.div
          key="dialog"
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
                    fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace)",
                    textShadow: "1px 1px 0px rgba(0,0,0,0.1)",
                  }}
                >
                  ♥ ♥ ♥ 
                </h2>

                <div className="bg-[#fff8e1] rounded-lg p-4 mb-6 w-[90%] border-2 border-[#AA8866] shadow-inner">
                  <p
                    className="text-sm md:text-base leading-relaxed text-[#663300] tracking-wide text-center"
                    style={{
                      fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace)",
                    }}
                  >
                    Separei mais alguns presentinhos pra ficar ainda melhor.
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-[80%]">
                  <motion.button
                    className="relative px-8 py-3 overflow-hidden bg-gradient-to-r from-pink-500 to-red-500 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPolaroid(true)}
                  >
                    <div className="absolute inset-0.5 bg-gradient-to-r from-pink-200 to-red-200 rounded-lg"></div>
                    <div className="relative flex items-center justify-center">
                      <span className="mr-2 text-red-700 font-pixel">♥</span>
                      <span
                        className="text-red-700 font-bold"
                        style={{
                          fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace)",
                        }}
                      >
                        Ver Presentes
                      </span>
                      <span className="ml-2 text-red-700 font-pixel">♥</span>
                    </div>
                  </motion.button>

                  <motion.button
                    className="relative px-8 py-3 overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onExploreMap}
                  >
                    <div className="absolute inset-0.5 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-lg"></div>
                    <div className="relative flex items-center justify-center gap-2">
                      <Map size={18} className="text-cyan-800" />
                      <span
                        className="text-cyan-800 font-bold"
                        style={{
                          fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace)",
                        }}
                      >
                        Explorar o Mapa
                      </span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="polaroid"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowPolaroid(false)}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <Image
              src="/images/quadro_polaroid.png"
              alt="Quadro de Polaroids"
              width={550}
              height={450}
              className="pixelated"
            />
            <motion.div
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p
                className="text-white text-center text-sm"
                style={{
                  fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace)",
                }}
              >
                (Clique em qualquer lugar para voltar)
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
