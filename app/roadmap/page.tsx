import type { Metadata } from "next"
import { Trail } from "./trail"

export const metadata: Metadata = {
  title: "Roadmap de AI Engineer · aa2dev",
  description:
    "Plano de 6 meses para quem já programa e quer aplicar IA. Cerca de 16 horas por semana.",
}

export default function RoadmapPage() {
  return <Trail />
}
