import { extras, lockedMonths } from "@/lib/trail-locked"
import { createLeadsClient } from "@/lib/supabase"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function cleanSource(value: unknown) {
  if (typeof value !== "string") return "roadmap"
  const trimmed = value.trim().slice(0, 120)
  if (!/^[\w./?=&%:+-]+$/.test(trimmed)) return "roadmap"
  return trimmed
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 })
  }

  const email =
    typeof payload === "object" &&
    payload !== null &&
    "email" in payload &&
    typeof payload.email === "string"
      ? payload.email.trim().toLowerCase()
      : ""

  if (!emailPattern.test(email) || email.length > 320) {
    return Response.json({ error: "invalid" }, { status: 400 })
  }

  const source =
    typeof payload === "object" && payload !== null && "source" in payload
      ? cleanSource(payload.source)
      : "roadmap"

  const supabase = createLeadsClient()
  if (!supabase) {
    return Response.json({ error: "unavailable" }, { status: 503 })
  }

  const { error } = await supabase.from("leads").insert({ email, source })
  if (error && error.code !== "23505") {
    return Response.json({ error: "unavailable" }, { status: 503 })
  }

  return Response.json(
    { months: lockedMonths, extras },
    { headers: { "Cache-Control": "no-store" } },
  )
}
