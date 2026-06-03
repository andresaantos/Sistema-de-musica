const express = require('express');
const router = express.Router()

const authController = require('../controllers/authController');
const autenticarJWT = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
  res.json({ status: 'ok', mensagem: 'Servidor funcionando!' });
});

router.post('/register', authController.register);
router.post('/login', authController.login);


router.get('/musicas', autenticarJWT, (req, res) => {
  res.json(
    [
      { id: 1, titulo: 'Música A', artista: 'DJ A' },
      { id: 2, titulo: 'Música B', artista: 'DJ B' }
    ]
  )
})
module.exports = router;