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
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("API Key no configurada en el servidor");
        }
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const fullPrompt = `Act as a creative sports jersey designer. User idea: ${prompt}. Return a brief professional design suggestion.`;
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        res.json({ text: response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log('Visualynx Server Active on port ' + port);
});
