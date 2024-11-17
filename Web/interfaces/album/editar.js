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

document.addEventListener('DOMContentLoaded', function () {
  const artistasSelect = document.getElementById('artistas');

  if (artistasSelect) {
    artistasSelect.addEventListener('change', function () {
      console.log('Cambio de selección en el artista');
      console.log('Nuevo valor del artista:', this.value);
      cargarAlbums(); // Llama a la función para cargar los álbumes
    });
  } else {
    console.log("El elemento 'artistas' no se encuentra.");
  }
});

function cargarAlbums() {
  const artistId = document.getElementById('artistas').value;

  if (!artistId) {
    console.log('No se seleccionó ningún artista.');
    return;
  }

  console.log('Solicitando álbumes para el artista con ID:', artistId);  // Verifica que el ID esté bien

  fetch(`${apiUrl}/artistas/${artistId}/artistas_album`)  // Verifica que la URL sea correcta
    .then(response => {
      if (!response.ok) {
        console.error('Error al obtener los álbumes:', response.statusText);
        throw new Error('Error al obtener los álbumes');
      }
      return response.json();
    })
    .then(albums => {
      console.log('Álbumes recibidos:', albums);  // Verifica que los álbumes están llegando

      // Limpia el selector de álbumes antes de cargar
      const select = document.getElementById('albums');
      select.innerHTML = '<option value="" disabled selected>Selecciona un álbum</option>';

      // Añade las opciones de álbumes
      albums.forEach(album => {
        const option = document.createElement('option');
        option.value = album.id_artista_album;  // Asegúrate de que el id_artista_album es el campo correcto
        option.textContent = album.nombre;     // Cambié 'nombre_album' a 'nombre'
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar álbumes:', error);
    });
}

// Cargar detalles del album seleccionado
function cargarDetallesAlbum() {
  const albumId = document.getElementById('albums').value;

  if (!albumId) {
    console.log('No se seleccionó ningún álbum.');
    return;
  }

  console.log('Solicitando detalles para el álbum con ID:', albumId);  // Verifica el ID

  fetch(`${apiUrl}/albums/${albumId}`)
    .then(response => {
      if (!response.ok) throw new Error('Error al obtener los detalles del álbum');
      return response.json();
    })
    .then(album => {
      console.log('Detalles del álbum recibidos:', album);

      // Asignar los valores a los campos del formulario
      document.getElementById('nombre').value = album.NOMBRE || '';  // Nombre del álbum
      document.getElementById('salida').value = album.SALIDA ? album.SALIDA.split('T')[0] : '';  // Fecha de salida
      document.getElementById('descripcion').value = album.TRACKLIST || '';  // Tracklist

      // Mostrar el contenedor de detalles
      document.getElementById('detalles-artista').style.display = 'block';
    })
    .catch(error => console.error('Error en la solicitud:', error));
}

// Escuchar el cambio en el select de álbumes
document.getElementById('albums').addEventListener('change', function() {
  console.log('Cambio de selección en el álbum');
  cargarDetallesAlbum();  // Llama a la función para cargar los detalles del álbum
});

// Editar álbum
function editarAlbum() {
  const albumId = document.getElementById('albums').value; 
  const datos = {
    nombre: document.getElementById('nombre').value,        // Nombre del álbum
    salida: document.getElementById('salida').value,        // Fecha de salida
    tracklist: document.getElementById('descripcion').value   // Tracklist del álbum
  };
  // Hacer la solicitud PUT para actualizar el álbum
  fetch(`${apiUrl}/albums/${albumId}`, {
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

// Eliminar album
function eliminarAlbum() {
  const albumId = document.getElementById('albums').value;

  fetch(`${apiUrl}/albums/${albumId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      location.reload(); // Recarga la página para actualizar la lista
    });
}

