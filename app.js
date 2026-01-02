const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('*', (req, res) => {
  res.send('<h1 style="font-family:sans-serif; text-align:center; margin-top:50px; color:#FFE135; background:#000; padding:50px; border-radius:20px;">🍌 NANO BANANA: CONECTADO POR GITHUB EXITOSAMENTE</h1>');
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor Visual Sport listo');
});
