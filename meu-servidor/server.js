const express = require('express');
const app = express();
const port = 3001; // Porta em que o servidor irá escutar

// Middleware para parsing de JSON
app.use(express.json());

// Endpoint para lidar com requisições POST em /items
app.post('/items', (req, res) => {
  const newItem = req.body;
  console.log('Item recebido:', newItem);
  // Aqui você pode adicionar o novo item ao banco de dados ou armazenamento em memória
  res.status(201).json(newItem); // Responde com o item criado
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
