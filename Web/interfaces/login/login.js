document.querySelector('.my-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Realizar la solicitud POST a la API
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Datos de usuario:', data); // Verifica la respuesta del servidor
      
      if (data.tipo) {
        localStorage.setItem('tipo', data.tipo);
        localStorage.setItem('userLoggedIn', true);
  
        // Redirigir a la página principal si el inicio de sesión es exitoso
        window.location.href = '/Web/interfaces/principal/main.html';
      } else {
        alert('Error: No se recibió tipo de usuario');
      }
    } else {
      alert(data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un error al procesar tu solicitud');
  });
});