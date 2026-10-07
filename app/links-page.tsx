"use client"

import { useState } from "react"
import { products, profile, roadmapLink, socials } from "@/lib/site"

const icons: Record<string, React.ReactNode> = {
  YouTube: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z"
      />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
      />
      <path
        fill="currentColor"
        d="M17.1 2H6.9A4.9 4.9 0 0 0 2 6.9v10.2A4.9 4.9 0 0 0 6.9 22h10.2a4.9 4.9 0 0 0 4.9-4.9V6.9A4.9 4.9 0 0 0 17.1 2zM20.4 17.1a3.3 3.3 0 0 1-3.3 3.3H6.9a3.3 3.3 0 0 1-3.3-3.3V6.9a3.3 3.3 0 0 1 3.3-3.3h10.2a3.3 3.3 0 0 1 3.3 3.3v10.2z"
      />
      <circle fill="currentColor" cx="17.4" cy="6.6" r="1.1" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.8 3c.4 2.6 1.8 4.4 4.2 4.7v2.5c-1.4 0-2.8-.4-4.1-1.2v6.4c0 4.2-3.2 7.1-7 6.4-2.2-.4-3.9-2.2-4.3-4.4-.6-3.4 2-6.4 5.3-6.4.4 0 .8 0 1.2.1v2.7c-.4-.2-.8-.2-1.2-.2-1.6 0-2.8 1.3-2.7 2.9.1 1.4 1.3 2.5 2.7 2.5 1.5 0 2.6-1.2 2.6-2.8V3h3.1z"
      />
    </svg>
  ),
  Roadmap: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.5 5.2 9 6.8l6-2.2 4.5 1.6v12.6L15 17.2l-6 2.2-4.5-1.6V5.2zm6 2.3v10.1l3-1.1V6.4l-3 1.1z"
      />
    </svg>
  ),
}

function trackClick(name: string, href: string, kind: string) {
  if (typeof window.gtag !== "function") return
  window.gtag("event", "click_link", {
    link_name: name,
    link_url: href,
    link_kind: kind,
  })
}

export function LinksPage() {
  const [photo, setPhoto] = useState(false)

  return (
    <div className="links-shell">
      <main className="page">
        <header className="profile">
          <div className="avatar" data-photo={photo ? "true" : undefined}>
            <img
              src="/avatar.jpg"
              alt={profile.name}
              ref={(node) => {
                if (node?.complete && node.naturalWidth > 0) setPhoto(true)
              }}
              onLoad={(event) => {
                if (event.currentTarget.naturalWidth > 0) setPhoto(true)
              }}
            />
            <span className="avatar-mark">AA</span>
          </div>
          <h1>{profile.name}</h1>
          <p className="handle">{profile.handle}</p>
          <p className="bio">{profile.bio}</p>
        </header>

        <nav className="socials" aria-label="Links">
          {socials.map((social) => (
            <a
              key={social.name}
              className="social"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick(social.name, social.href, "social")}
            >
              {icons[social.name]}
              <span>{social.name}</span>
            </a>
          ))}
          <a
            className="social"
            href={roadmapLink.href}
            onClick={() => trackClick(roadmapLink.name, roadmapLink.href, "roadmap")}
          >
            {icons.Roadmap}
            <span>{roadmapLink.name}</span>
          </a>
        </nav>

        {products.length > 0 ? (
          <section className="products">
            <h2>Indicações</h2>
            <div className="product-list">
              {products.map((product) => (
                <a
                  key={product.href}
                  className="product"
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick(product.name, product.href, "product")}
                >
                  <span className="product-name">{product.name}</span>
                  {product.note ? <span className="product-note">{product.note}</span> : null}
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
