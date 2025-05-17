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
        Erstelle eine ausführliche Lern-Roadmap zum Thema: **${prompt}**.
        
        Bitte gib die einzelnen Schritte **genau in folgendem Format** aus (keine Abweichungen):
        
        **1** **Titel des Schritts** **Persönlich formulierte Beschreibung in 1-3 Sätzen.**
        
        **2** **Nächster Titel** **Persönlich formulierte Beschreibung in 1-3 Sätzen.**
        
        Format-Hinweise für dich:
        - Die Sprache soll **auf Deutsch** sein.
        - Jeder Schritt soll so formuliert sein, dass er den Lernenden **direkt anspricht** („Lerne …“, „Entdecke …“, „Verstehe …“).
        - Die **Beschreibung soll motivierend, hilfreich und ausführlich** sein – mindestens 1 vollständiger Satz, gerne mehr.
        - Verwende **kein Fließtext**, **keine Listen**, **keine Einleitungen oder Schlüsse**, nur die nummerierten Schritte im Format wie oben gezeigt.
        - Keine zusätzlichen Kommentare oder Erklärungen außerhalb des Roadmaps-Formats.
        
        Beispiel für Ton und Stil:
        **1** **Grundlagen verstehen** **Lerne die wichtigsten Begriffe und Konzepte kennen, um dir ein solides Fundament aufzubauen. Du wirst überrascht sein, wie schnell du erste kleine Erfolge erzielen kannst!**
        
        Beginne jetzt mit der Erstellung der Roadmap.
            `.trim(),
          },
        ],

        temperature: 0.5,
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
