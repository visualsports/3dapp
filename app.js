const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;

// Diagnóstico de Clave (Se ve en la pestaña 'Registros' de Hostinger)
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error("CRÍTICO: No se detecta la variable GEMINI_API_KEY en Hostinger.");
} else {
    console.log("SISTEMA: Clave de API detectada correctamente.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!API_KEY) return res.status(500).json({ error: "Server API Key missing" });

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`Sports design: ${prompt}. Return JSON: {"primary": "hex", "description": "text"}`);
        const response = await result.response;
        const text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();
        res.json(JSON.parse(text));
    } catch (error) {
        console.error("Error IA:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Visualynx en puerto ${port}`);
});
