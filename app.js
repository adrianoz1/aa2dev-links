const icons = {
  YouTube: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z"/></svg>`,
  Instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/><path fill="currentColor" d="M17.1 2H6.9A4.9 4.9 0 0 0 2 6.9v10.2A4.9 4.9 0 0 0 6.9 22h10.2a4.9 4.9 0 0 0 4.9-4.9V6.9A4.9 4.9 0 0 0 17.1 2zM20.4 17.1a3.3 3.3 0 0 1-3.3 3.3H6.9a3.3 3.3 0 0 1-3.3-3.3V6.9a3.3 3.3 0 0 1 3.3-3.3h10.2a3.3 3.3 0 0 1 3.3 3.3v10.2z"/><circle fill="currentColor" cx="17.4" cy="6.6" r="1.1"/></svg>`,
  TikTok: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.8 3c.4 2.6 1.8 4.4 4.2 4.7v2.5c-1.4 0-2.8-.4-4.1-1.2v6.4c0 4.2-3.2 7.1-7 6.4-2.2-.4-3.9-2.2-4.3-4.4-.6-3.4 2-6.4 5.3-6.4.4 0 .8 0 1.2.1v2.7c-.4-.2-.8-.2-1.2-.2-1.6 0-2.8 1.3-2.7 2.9.1 1.4 1.3 2.5 2.7 2.5 1.5 0 2.6-1.2 2.6-2.8V3h3.1z"/></svg>`,
}

const site = window.site

document.querySelector("[data-name]").textContent = site.profile.name
document.querySelector("[data-handle]").textContent = site.profile.handle
document.querySelector("[data-bio]").textContent = site.profile.bio

const avatar = document.querySelector("[data-avatar]")
const avatarImage = avatar.querySelector("img")
avatarImage.alt = site.profile.name
const showPhoto = () => {
  avatar.dataset.photo = "true"
}
if (avatarImage.complete && avatarImage.naturalWidth > 0) {
  showPhoto()
} else {
  avatarImage.addEventListener("load", showPhoto)
}

const socialList = document.querySelector("[data-socials]")
socialList.replaceChildren(
  ...site.socials.map((social) => {
    const link = document.createElement("a")
    link.className = "social"
    link.href = social.href
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    link.innerHTML = `${icons[social.name] ?? ""}<span>${social.name}</span>`
    return link
  }),
)

const productsSection = document.querySelector("[data-products]")
if (site.products.length === 0) {
  productsSection.hidden = true
} else {
  const list = productsSection.querySelector("[data-product-list]")
  list.replaceChildren(
    ...site.products.map((product) => {
      const link = document.createElement("a")
      link.className = "product"
      link.href = product.href
      link.target = "_blank"
      link.rel = "noopener noreferrer"
      const name = document.createElement("span")
      name.className = "product-name"
      name.textContent = product.name
      link.append(name)
      if (product.note) {
        const note = document.createElement("span")
        note.className = "product-note"
        note.textContent = product.note
        link.append(note)
      }
      return link
    }),
  )
}
