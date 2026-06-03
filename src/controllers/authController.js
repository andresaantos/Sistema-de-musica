const users = require('../models/modelUsers');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };
  users.push(user);
  res.status(201).send('Usuario registrado');
  console.log(`Usuario adicionado ao banco de dados: ${email}`)
};

const login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(e => e.email === email && e.password === password);
  console.log(`login usuario: ${email} e ${password}`);

  if(user){
    const token = jwt.sign({email}, 'segredoJWT', {expiresIn: '1h'});
    return res.json({token});
  }

  console.log("Login negado: credenciais inválidas.");
  res.status(401).send('Credenciais inválidas')

};


module.exports = {
  register,
  login
};