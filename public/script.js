const API_URL = 'https://sistema-de-musica.onrender.com';
const token = localStorage.getItem('token');

fetch(`${API_URL}/musicas`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(async res => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
  return res.json();
})
.then(data => {
  console.log('Músicas:', data);
})
.catch(err => console.error('Erro ao buscar músicas:', err.message));

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
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.token);
    alert('Login successful!');
  } else {
    alert('Login failed: Credenciais inválidas');
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