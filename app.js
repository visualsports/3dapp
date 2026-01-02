const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Le dice a Express que use la carpeta 'public' como raíz
app.use(express.static(path.join(__dirname, 'public')));

// Cualquier ruta que no sea un archivo, entrega el index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log('Visualynx Server Ready');
});
