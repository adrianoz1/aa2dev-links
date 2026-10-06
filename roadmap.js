const months = [
  {
    id: "m1",
    number: "01",
    title: "Python e modelo com propósito",
    color: "#ffd45c",
    topics: [
      "Sintaxe Python, arquivos e ambiente virtual",
      "Git o bastante para versionar",
      "HTTP, JSON e chave fora do código",
      "LLM, inferência versus treino",
      "Prompt, contexto, token, custo e saída estruturada",
    ],
    projects: [
      "Chat no terminal com um modelo",
      "Um texto solto vira tarefas com prazo",
    ],
  },
  {
    id: "m2",
    number: "02",
    title: "RAG que cita",
    color: "#3dbec8",
    topics: [
      "Pedaços de texto e embedding",
      "Um único banco vetorial",
      "Corte, metadado e trecho de origem",
      "Quando RAG ganha de fine-tuning",
    ],
    projects: [
      "Perguntas sobre os próprios arquivos",
      "O assistente recusa quando o documento não tem a resposta",
    ],
  },
  {
    id: "m3",
    number: "03",
    title: "Ferramentas e publicação",
    color: "#ff8a3d",
    topics: [
      "Function calling com duas ou três ferramentas",
      "Confirmação antes de uma ação irreversível",
      "Registro do que o agente fez",
      "Agente de poucos passos e MCP como tomada",
      "Injeção de prompt como regra prática",
    ],
    projects: [
      "O assistente executa algo pequeno",
      "O assistente dos arquivos publicado",
    ],
  },
  {
    id: "m4",
    number: "04",
    title: "Avaliação e busca",
    color: "#7aa2ff",
    topics: [
      "Lista fixa de perguntas",
      "O que conta como resposta aceitável",
      "Custo e falha repetida",
      "Rerank, busca híbrida ou metadado só onde a lista falhar",
    ],
    projects: [
      "Rodar a lista a cada mudança de prompt ou busca",
      "A mesma lista com acertos antes e depois",
    ],
  },
  {
    id: "m5",
    number: "05",
    title: "Limites e API",
    color: "#c084fc",
    topics: [
      "O que o modelo não pode fazer",
      "Permissão, dado sensível e saída restringida",
      "API estável e segredo fora do repositório",
      "Log, custo e latência",
    ],
    projects: [
      "O assistente falha de forma segura quando alguém desvia o prompt",
      "Uma pessoa de fora usa sem o seu computador ligado",
    ],
  },
  {
    id: "m6",
    number: "06",
    title: "Segundo projeto e profundidade",
    color: "#3ddc97",
    topics: [
      "Outro domínio, reaproveitando RAG, ferramenta e avaliação",
      "Imagem ou áudio só se o caso pedir",
      "Fine-tuning se o RAG não resolveu, ou agente com memória",
      "Um texto curto da escolha e do que mudou na lista",
    ],
    projects: [
      "O segundo caso publicado em escala menor",
      "A profundidade medida na mesma lista de avaliação",
    ],
  },
]

const trail = document.querySelector("[data-trail]")
let openId = months[0].id

function render() {
  trail.replaceChildren(
    ...months.map((month) => {
      const open = month.id === openId
      const step = document.createElement("li")
      step.className = open ? "step is-open" : "step"
      step.style.setProperty("--step", month.color)

      const marker = document.createElement("button")
      marker.type = "button"
      marker.className = "marker"
      marker.textContent = month.number
      marker.setAttribute("aria-expanded", String(open))
      marker.setAttribute("aria-controls", month.id)
      marker.addEventListener("click", () => toggle(month.id))

      const card = document.createElement("article")
      card.className = "card"
      card.id = month.id

      const summary = document.createElement("button")
      summary.type = "button"
      summary.className = "summary"
      summary.setAttribute("aria-expanded", String(open))
      summary.addEventListener("click", () => toggle(month.id))

      const kicker = document.createElement("p")
      kicker.className = "kicker"
      kicker.textContent = `Mês ${Number(month.number)}`

      const title = document.createElement("h2")
      title.textContent = month.title

      const deliveries = document.createElement("ul")
      deliveries.className = "deliveries"
      month.projects.forEach((project) => {
        const item = document.createElement("li")
        item.textContent = project
        deliveries.append(item)
      })

      summary.append(kicker, title, deliveries)

      const detail = document.createElement("div")
      detail.className = "detail"
      detail.hidden = !open

      const topicLabel = document.createElement("p")
      topicLabel.className = "detail-label"
      topicLabel.textContent = "O que estudar"

      const topics = document.createElement("ul")
      topics.className = "topics"
      month.topics.forEach((topic) => {
        const item = document.createElement("li")
        item.textContent = topic
        topics.append(item)
      })

      detail.append(topicLabel, topics)
      card.append(summary, detail)
      step.append(marker, card)
      return step
    }),
  )
}

function toggle(id) {
  openId = openId === id ? "" : id
  render()
}

render()
