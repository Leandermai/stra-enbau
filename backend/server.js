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
        Create a detailed learning roadmap for the topic: **${prompt}**.
        
        Instructions:
        - Detect and use the **same language** as the prompt topic.
        - Return the roadmap in the following strict format:
        
        **1** **Title of the step** **Personal, engaging, and detailed description (1–3 sentences).**
        
        **2** **Next title** **Description...**
        
        Guidelines:
        - Format exactly as above: no bullet points, no introduction or conclusion.
        - Speak directly to the learner ("Learn …", "Explore …", etc.)
        - Make the description at least one full sentence — detailed, friendly, and helpful.
        - Do **not** add any extra text outside the numbered roadmap.
        
        Example (if German input):
        **1** **Grundlagen verstehen** **Lerne wichtige Begriffe und Konzepte kennen, um ein solides Fundament aufzubauen.**
        
        Begin the roadmap now.
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
