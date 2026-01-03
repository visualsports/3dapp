const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/generate', async (req, res) => {
    // 1. Verificar si la clave existe en el servidor
    const key = process.env.GEMINI_API_KEY;
    
    if (!key) {
        return res.status(500).json({ error: "La clave GEMINI_API_KEY no está en Hostinger" });
    }

    try {
        const { prompt } = req.body;
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Un prompt ultra simple para probar
        const result = await model.generateContent("Respond with only the word: OK");
        const response = await result.response;
        const text = response.text();
        
        res.json({ debug: "Conexión con Google Exitosa", ai_says: text });

    } catch (error) {
        // Esto nos dirá el error real en la pantalla por ahora
        res.status(500).json({ 
            error: "Error Real de Google", 
            message: error.message,
            stack: error.stack 
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log('Server debug mode ready');
});
