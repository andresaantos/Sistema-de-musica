const API_URL = 'https://sistema-de-musica.onrender.com';

document.getElementById('formularioRegistro').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('emailRegistro').value;
  const password = document.getElementById('senhaRegistro').value;
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (response.ok) {
    alert('User registered successfully!');
  } else {
    alert('Error registering user');
  }
});

document.getElementById('formularioLogin').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('emailLogin').value;
  const password = document.getElementById('senhaLogin').value;
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    alert('Login successful!');
  } else {
    alert('Login failed: ' + data.message);
  }
});

document.getElementById('btnObterMusicas').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first!');
    return;
  }
  const response = await fetch(`${API_URL}/musicas`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const musicas = await response.json();
  if (response.ok) {
    const listaMusicas = document.getElementById('listaMusicas');
    listaMusicas.innerHTML = '';
    musicas.forEach(musica => {
      const li = document.createElement('li');
      li.textContent = `${musica.titulo} - ${musica.artista}`;
      listaMusicas.appendChild(li);
    });
  } else {
    alert('Error fetching musicas: ' + musicas.message);
  }
});