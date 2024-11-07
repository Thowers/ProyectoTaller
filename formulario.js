document.getElementById('artistasregistro').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario
  
    // Recoge los datos del formulario
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
  
    // Realiza la solicitud POST
    fetch('http://localhost:3000/data', { // Asegúrate de usar el puerto correcto aquí
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        // Maneja la respuesta del servidor aquí
    })
    .catch(error => {
        console.error('Error:', error);
    });
  });