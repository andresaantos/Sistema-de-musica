const express = require('express');
const cors = require('cors');
const app = express();
const porta = 3000;

const authRoutes = require('./src/routes/authRoutes')

app.use(express.json());
app.use(cors());
app.use('/', authRoutes);

app.listen(porta, () => {
  console.log(`Servidor rodando em: http://localhost:${porta}`)
});