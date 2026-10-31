# AI Chatbot

A full-stack chatbot that runs entirely on your own computer. It uses a locally hosted LLM (Llama 3) through [Ollama](https://ollama.com), so it needs no cloud AI service or API key.

## Features

- **Multi-turn conversations:** the React app keeps the chat history and sends it with every message, so the model has the full context.
- **Local AI:** all messages stay on your computer and are answered by a model running through Ollama.
- **REST API:** an Express and TypeScript backend with request validation and error handling.
- **Chat interface:** a React frontend with a loading state while the model replies.

## Tech stack

| Layer    | Technologies                         |
| -------- | ------------------------------------ |
| Backend  | Node.js, Express, TypeScript         |
| Frontend | React, TypeScript, Vite, Axios       |
| AI       | Ollama, Llama 3                      |

## How it works

```text
React app (port 5173)
    |
    |  POST /api/chat with the full message history
    v
Express API (port 5000)
    |
    |  POST /api/chat
    v
Ollama (port 11434, llama3 model)
```

## Project structure

```text
ai-chatbot/
├── ai-chatbot-backend/
│   └── src/
│       ├── index.ts                  # Express server setup
│       ├── routes/chat.routes.ts     # POST /api/chat route
│       └── services/chatservice.ts   # Sends messages to Ollama
└── ai-chatbot-frontend/
    └── src/
        └── App.tsx                   # Chat interface
```

## Getting started

You need [Node.js](https://nodejs.org) (tested with version 22) and [Ollama](https://ollama.com) installed. Make sure Ollama is running before you start.

**1. Download the model:**

```bash
ollama pull llama3
```

**2. Start the backend in one terminal:**

```bash
cd ai-chatbot-backend
npm install
npm run dev
```

The API runs at `http://localhost:5000`. If something else is using port 5000, stop it first.

**3. Start the frontend in a second terminal:**

```bash
cd ai-chatbot-frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser and start chatting.

## API

### `POST /api/chat`

Send the conversation so far. The last message is the one the model answers.

**Request:**

```json
{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ]
}
```

**Response:**

```json
{
  "reply": "Hello! How can I help you today?"
}
```

| Status | Meaning                                  |
| ------ | ---------------------------------------- |
| `200`  | The model replied.                       |
| `400`  | The `messages` field is missing.         |
| `500`  | The request to the model failed.         |
