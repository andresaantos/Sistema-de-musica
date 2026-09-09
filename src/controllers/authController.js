const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'secreta';

// Registro de usuário
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCheck = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).send('Usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO usuarios (email, senha) VALUES ($1, $2)',
      [email, hashedPassword]
    );

    return res.status(201).send('Usuário cadastrado com sucesso');
  } catch (error) {
    console.error('Erro no registro:', error);
    return res.status(500).send('Erro no servidor');
  }
};

// Login de usuário
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).send('Credenciais inválidas');
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.senha);

    if (!isPasswordValid) {
      return res.status(401).send('Credenciais inválidas');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).send('Erro no servidor');
  }
};