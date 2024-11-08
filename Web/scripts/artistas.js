document.addEventListener('DOMContentLoaded', function() {
  const selectArtistas = document.getElementById('artistas-select');
  const detallesArtistaDiv = document.getElementById('detalles-artista');

  // Cargar los artistas en la lista desplegable
  fetch('http://localhost:3000/artistas')
    .then(response => response.json())
    .then(artistas => {
      artistas.forEach(artista => {
        const option = document.createElement('option');
        option.value = artista.ID_Artista;
        option.textContent = artista.Nombre;
        selectArtistas.appendChild(option);
      });
    })
    .catch(error => console.error('Error al cargar los artistas:', error));

  // Mostrar los detalles del artista seleccionado
  selectArtistas.addEventListener('change', function() {
    const artistaId = selectArtistas.value;
    if (artistaId) {
      fetch(`http://localhost:3000/artistas/${artistaId}`)
        .then(response => response.json())
        .then(artista => {
          document.getElementById('nombre').textContent = artista.nombre_banda;
          document.getElementById('debut').textContent = artista.debut;
          document.getElementById('contrato').textContent = artista.contrato;
          document.getElementById('genero').textContent = artista.genero;
          document.getElementById('estado').textContent = artista.estado;
          document.getElementById('pais').textContent = artista.pais;
          document.getElementById('miembros').textContent = artista.descripcion;

          detallesArtistaDiv.style.display = 'block';
        })
        .catch(error => console.error('Error al cargar los detalles del artista:', error));
    } else {
      detallesArtistaDiv.style.display = 'none';
    }
  });
});