
const Resume = require('../models/resumeModel');
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
require("dotenv").config();

const analyzeResume = async (req, res) => {
    const { resumeText } = req.body;
    console.log(resumeText);
    const prompt = `
    Analyze this resume and return:
    - Resume score (0–100)
    - Suggestions to improve
    - ATS score
    - Corrected version
    
    Resume:
    ${resumeText}
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    console.log(response.text);
}

const auth = async (req, res) => {
    const { user } = req.user;
    res.send({
        status: 200,
        user,
        message: "Welcome User",
    });
}

module.exports = { analyzeResume, auth };
