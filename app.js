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
            model: "gemini-1.5-flash"
        });

        // Prompt ultra-estricto
        const systemPrompt = `Return ONLY a JSON object. No markdown, no extra text.
        Structure: {"primary": "#HEXCOLOR", "description": "Short design summary"}.
        User request: "${prompt}"`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        let text = response.text();
        
        // LIMPIEZA DE EMERGENCIA: Quitamos posibles bloques de código markdown
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        
        console.log("Raw AI Text:", text); // Para ver en los logs de Hostinger

        const jsonResponse = JSON.parse(text);
        res.json(jsonResponse);

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Format error", message: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log('Visualynx Server Protected');
});
