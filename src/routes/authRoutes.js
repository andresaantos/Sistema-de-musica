const express = require('express');
const router = express.Router()

const authController = require('../controllers/authController');
const autenticarJWT = require('../middlewares/authMiddleware');
const pool = require('../config/db');

router.get('/', (req, res) => {
  res.json({ status: 'ok', mensagem: 'Servidor funcionando!' });
});

router.post('/register', authController.register);
router.post('/login', authController.login);


router.get('/musicas', autenticarJWT, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, titulo, artista FROM musicas ORDER BY id ASC');
    return res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar músicas:', error);
    return res.status(500).send('Erro ao buscar músicas no banco de dados');
  }
});

module.exports = router;