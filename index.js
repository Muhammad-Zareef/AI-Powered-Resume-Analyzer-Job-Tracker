const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const app = express();
require("dotenv").config();
app.use(express.json());

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/ask-ai", async (req, res) => {
    try {
        const userQuestion = req.body.question;
        // Prompt tayaar karna
        const prompt = `You are an AI assistant. Answer the following question clearly:Q: ${userQuestion}`;

        // AI ko request bhejna
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ text: prompt }]
        });

        // AI ka response extract karna
        const aiResponse = result.candidates[0].content.parts[0].text;

        // Client ko response send karna
        res.send({
            success: true,
            question: userQuestion,
            answer: aiResponse
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "AI Error", error: error.message });
    }
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000")
});