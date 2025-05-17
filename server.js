const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Für den API-Schlüssel

const app = express();
app.use(express.json()); // Für JSON-Request-Body

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/v1'; // Überprüfe die URL

// Beispiel-Route für eine POST-Anfrage
app.post('/groq', async (req, res) => {
  try {
    const { question } = req.body; // Erwartet eine Frage im Body

    if (!question) {
      return res.status(400).json({ error: 'Bitte stelle eine Frage' });
    }

    // Setze API-Key in Header oder als Umgebungsvariable
    const headers = {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    };

    // Erstelle Payload für Groq API
    const payload = {
      // Hier müsstest du die genaue Payload-Struktur für die Groq API prüfen
      question,
    };

    const response = await axios.post(`${GROQ_API_URL}/endpoint`, payload, { headers });

    // Verarbeite die Antwort von Groq und sende sie zurück
    const answer = response.data; // Passe dies an die tatsächliche Antwortstruktur an
    res.json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));