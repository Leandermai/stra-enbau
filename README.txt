# 🚧 Straßenbau – Lern-Roadmap Generator

Dieses Projekt generiert Lern-Roadmaps basierend auf Benutzereingaben.  
Das Frontend basiert auf **Vue 3** (Vite), das Backend nutzt **Node.js + Express** und eine LLM-API (LLaMA 3 via Groq).

---

## 📁 Projektstruktur


stra-enbau/
├── backend/ # Node.js + Express + Groq API Anbindung
├── frontend/ # Vue 3 + Vite
├── .gitignore
├── package.json # enthält nur Dev-Skripte (z.B. concurrently)
└── README.md

---

## 🚀 Startanleitung

1. **Repository klonen**
   git clone <dein-repo-link>
   cd stra-enbau

2. **Abhängigkeiten installieren**
   npm install && npm install --prefix frontend && npm install --prefix backend

3. **.env im Backend erstellen und eigenen API Key von Groq hinzufügen**
    https://console.groq.com/home
    Format in .env: GROQ_API_KEY = YOUR-KEY

4. **Starten der App**
    npm run dev

