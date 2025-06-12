"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { Categoria } from "@/types"
import { X } from "lucide-react"

interface PopupProps {
  category: Categoria
  onClose: () => void
  displayGalleryType?: "sohyun" | "xinyu" | "hayeon" | "objekts_category"
}

const sohyunObjekts = [
  "/images/objekts/sohyun_1.png",
  "/images/objekts/sohyun_2.png",
  "/images/objekts/sohyun_3.png",
  "/images/objekts/sohyun_4.png",
  "/images/objekts/sohyun_5.png",
  "/images/objekts/sohyun_6.png",
  "/images/objekts/sohyun_7.png",
]

const xinyuObjekts = [
  "/images/objekts/xinyu_1.png",
  "/images/objekts/xinyu_2.png",
  "/images/objekts/xinyu_3.png",
  "/images/objekts/xinyu_4.png",
  "/images/objekts/xinyu_5.png",
  "/images/objekts/xinyu_6.png",
  "/images/objekts/xinyu_7.png",
]

const hayeonObjekts = [
  "/images/objekts/hayeon/hayeon_objekt_1.png",
  "/images/objekts/hayeon/hayeon_objekt_2.png",
  "/images/objekts/hayeon/hayeon_objekt_3.png",
  "/images/objekts/hayeon/hayeon_objekt_4.png",
  "/images/objekts/hayeon/hayeon_objekt_5.png",
]

export default function Popup({ category, onClose, displayGalleryType }: PopupProps) {
  const isMusicCategory = category.nome === "Música"
  const isDatasCategory = category.nome === "Datas"
  const isCharactersCategory = category.nome === "Characters" && !!category.galleryImages
  const spotifyTrackId = "297eHOCtcTsaa8hqmuNDe0"

  let showSohyunSection = false
  let showXinyuSection = false
  let showHayeonSection = false

  if (displayGalleryType === "sohyun") {
    showSohyunSection = true
  } else if (displayGalleryType === "xinyu") {
    showXinyuSection = true
  } else if (displayGalleryType === "hayeon") {
    showHayeonSection = true
  } else if (displayGalleryType === "objekts_category" || category.nome === "Objekts") {
    // Lógica para uma categoria "Objekts" genérica, se necessário
    showSohyunSection = true
    showXinyuSection = true
    showHayeonSection = true // Poderia mostrar todas se fosse uma categoria genérica
  }

  const isAnyObjektsGalleryView = showSohyunSection || showXinyuSection || showHayeonSection

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <motion.div
        className="relative z-10 max-w-lg w-full"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <div className="relative w-full pt-[120%] md:pt-[100%]">
          <div className="absolute inset-0">
            <Image src="/images/dialog-frame.png" alt="Decorative frame" fill className="object-contain pixelated" />
          </div>
          <div className="absolute inset-0 flex flex-col p-[10%] pt-[12%]">
            <div className="flex justify-center items-center mb-2 md:mb-4">
              <h2
  className="text-xl md:text-2xl text-red-600 text-center mt-6 md:mt-8"

                style={{
                  fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace",
                  textShadow: "1px 1px 0px rgba(0,0,0,0.1)",
                }}
              >
                {category.nome}
              </h2>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="absolute right-[10%] top-[15%] md:right-[12%] md:top-[18%] w-8 h-8 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            <div className="flex-grow overflow-hidden flex flex-col justify-center items-center w-full">
              {isDatasCategory ? (
                <div className="bg-[#D2B48C] rounded-lg mb-3 flex flex-col mx-auto w-[95%] p-3 border-2 border-[#8B4513] shadow-inner overflow-y-auto max-h-[200px] md:max-h-[250px] lg:max-h-[300px]">
                  {category.texto.split("\n\n").map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#FFF8DC] p-2.5 mb-2.5 rounded shadow-sm border border-[#A0522D] text-sm md:text-base lg:text-lg text-[#5C3317] leading-snug"

                      style={{
                        fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace",
                        textShadow: "1px 1px 0px rgba(0,0,0,0.05)",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : isMusicCategory ? (
  <div className="bg-[#fff8e1] rounded-lg mb-3 flex flex-col justify-center items-center mx-auto w-[90%] p-2 border-2 border-[#AA8866] shadow-inner">
    <iframe
      style={{ borderRadius: "12px" }}
      src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=0`}
      width="100%"
      height="152"
      allowFullScreen={false}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title="Spotify Embed Player"
    ></iframe>

    {/* Texto descritivo abaixo do player */}
    {category.texto && (
      <div className="bg-[#FFF8DC] mt-3 p-2.5 rounded shadow-sm border border-[#A0522D] text-sm md:text-base text-[#5C3317] leading-snug w-full"
        style={{
          fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace",
          textShadow: "1px 1px 0px rgba(0,0,0,0.05)",
        }}
      >
        {category.texto}
      </div>
    )}
  </div>
              ) : isAnyObjektsGalleryView ? (
                <div className="bg-[#fff8e1] rounded-lg mb-3 flex flex-col flex-grow mx-auto w-full p-2 md:p-4 border-2 border-[#AA8866] shadow-inner overflow-y-auto max-h-[60vh] md:max-h-[50vh]">
                  {showSohyunSection && (
                    <div>
                      <h3 className="text-lg text-pink-600 mb-2 font-pixel text-center">Sohyun</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
                        {sohyunObjekts.map((src, index_sohyun) => (
                          <div
                            key={`sohyun-${index_sohyun}`}
                            className="relative aspect-[3/4] rounded overflow-hidden shadow-md border border-pink-200"
                          >
                            <Image
                              src={src || "/placeholder.svg"}
                              alt={`Sohyun Objekt ${index_sohyun + 1}`}
                              fill
                              className="object-cover pixelated"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {showXinyuSection && (
                    <div className={showSohyunSection ? "mt-4 md:mt-6" : ""}>
                      <h3 className="text-lg text-blue-600 mb-2 font-pixel text-center">Xinyu</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
                        {xinyuObjekts.map((src, index_xinyu) => (
                          <div
                            key={`xinyu-${index_xinyu}`}
                            className="relative aspect-[3/4] rounded overflow-hidden shadow-md border border-blue-200"
                          >
                            <Image
                              src={src || "/placeholder.svg"}
                              alt={`Xinyu Objekt ${index_xinyu + 1}`}
                              fill
                              className="object-cover pixelated"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {showHayeonSection && (
                    <div className={showSohyunSection || showXinyuSection ? "mt-4 md:mt-6" : ""}>
                      <h3 className="text-lg text-red-500 mb-2 font-pixel text-center">Hayeon</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
                        {hayeonObjekts.map((src, index_hayeon) => (
                          <div
                            key={`hayeon-${index_hayeon}`}
                            className="relative aspect-[3/4] rounded overflow-hidden shadow-md border border-red-200"
                          >
                            <Image
                              src={src || "/placeholder.svg"}
                              alt={`Hayeon Objekt ${index_hayeon + 1}`}
                              fill
                              className="object-cover pixelated"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : isCharactersCategory ? (
  <div className="bg-[#fff8e1] rounded-md mb-2 mx-auto w-[95%] p-2 border-2 border-[#AA8866] shadow-inner">
    <div className="grid grid-cols-3 gap-2">
      {category.galleryImages?.map((image, index) => (
        <div key={`char-${index}`} className="flex flex-col items-center">
          <div className="relative w-full aspect-square rounded-sm overflow-hidden shadow-sm border border-gray-200">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.name}
              fill
              className="object-contain pixelated p-0.5"
            />
          </div>
          <p className="text-[10px] leading-tight font-pixel text-center text-gray-700 mt-0.5">
            {image.name}
          </p>
        </div>
      ))}
    </div>
    {/* Adiciona a descrição abaixo das imagens */}
    {category.texto && (
      <div className="bg-[#FFF8DC] mt-3 p-2.5 rounded shadow-sm border border-[#A0522D] text-sm md:text-base text-[#5C3317] leading-snug"
        style={{
          fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace",
          textShadow: "1px 1px 0px rgba(0,0,0,0.05)",
        }}
      >
        {category.texto}
      </div>
    )}
  </div>
              ) : (
                <div className="bg-[#fff8e1] rounded-lg mb-3 flex justify-center items-center mx-auto w-[85%] max-h-[150px] md:max-h-[180px]">
                  <div className="relative w-full aspect-square max-h-[130px] md:max-h-[150px] my-2">
                    <Image
                      src={category.imagem || "/placeholder.svg?height=200&width=200"}
                      alt={category.nome}
                      fill
                      className="object-contain pixelated"
                    />
                  </div>
                </div>
              )}
            </div>

            {!isAnyObjektsGalleryView && !isMusicCategory && !isDatasCategory && !isCharactersCategory && (
              <div className="bg-[#fff8e1] rounded-lg p-2 overflow-auto max-h-[20vh] md:max-h-[25vh] lg:max-h-[120px] mx-auto w-[90%] border-2 border-[#AA8866] shadow-inner mt-2">
                <p
                  className="text-base md:text-lg leading-relaxed text-[#663300] tracking-wide"
                  style={{
                    fontFamily: "var(--font-pixel), var(--font-pixel-alt), monospace",
                    textShadow: "1px 1px 0px rgba(0,0,0,0.1)",
                    whiteSpace: "pre-line",
                  }}
                >
                  {category.texto}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
