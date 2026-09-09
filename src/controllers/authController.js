const API_URL = 'https://sistema-de-musica.onrender.com';

document.getElementById('formularioRegistro').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('emailRegistro').value;
  const password = document.getElementById('senhaRegistro').value;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      alert('Usuário registrado com sucesso!');
    } else {
      const msg = await response.text();
      alert('Erro ao registrar: ' + msg);
    }
  } catch (error) {
    console.error('Erro na requisição de registro:', error);
    alert('Erro ao conectar com o servidor.');
  }
});

document.getElementById('formularioLogin').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('emailLogin').value;
  const password = document.getElementById('senhaLogin').value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      alert('Login realizado com sucesso!');
    } else {
      alert('Falha no login: Credenciais inválidas');
    }
  } catch (error) {
    console.error('Erro na requisição de login:', error);
    alert('Erro ao conectar com o servidor.');
  }
});

document.getElementById('btnObterMusicas').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Por favor, faça login primeiro!');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/musicas`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.ok) {
      const musicas = await response.json();
      const listaMusicas = document.getElementById('listaMusicas');
      listaMusicas.innerHTML = '';
      musicas.forEach(musica => {
        const li = document.createElement('li');
        li.textContent = `${musica.titulo} - ${musica.artista}`;
        listaMusicas.appendChild(li);
      });
    } else {
      const erroTexto = await response.text();
      alert('Erro ao buscar músicas: ' + erroTexto);
    }
  } catch (error) {
    console.error('Erro ao buscar músicas:', error);
    alert('Erro ao conectar com o servidor.');
  }
});