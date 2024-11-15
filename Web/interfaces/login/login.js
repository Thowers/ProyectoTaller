document.querySelector('.my-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Realizar la solicitud POST a la API
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Redirigir a la página principal si el inicio de sesión es exitoso
        window.location.href = '/Web/interfaces/principal/main.html';
      } else {
        // Mostrar un mensaje de error si el inicio de sesión falla
        alert(data.message); // Mostramos el mensaje de error
      }
    })
    .catch(error => {
      console.error('Error al hacer la solicitud:', error);
      alert('Hubo un error al procesar tu solicitud');
    });
  });