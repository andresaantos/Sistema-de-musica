const express = require('express');
const cors = require('cors');
const app = express();
const porta = process.env.PORT || 3000;

const authRoutes = require('./src/routes/authRoutes')

app.use(express.json());
app.use(cors());
app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.send('API do Sistema de Músicas rodando com sucesso!');
});

app.listen(porta, () => {
  console.log(`Servidor rodando em: ${porta}`)
});