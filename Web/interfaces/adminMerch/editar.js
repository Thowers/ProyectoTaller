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

  console.log('Solicitando merch para el artista con ID:', artistId);  // Verifica que el ID esté bien

  fetch(`${apiUrl}/artistas/${artistId}/merch`)  // Verifica que la URL sea correcta
    .then(response => {
      if (!response.ok) {
        console.error('Error al obtener el merch:', response.statusText);
        throw new Error('Error al obtener el merch');
      }
      return response.json();
    })
    .then(albums => {
      console.log('Merch recibido:', albums);  // Verifica que los álbumes están llegando

      // Limpia el selector de álbumes antes de cargar
      const select = document.getElementById('merch');
      select.innerHTML = '<option value="" disabled selected>Selecciona un merch</option>';

      // Añade las opciones de álbumes
      albums.forEach(album => {
        const option = document.createElement('option');
        option.value = album.id_merch;  // Asegúrate de que el id_artista_album es el campo correcto
        option.textContent = album.tipo;     // Cambié 'nombre_album' a 'nombre'
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar merch:', error);
    });
}

// Cargar detalles del album seleccionado
function cargarDetallesAlbum() {
  const albumId = document.getElementById('merch').value;

  if (!albumId) {
    console.log('No se seleccionó ningún merch.');
    return;
  }

  console.log('Solicitando detalles para el merch con ID:', albumId);  // Verifica el ID

  fetch(`${apiUrl}/merch/${albumId}`)
    .then(response => {
      if (!response.ok) throw new Error('Error al obtener los detalles del merch');
      return response.json();
    })
    .then(album => {
      console.log('Detalles del álbum recibidos:', album);

      // Asignar los valores a los campos del formulario  
      document.getElementById('color').value = album.COLOR || '';  
      document.getElementById('valor').value = album.VALOR || '';
      document.getElementById('cantidad').value = album.CANTIDAD || '';  

      // Mostrar el contenedor de detalles
      document.getElementById('detalles-artista').style.display = 'block';
    })
    .catch(error => console.error('Error en la solicitud:', error));
}

// Escuchar el cambio en el select de merch
document.getElementById('merch').addEventListener('change', function() {
  console.log('Cambio de selección en el merch');
  cargarDetallesAlbum();  // Llama a la función para cargar los detalles del álbum
});

// Editar Merch
function editarAlbum() {
  const albumId = document.getElementById('merch').value; 
  const datos = {       // Nombre del álbum
    color: document.getElementById('color').value,        // Fecha de salida
    valor: document.getElementById('valor').value,
    cantidad: document.getElementById('cantidad').value   // Tracklist del álbum
  };
  // Hacer la solicitud PUT para actualizar el merch
  fetch(`${apiUrl}/merch/${albumId}`, {
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

// Eliminar Merch
function eliminarAlbum() {
  const albumId = document.getElementById('merch').value;

  fetch(`${apiUrl}/merch/${albumId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      location.reload(); // Recarga la página para actualizar la lista
    });
}



