import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

const PORT = 3000;

app.post("/api/roadmap", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: `
            Erstelle eine Lern-Roadmap zum Thema: ${prompt}.

            Bitte gib die Schritte **immer im folgenden Format** aus:

            **1** **Titel des Schritts** **Kurze Beschreibung in 1–2 Sätzen.**

            **2** **Nächster Titel** **Beschreibung...**

            Die Ausgabe soll:
            - auf Deutsch sein
            - keine zusätzlichen Kommentare enthalten
            - exakt diesem Format folgen
            `.trim(),
          },
        ],

        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiReply = response.data.choices[0].message.content;
    res.json({ roadmap: aiReply });
  } catch (error) {
    // Mehr Details im Fehler-Log:
    console.error("Groq API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
