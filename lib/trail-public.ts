import type { Month } from "./types"

export const publicMonths: Month[] = [
  {
    "id": "m1",
    "number": "01",
    "title": "Ser desenvolvedor antes de ser dev de IA",
    "focus": "Programação + backend",
    "project": "Task Management API",
    "color": "#ffd45c",
    "note": "Sem LangChain, RAG, agentes ou MCP. Primeiro uma aplicação normal. Recomendamos Python como linguagem principal.",
    "weeks": [
      {
        "n": 1,
        "title": "Python",
        "blocks": [
          {
            "label": "Estude",
            "items": [
              "tipos, variáveis, listas, dict, sets e tuples",
              "loops, funções e exceptions",
              "módulos, packages, virtual environments e pip",
              "typing e type hints desde o começo"
            ]
          },
          {
            "label": "O formato que importa",
            "code": "def find_user(user_id: int) -> User | None:\n    ..."
          },
          {
            "label": "Depois",
            "items": [
              "dataclasses",
              "pydantic"
            ]
          },
          {
            "label": "Projeto",
            "items": [
              "CLI Task Manager",
              "comandos add, list, complete e delete",
              "persistência em JSON"
            ]
          }
        ]
      },
      {
        "n": 2,
        "title": "Git, orientação a objetos e testes",
        "blocks": [
          {
            "label": "Git",
            "items": [
              "git init, add, commit",
              "branch, merge, rebase",
              "pull e push",
              "working tree, staging, commit, branch e remote"
            ]
          },
          {
            "label": "Python",
            "items": [
              "class, inheritance e composition",
              "interfaces e protocols",
              "dependency injection"
            ]
          },
          {
            "label": "Testes",
            "items": [
              "pytest",
              "unit tests",
              "mocks",
              "fixtures"
            ]
          },
          {
            "label": "Por que isso importa",
            "text": "Quem não testa acaba escrevendo um prompt e torcendo para funcionar."
          }
        ]
      },
      {
        "n": 3,
        "title": "HTTP e APIs",
        "blocks": [
          {
            "label": "Estude",
            "items": [
              "HTTP, REST, JSON",
              "headers, cookies, status codes",
              "JWT, OAuth e CORS",
              "GET, POST, PUT, PATCH e DELETE"
            ]
          },
          {
            "label": "Stack",
            "items": [
              "FastAPI",
              "Pydantic",
              "Uvicorn"
            ]
          },
          {
            "label": "API",
            "items": [
              "POST /users",
              "GET /users/{id}",
              "PATCH /users/{id}",
              "DELETE /users/{id}"
            ]
          }
        ]
      },
      {
        "n": 4,
        "title": "Banco de dados",
        "blocks": [
          {
            "label": "Antes de vector database",
            "text": "Aprenda banco normal. PostgreSQL."
          },
          {
            "label": "SQL",
            "items": [
              "SELECT, INSERT, UPDATE, DELETE",
              "JOIN, GROUP BY, ORDER BY, WHERE, HAVING",
              "indexes, primary keys, foreign keys",
              "transactions, constraints e normalização"
            ]
          },
          {
            "label": "ORM",
            "items": [
              "SQLAlchemy"
            ]
          },
          {
            "label": "Projeto do mês",
            "text": "Task Management API. FastAPI, service, repository e PostgreSQL. Com Docker, pytest, Git e README. Essa base segura todo o resto."
          }
        ]
      }
    ]
  },
  {
    "id": "m2",
    "number": "02",
    "title": "Entrando em LLMs",
    "focus": "LLMs + APIs + prompting",
    "project": "Aplicação com LLM",
    "color": "#3dbec8",
    "note": "Primeiro usar o modelo. Depois entender o modelo. Não comece treinando nada. Nada de framework ainda.",
    "weeks": [
      {
        "n": 5,
        "title": "APIs de LLM",
        "blocks": [
          {
            "label": "Estude",
            "items": [
              "system, user e assistant message",
              "tokens e context window",
              "temperature",
              "streaming",
              "structured outputs"
            ]
          },
          {
            "label": "Na mão",
            "code": "def ask_llm(question):\n    response = client.responses.create(...)\n    return response"
          },
          {
            "label": "Depois",
            "text": "Faça a mesma chamada com streaming. O conceito importa mais que o fornecedor."
          }
        ]
      },
      {
        "n": 6,
        "title": "Prompt engineering para software",
        "blocks": [
          {
            "label": "Estude",
            "items": [
              "few-shot e zero-shot",
              "structured output",
              "context engineering",
              "prompt templates",
              "constraints",
              "JSON schema"
            ]
          },
          {
            "label": "Saída que um sistema consegue usar",
            "code": "{\n  \"seniority\": \"junior\",\n  \"skills\": [\"python\", \"postgresql\"],\n  \"score\": 72\n}"
          }
        ]
      },
      {
        "n": 7,
        "title": "Tool calling",
        "blocks": [
          {
            "label": "O fluxo",
            "items": [
              "usuário pergunta",
              "o modelo decide que precisa de uma ferramenta",
              "a ferramenta roda, por exemplo get_weather()",
              "o resultado volta para o modelo"
            ]
          },
          {
            "label": "Estude",
            "items": [
              "function calling",
              "tool schemas",
              "tool selection",
              "tool results"
            ]
          },
          {
            "label": "Construa",
            "items": [
              "calculator()",
              "weather()",
              "search_database()"
            ]
          },
          {
            "label": "Para onde isso leva",
            "text": "Esse exercício prepara agentes e MCP."
          }
        ]
      },
      {
        "n": 8,
        "title": "Como um LLM funciona",
        "blocks": [
          {
            "label": "Teoria suficiente",
            "items": [
              "tokenização e embeddings",
              "transformers, attention e self-attention",
              "positional encoding",
              "inference, training e fine-tuning",
              "parameters, weights, logits e softmax",
              "temperature e sampling"
            ]
          },
          {
            "label": "Prática",
            "text": "Curso de LLMs da Hugging Face. Rode um modelo local pequeno.",
            "code": "from transformers import pipeline"
          }
        ]
      }
    ]
  },
  {
    "id": "m3",
    "number": "03",
    "title": "Embeddings, vector database e RAG",
    "focus": "O mês mais importante",
    "project": "Chat com documentos",
    "color": "#ff8a3d",
    "note": "Construa o RAG sem framework. Se você entende o pipeline na mão, você entende RAG.",
    "weeks": [
      {
        "n": 9,
        "title": "Similaridade",
        "blocks": [
          {
            "label": "A ideia",
            "text": "Um texto vira um vetor. Textos parecidos ficam perto. Cachorro fica perto de golden retriever. Carro fica perto de automóvel, não de banana."
          },
          {
            "label": "Estude",
            "items": [
              "vectors e dimensions",
              "cosine similarity",
              "dot product",
              "euclidean distance",
              "nearest neighbors"
            ]
          }
        ]
      },
      {
        "n": 10,
        "title": "Vector database",
        "blocks": [
          {
            "label": "Comece aqui",
            "text": "PostgreSQL + pgvector. Não comece por Pinecone, Weaviate ou Qdrant. Você junta SQL e busca vetorial."
          },
          {
            "label": "Estude",
            "items": [
              "vector e cosine similarity",
              "HNSW e IVFFlat",
              "approximate nearest neighbors",
              "recall e latency"
            ]
          }
        ]
      },
      {
        "n": 11,
        "title": "RAG sem framework",
        "blocks": [
          {
            "label": "Indexação",
            "items": [
              "PDF vira texto",
              "texto vira chunks",
              "chunks viram embeddings",
              "embeddings vão para o banco vetorial"
            ]
          },
          {
            "label": "Pergunta",
            "items": [
              "a pergunta vira embedding",
              "a busca devolve os top K chunks",
              "o prompt junta pergunta e trechos",
              "o modelo responde"
            ]
          },
          {
            "label": "Na mão",
            "code": "query_embedding = embed(question)\ndocuments = search_similar(query_embedding, limit=5)\nprompt = build_prompt(question, documents)\nresponse = llm(prompt)"
          }
        ]
      },
      {
        "n": 12,
        "title": "RAG melhor e o chat com documentos",
        "blocks": [
          {
            "label": "Estude",
            "items": [
              "chunk size e chunk overlap",
              "metadata filtering e top-k",
              "reranking",
              "hybrid search: BM25 + embeddings",
              "semantic search e keyword search",
              "query rewriting e multi-query retrieval"
            ]
          },
          {
            "label": "Projeto do mês",
            "text": "O usuário sobe PDF, DOCX, TXT ou Markdown. FastAPI, parser, chunker, embeddings, Postgres + pgvector, retriever e LLM. A resposta mostra fontes e os trechos usados."
          }
        ]
      }
    ]
  }
]
