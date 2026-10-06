const profile = {
  name: "Adriano Almeida",
  handle: "@aa2dev",
  bio: "Estou construindo a casa mais tech do Brasil",
}

const socials = [
  { name: "YouTube", href: "https://www.youtube.com/@aa2dev" },
  { name: "Instagram", href: "https://www.instagram.com/aa2dev" },
  { name: "TikTok", href: "https://www.tiktok.com/@aa2dev" },
]

// Quando o endereço existir, preencha href.
const roadmap = {
  name: "Roadmap",
  href: "",
}

// Cada item: { name, href, note? }
// Exemplo: { name: "Relé Wi-Fi", href: "https://...", note: "o do quadro do vídeo" }
const products = []

window.site = { profile, socials, products, roadmap }
