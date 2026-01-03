const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" } // Obligamos a que responda en JSON puro
        });

        const systemPrompt = `
            You are a professional sportswear designer. 
            User want: "${prompt}". 
            Return a JSON object with these exact keys:
            "primary": (a hex color code),
            "description": (a 10-word creative summary in English)
        `;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();
        
        // Enviamos la respuesta limpia al navegador
        res.json(JSON.parse(text));

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "IA Error", message: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log('Visualynx Server Active');
});
