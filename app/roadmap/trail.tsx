"use client"

import { useEffect, useRef, useState } from "react"
import { publicMonths } from "@/lib/trail-public"
import type { Block, Extra, Month } from "@/lib/types"

const UNLOCK_KEY = "aa2dev-roadmap-email"
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const lockedShells = [
  { id: "m4", number: "04", color: "#7aa2ff" },
  { id: "m5", number: "05", color: "#c084fc" },
  { id: "m6", number: "06", color: "#3ddc97" },
]

type SheetContent = {
  kicker: string
  title: string
  blocks: Block[]
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => (
        <section className="block" key={block.label}>
          <h3 className="block-label">{block.label}</h3>
          {block.text ? <p className="block-text">{block.text}</p> : null}
          {block.items ? (
            <ul className="block-list">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {block.code ? <pre className="block-code">{block.code}</pre> : null}
        </section>
      ))}
    </>
  )
}

export function Trail() {
  const roadmapRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDialogElement>(null)
  const [openId, setOpenId] = useState(publicMonths[0]?.id ?? "")
  const [lockedMonths, setLockedMonths] = useState<Month[] | null>(null)
  const [extras, setExtras] = useState<Extra[] | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const [sheet, setSheet] = useState<SheetContent | null>(null)
  const [gateTop, setGateTop] = useState<number | null>(null)
  const [ready, setReady] = useState(false)
  const unlocked = lockedMonths !== null && extras !== null

  useEffect(() => {
    let email = ""
    try {
      email = localStorage.getItem(UNLOCK_KEY) ?? ""
    } catch {
      email = ""
    }
    if (!emailPattern.test(email)) {
      setReady(true)
      return
    }
    let cancelled = false
    setPending(true)
    unlock(email).then((result) => {
      if (cancelled) return
      setPending(false)
      setReady(true)
      if (result) {
        setLockedMonths(result.months)
        setExtras(result.extras)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!sheet) return
    sheetRef.current?.showModal()
  }, [sheet])

  useEffect(() => {
    if (unlocked) return
    const place = () => {
      const root = roadmapRef.current
      const first = root?.querySelector(".is-locked")
      if (!root || !first) return
      setGateTop(first.getBoundingClientRect().top - root.getBoundingClientRect().top + 28)
    }
    place()
    window.addEventListener("resize", place)
    return () => window.removeEventListener("resize", place)
  }, [unlocked, pending])

  function openSheet(next: SheetContent) {
    setSheet(next)
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get("email") ?? "").trim()
    if (!emailPattern.test(email)) {
      setError("Informe um e-mail válido.")
      return
    }
    setError("")
    setPending(true)
    const result = await unlock(email)
    setPending(false)
    if (!result) {
      setError("Não consegui liberar agora. Tenta de novo.")
      return
    }
    try {
      localStorage.setItem(UNLOCK_KEY, email.trim().toLowerCase())
    } catch {
      // The trail still opens for this visit.
    }
    setLockedMonths(result.months)
    setExtras(result.extras)
  }

  const months = unlocked ? [...publicMonths, ...lockedMonths] : publicMonths

  return (
    <div className="roadmap-shell">
      <header className="hero">
        <a className="back" href="/">
          Links
        </a>
        <p className="eyebrow">AI Engineer · 6 meses</p>
        <h1>Trilha AI Engineer 2026</h1>
        <p className="lede">
          Um dev iniciante em 2026 não deve começar estudando IA isoladamente. Primeiro
          constrói software. Em cima disso, implementa modelos, dados e agentes. 24 semanas,
          70% programação e 30% teoria. Cada semana termina com um projeto funcionando.
        </p>
      </header>

      <div className="roadmap" ref={roadmapRef}>
        <ol className="trail">
          {months.map((month) => {
            const open = month.id === openId
            return (
              <li
                className={open ? "step is-open" : "step"}
                key={month.id}
                style={{ "--step": month.color } as React.CSSProperties}
              >
                <button
                  className="marker"
                  type="button"
                  aria-expanded={open}
                  aria-controls={month.id}
                  onClick={() => setOpenId(open ? "" : month.id)}
                >
                  {month.number}
                </button>
                <article className="card" id={month.id}>
                  <button
                    className="summary"
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? "" : month.id)}
                  >
                    <p className="kicker">
                      Mês {Number(month.number)} · {month.focus}
                    </p>
                    <h2>{month.title}</h2>
                    <ul className="deliveries">
                      <li>{month.project}</li>
                    </ul>
                  </button>
                  <div className="detail" hidden={!open}>
                    <p className="month-note">{month.note}</p>
                    <ol className="weeks">
                      {month.weeks.map((week) => (
                        <li className="week" key={week.n}>
                          <button
                            className="week-open"
                            type="button"
                            onClick={() =>
                              openSheet({
                                kicker: `Semana ${week.n}`,
                                title: week.title,
                                blocks: week.blocks,
                              })
                            }
                          >
                            Semana {week.n} · {week.title}
                          </button>
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              </li>
            )
          })}
          {unlocked
            ? null
            : lockedShells.map((shell) => (
                <li
                  className="step is-locked"
                  key={shell.id}
                  style={{ "--step": shell.color } as React.CSSProperties}
                  inert
                >
                  <button className="marker" type="button" disabled>
                    {shell.number}
                  </button>
                  <article className="card" id={shell.id}>
                    <button className="summary" type="button" disabled>
                      <p className="kicker">Mês {Number(shell.number)}</p>
                      <h2>Conteúdo trancado</h2>
                    </button>
                  </article>
                </li>
              ))}
        </ol>

        <section className={unlocked ? "extras" : "extras is-locked"} inert={!unlocked}>
          <h2 className="extras-title">Em volta da trilha</h2>
          {unlocked
            ? extras.map((extra) => (
                <button
                  className="extra"
                  type="button"
                  key={extra.title}
                  onClick={() =>
                    openSheet({
                      kicker: extra.kicker,
                      title: extra.title,
                      blocks: extra.blocks,
                    })
                  }
                >
                  <span className="kicker">{extra.kicker}</span>
                  <strong>{extra.title}</strong>
                </button>
              ))
            : [0, 1, 2, 3].map((item) => (
                <button className="extra" type="button" key={item} disabled>
                  <span className="kicker">Trancado</span>
                  <strong>Conteúdo trancado</strong>
                </button>
              ))}
        </section>

        <form
          className="gate"
          hidden={!ready || unlocked || gateTop === null}
          style={{ top: gateTop ?? 0 }}
          onSubmit={onSubmit}
        >
          <p className="kicker">Continua daqui</p>
          <h2>Os meses 4, 5 e 6</h2>
          <p className="gate-copy">
            Daqui a trilha sai da demo: RAG em produção, agentes, MCP e o projeto final.
          </p>
          <label className="gate-label" htmlFor="gate-email">
            E-mail
          </label>
          <input
            id="gate-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="voce@email.com"
          />
          <p className="gate-error" hidden={!error}>
            {error || "Informe um e-mail válido."}
          </p>
          <button className="gate-submit" type="submit" disabled={pending}>
            {pending ? "Liberando a trilha" : "Liberar a trilha"}
          </button>
          <p className="gate-consent">
            Vou usar este e-mail para avisar atualizações da trilha.
          </p>
        </form>
      </div>

      <dialog
        className="sheet"
        ref={sheetRef}
        onClick={(event) => {
          if (event.target === sheetRef.current) sheetRef.current?.close()
        }}
        onClose={() => setSheet(null)}
      >
        <div className="sheet-card">
          <button
            className="sheet-close"
            type="button"
            onClick={() => sheetRef.current?.close()}
          >
            Fechar
          </button>
          {sheet ? (
            <div>
              <p className="sheet-kicker">{sheet.kicker}</p>
              <h2 className="sheet-title">{sheet.title}</h2>
              <Blocks blocks={sheet.blocks} />
            </div>
          ) : null}
        </div>
      </dialog>
    </div>
  )
}

async function unlock(email: string) {
  const source =
    typeof window === "undefined" ? "roadmap" : `roadmap${window.location.search}`
  try {
    const response = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    })
    if (!response.ok) return null
    const data = (await response.json()) as { months?: Month[]; extras?: Extra[] }
    if (!Array.isArray(data.months) || !Array.isArray(data.extras)) return null
    return { months: data.months, extras: data.extras }
  } catch {
    return null
  }
}
