"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Popup from "./popup" // Importar o Popup
import type { Categoria } from "@/types" // Importar Categoria
import { CheckCircle, Lock, Gift } from "lucide-react"

interface FinalObjektsChoiceDialogProps {
  isVisible: boolean
  onComplete: () => void
}

// Categorias "fantasmas" para os popups individuais
const sohyunPopupCategory: Categoria = {
  nome: "",
  imagem: "",
  texto: "",
}

const xinyuPopupCategory: Categoria = {
  nome: "",
  imagem: "",
  texto: "",
}

const hayeonPopupCategory: Categoria = {
  nome: "",
  imagem: "",
  texto: "",
}

export default function FinalObjektsChoiceDialog({ isVisible, onComplete }: FinalObjektsChoiceDialogProps) {
  const [showSohyunGallery, setShowSohyunGallery] = useState(false)
  const [showXinyuGallery, setShowXinyuGallery] = useState(false)
  const [showHayeonGallery, setShowHayeonGallery] = useState(false)

  const [sohyunViewed, setSohyunViewed] = useState(false)
  const [xinyuViewed, setXinyuViewed] = useState(false)
  const [hayeonViewed, setHayeonViewed] = useState(false)

  const handleOpenSohyun = () => setShowSohyunGallery(true)
  const handleCloseSohyun = () => {
    setShowSohyunGallery(false)
    setSohyunViewed(true)
  }

  const handleOpenXinyu = () => setShowXinyuGallery(true)
  const handleCloseXinyu = () => {
    setShowXinyuGallery(false)
    setXinyuViewed(true)
  }

  const handleOpenHayeon = () => setShowHayeonGallery(true)
  const handleCloseHayeon = () => {
    setShowHayeonGallery(false)
    setHayeonViewed(true)
  }

  const allViewed = sohyunViewed && xinyuViewed && hayeonViewed

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <motion.div
          className="relative z-10 max-w-md md:max-w-lg w-full" // Aumentado um pouco o max-w para 3 botões
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="relative w-full pt-[110%] md:pt-[100%]">
            {" "}
            {/* Ajustado pt para acomodar melhor */}
            <div className="absolute inset-0">
              <Image src="/images/dialog-frame.png" alt="Decorative frame" fill className="object-contain pixelated" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-[10%] pt-[12%]">
              <h2
                className="text-xl md:text-2xl text-red-600 text-center mb-4 md:mb-6"
                style={{
                  fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace",
                  textShadow: "1px 1px 0px rgba(0,0,0,0.1)",
                }}
              >
                <Gift size={28} className="inline mr-2 text-yellow-500" />
                Clique para abrir.
              </h2>

              <div className="w-full flex flex-col items-center gap-3 md:gap-4 mb-6 md:mb-8 px-50">
                {/* Primeira linha: SoHyun e XinYu */}
                <div className="flex justify-center gap-3 md:gap-4 w-full">
                  {/* Botão Sohyun */}
                  <motion.button
                    onClick={handleOpenSohyun}
                    className={`relative p-3 rounded-lg border-2 ${
                      sohyunViewed ? "border-pink-500 bg-pink-100" : "border-pink-300 bg-white"
                    } shadow-lg hover:shadow-xl transition-all w-32 md:w-36 flex flex-col items-center`} // Largura aumentada
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src="/images/objekts/sohyun_1.png"
                      alt="Abrir Objekts de SoHyun"
                      width={70} // Imagem um pouco maior
                      height={93}
                      className="mb-1 md:mb-2 rounded pixelated object-contain"
                    />
                    <span className="block text-center font-pixel text-sm md:text-base text-pink-700">Sohyun</span>
                    {sohyunViewed && <CheckCircle size={20} className="absolute top-1.5 right-1.5 text-pink-500" />}
                  </motion.button>

                  {/* Botão Xinyu */}
                  <motion.button
                    onClick={handleOpenXinyu}
                    className={`relative p-3 rounded-lg border-2 ${
                      xinyuViewed ? "border-blue-500 bg-blue-100" : "border-blue-300 bg-white"
                    } shadow-lg hover:shadow-xl transition-all w-32 md:w-36 flex flex-col items-center`} // Largura aumentada
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src="/images/objekts/xinyu_1.png"
                      alt="Abrir Objekts de XinYu"
                      width={70} // Imagem um pouco maior
                      height={93}
                      className="mb-1 md:mb-2 rounded pixelated object-contain"
                    />
                    <span className="block text-center font-pixel text-sm md:text-base text-blue-700">Xinyu</span>
                    {xinyuViewed && <CheckCircle size={20} className="absolute top-1.5 right-1.5 text-blue-500" />}
                  </motion.button>
                </div>

                {/* Segunda linha: Hayeon */}
                <div className="flex justify-center w-full mt-2">
                  <motion.button
                    onClick={handleOpenHayeon}
                    className={`relative p-3 rounded-lg border-2 ${
                      hayeonViewed ? "border-red-500 bg-red-100" : "border-red-300 bg-white"
                    } shadow-lg hover:shadow-xl transition-all w-32 md:w-36 flex flex-col items-center`} // Largura aumentada
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src="/images/objekts/hayeon/hayeon_objekt_1.png"
                      alt="Abrir Objekts de HaYeon"
                      width={70} // Imagem um pouco maior
                      height={93}
                      className="mb-1 md:mb-2 rounded pixelated object-contain"
                    />
                    <span className="block text-center font-pixel text-sm md:text-base text-red-700">Hayeon</span>
                    {hayeonViewed && <CheckCircle size={20} className="absolute top-1.5 right-1.5 text-red-500" />}
                  </motion.button>
                </div>
              </div>

              {allViewed && (
  <motion.button
    onClick={onComplete}
    className="absolute bottom-[-50px] px-6 py-2.5 md:px-8 md:py-3 overflow-hidden rounded-lg font-pixel text-base md:text-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Continuar
  </motion.button>
)}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showSohyunGallery && (
          <Popup category={sohyunPopupCategory} onClose={handleCloseSohyun} displayGalleryType="sohyun" />
        )}
        {showXinyuGallery && (
          <Popup category={xinyuPopupCategory} onClose={handleCloseXinyu} displayGalleryType="xinyu" />
        )}
        {showHayeonGallery && (
          <Popup category={hayeonPopupCategory} onClose={handleCloseHayeon} displayGalleryType="hayeon" />
        )}
      </AnimatePresence>
    </>
  )
}
