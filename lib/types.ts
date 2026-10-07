export type Block = {
  label: string
  text?: string
  items?: string[]
  code?: string
}

export type Week = {
  n: number
  title: string
  blocks: Block[]
}

export type Month = {
  id: string
  number: string
  title: string
  focus: string
  project: string
  color: string
  note: string
  weeks: Week[]
}

export type Extra = {
  title: string
  kicker: string
  blocks: Block[]
}
