
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const fileUpload = require("express-fileupload");
const { GoogleGenAI } = require("@google/genai");
const userRoutes = require('./routes/userRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const jobRoutes = require('./routes/jobRoutes');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5501"],
    credentials: true,
}));

// connect to database
connectDB();

app.use('/api', userRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/job', jobRoutes);

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

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

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "what is javascript",
    });
    console.log(response.text);
}

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
