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
      const errorMsg = await response.text();
      alert('Error fetching musicas: ' + errorMsg);
    }
  } catch (err) {
    console.error('Erro na requisição:', err);
  }
});