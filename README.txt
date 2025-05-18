# 🚧 Straßenbau – Lern-Roadmap Generator

Dieses Projekt generiert Lern-Roadmaps basierend auf Benutzereingaben.  
Das Frontend basiert auf **Vue3** (Vite), das Backend nutzt **Node.js + Express** und eine LLM-API (LLaMA3 via Groq).

## Projektstruktur

```markdown
stra-enbau/
├── backend/ # Node.js + Express + Groq API Anbindung
├── frontend/ # Vue3 + Vite
├── .gitignore
├── package.json # enthält nur Dev-Skripte (z.B. concurrently)
└── README.md
```

 

## Startanleitung

Um das Projekt zu starten, folge diesen Schritten:

### 1. Repository klonen

```bash
git clone <dein-repo-link>
cd stra-enbau
```

### 2. Abhängigkeiten installieren

```bash
npm install && npm install --prefix frontend && npm install --prefix backend
```

### 3. Groq API Key konfigurieren

Erstelle eine `.env`-Datei im Backend-Verzeichnis und füge deinen eigenen API Key von Groq hinzu:
```bash
# https://console.groq.com/home
GROQ_API_KEY=YOUR-KEY
```

### 4. App starten

```bash
npm run dev
```
