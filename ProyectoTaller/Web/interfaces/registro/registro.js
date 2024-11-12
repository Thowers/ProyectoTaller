document.getElementById('registroForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevenir el envío normal del formulario

    const nombre = document.getElementById('name').value;
    const usuario = document.getElementById('user').value;
    const pais = document.getElementById('country').value;
    const email = document.getElementById('email').value;
    const contra = document.getElementById('password').value;

    const userData = {
        nombre,
        usuario,
        pais,
        email,
        contra
    };

    // Enviar los datos al servidor
    fetch('http://localhost:3000/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Datos guardados correctamente:', data);
            alert('Registro exitoso');
            window.location.href = "http://127.0.0.1:5500/ProyectoTaller/Web/interfaces/login/login.html";
        })
        .catch((error) => {
            console.error('Error al registrar usuario:', error);
            alert('Hubo un error en el registro');
        });
});

fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(countries => {
        const countrySelect = document.getElementById("country");
        countries.forEach(country => {
            const option = document.createElement("option");
            option.value = country.cca2; // Usa el código de país como valor
            option.textContent = country.name.common; // Nombre del país
            countrySelect.appendChild(option);
        });
    })
    .catch(error => console.error("Error al cargar la lista de países:", error));



