const apiUrl = 'http://localhost:3000';

// Cargar lista de artistas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  fetch(`${apiUrl}/artistas`)
    .then(response => response.json())
    .then(artistas => {
      const select = document.getElementById('artistas');
      artistas.forEach(artista => {
        const option = document.createElement('option');
        option.value = artista.ID_Artista;
        option.textContent = artista.nombre_banda;
        select.appendChild(option);
      });
    });
});

// Cargar detalles del artista seleccionado
function cargarDetalles() {
  const id = document.getElementById('artistas').value;

  if (!id) {
    console.log('No se seleccionó ningún artista.');
    return;
  }

  fetch(`${apiUrl}/artistas/${id}`)
    .then(response => {
      if (!response.ok) throw new Error('Error al obtener los detalles del artista');
      return response.json();
    })
    .then(artista => {
      console.log('Datos del artista recibidos:', artista);

      if (artista) {
        // No necesitas convertir la fecha si ya está en formato YYYY-MM-DD
        let debutDate = artista.DEBUT;
        console.log("Fecha recibida:", debutDate);

        document.getElementById('nombre_banda').value = artista.NOMBRE_BANDA || '';
        document.getElementById('debut').value = debutDate || ''; // Asigna la fecha tal como está
        document.getElementById('contrato').value = artista.CONTRATO || '';
        document.getElementById('genero').value = artista.GENERO || '';
        document.getElementById('estado').value = artista.ESTADO || '';
        document.getElementById('pais').value = artista.PAIS || '';
        document.getElementById('descripcion').value = artista.DESCRIPCION || '';
        document.getElementById('detalles-artista').style.display = 'block';
      } else {
        console.error('No se encontraron detalles para el artista seleccionado.');
      }
    })
    .catch(error => console.error('Error en la solicitud:', error));
}

// Editar artista
function editarArtista() {
  const id = document.getElementById('artistas').value;
  const datos = {
    nombre_banda: document.getElementById('nombre_banda').value,
    debut: document.getElementById('debut').value,
    contrato: document.getElementById('contrato').value,
    genero: document.getElementById('genero').value,
    estado: document.getElementById('estado').value,
    pais: document.getElementById('pais').value,
    descripcion: document.getElementById('descripcion').value
  };

  fetch(`${apiUrl}/artistas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      location.reload();
    });
}

// Eliminar artista
function eliminarArtista() {
  const id = document.getElementById('artistas').value;

  fetch(`${apiUrl}/artistas/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      location.reload(); // Recarga la página para actualizar la lista
    });
}
