const express = require('express');
const cors = require('cors');
const app = express();
const porta = process.env.PORT || 3000;

const authRoutes = require('./src/routes/authRoutes')

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/', authRoutes);

app.listen(porta, () => {
  console.log(`Servidor rodando em: ${porta}`)
});