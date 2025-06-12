import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// Importar fontes pixel do Google usando next/font/google
import { VT323, Press_Start_2P } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

// Configurar fontes pixel
const pixelFont = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel",
})

const pixelFontAlt = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel-alt",
})

export const metadata: Metadata = {
  title: "Mapa do Meu Olhar Sobre Você",
  description: "Um mapa interativo 8-bit com baús que revelam como eu te vejo",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} ${pixelFont.variable} ${pixelFontAlt.variable}`}>{children}</body>
    </html>
  )
}
