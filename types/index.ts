export interface Categoria {
  nome: string
  imagem: string // Imagem principal para o baú ou item
  texto: string
  galleryImages?: { src: string; name: string }[] // Para galerias como "Characters"
}
