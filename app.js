const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;

// Configurar IA con la clave segura de Hostinger
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// RUTA PARA LA IA
app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Le damos instrucciones precisas a Gemini para que actúe como diseñador textil
        const fullPrompt = `You are an expert sports apparel designer for Visual Sports. 
        The user wants a design based on: "${prompt}". 
        Return a JSON with: 
        1. primaryColor (hex), 
        2. accentColor (hex), 
        3. patternDescription (a short creative text).`;

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
    console.log('Visualynx AI Engine Ready');
});
