import type { Categoria } from "@/types"

export const categorias: Categoria[] = [
  {
    nome: "Flor",
    imagem: "/images/rosa_vermelha_pixel.png",
    texto:
      "E obviamente se você fosse uma flor, seria a rosa vermelha mais bonita do campo e eu seria a abelha que sempre estaria pousando em você.",
  },
  {
    nome: "Cor",
    imagem: "/images/cores_vermelho_rosa.png",
    texto:
      "Um vermelhão e rosinha claro, é simplesmente as cores que quando bate só remete a você.",
  },
  {
    nome: "Animal",
    imagem: "/images/gato_pixel.png",
    texto:
      "Essa e o gordinho são as minhas fofuras mas vai ela aqui, toda vez que vejo um gatinho lembro de como você gosta muito",
  },
  {
    nome: "Música",
    imagem: "/imagens/musica.png",
    texto: "Essa cura muito.",
  },
  {
    nome: "Fenomeno",
    imagem: "/images/arco_iris_pixel.png",
    texto:
      "Quando aparece eu fico insta feliz porque me lembra você, sempre bem linda.",
  },
  {
    nome: "Characters",
    imagem: "/placeholder.svg?width=200&height=200",
    texto: "Sempre que vejo essas só me vem você na cabeça",
    galleryImages: [
      { src: "/images/characters/yunjin.png", name: "" },
      { src: "/images/characters/mercy.png", name: "" },
      { src: "/images/characters/karina.png", name: "" },
      { src: "/images/characters/winter.png", name: "" },
      { src: "/images/seraphine.jpeg", name: "" },
      { src: "/images/characters/coca_zero.png", name: "" },
    ],
  },
  {
    nome: "Datas",
    imagem: "/placeholder.svg?width=200&height=200",
    texto: `14/01/2020: Dia que a gente se conheceu (aqui mandei um ticket pro twitter informar), foi meio aleatório mas sempre foi muito bom conversar com você.\n\n19/11/2020: Dia que você deu a fuga e fomos assistir anime madrugando junto, era pokas.\n\n21/11/2020: Aqui você simplesmente mandando um tutorial de delineado grosso quando eu tinha pedido.\n\nDezembro de 2020: Você desistindo e finalmente aceitando jogar lol comigo e ficando birutinha com a Seraphine (não sei a data exata porque nem a Riot tem essa info, mas foi por ai).`,
  },
  {
    nome: "❤️", 
    imagem: "/images/voce.png",
    texto: "Fiz essa aplicaçãozinha aqui pra mencionar cada coisa que eu vejo, ouço ou sinto e que me faz pensar em você.\n\nNa minha cabeça eu não poderia deixar esse dia passar em branco assim e queria fazer algo especial porque é o que você é pra mim.\n\nForam bons e longos dias fazendo tudo isso e por mais que tenha demorado não expressa nem 1% de tudo que sinto e gostaria de fazer pra ti.\n\nE ainda não acabou, tem muito mais pela frente, quando fechar essa caixinha.",
  },
]
