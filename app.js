const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;

// Verificar clave en los registros de Hostinger
console.log("Comprobando API KEY...");
if (!process.env.GEMINI_API_KEY) {
    console.error("ERROR: GEMINI_API_KEY no encontrada en Variables de Entorno.");
} else {
    console.log("API KEY detectada correctamente.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: "API Key missing on server" });
        }
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const systemPrompt = `Act as a creative sports jersey designer. Idea: ${prompt}. Return a JSON: {"primary": "hex_color", "description": "short_text"}`;
        
        const result = await model.generateContent(systemPrompt);
        const text = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
        res.json(JSON.parse(text));
    } catch (error) {
        console.error("Error en IA:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log('Visualynx Server Active');
});
