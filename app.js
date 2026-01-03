const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;

// Configuración de IA (usando la variable de entorno de Hostinger)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para procesar la IA
app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemPrompt = `
            Act as a professional sportswear designer for Visualynx. 
            User idea: "${prompt}"
            Based on this, choose:
            1. A main HEX color.
            2. An accent HEX color.
            3. A one-sentence professional design description in English.
            Return ONLY a JSON object like this: 
            {"primary": "#000000", "accent": "#FFD700", "description": "Elegant black marble with gold veins."}
        `;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        // Limpiamos la respuesta para asegurarnos de que sea un JSON válido
        const cleanJson = response.text().replace(/```json/g, "").replace(/```/g, "").trim();
        res.json(JSON.parse(cleanJson));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log('Visualynx Server Active on port ' + port);
});
