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
  if (!id) return;

  fetch(`${apiUrl}/artistas/${id}`)
    .then(response => response.json())
    .then(artista => {
      document.getElementById('nombre_banda').value = artista.nombre_banda;
      document.getElementById('debut').value = artista.debut;
      document.getElementById('contrato').value = artista.contrato;
      document.getElementById('genero').value = artista.genero;
      document.getElementById('estado').value = artista.estado;
      document.getElementById('pais').value = artista.pais;
      document.getElementById('descripcion').value = artista.descripcion;

      document.getElementById('detalles-artista').style.display = 'block';
    });
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
