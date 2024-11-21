// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia esto si tu usuario es diferente
  password: '', // Tu contraseña de MariaDB
  database: 'hoperecords' // Nombre de tu base de datos
});

// Conecta a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Código para manejar el envío de datos del registro
app.post('/registro', (req, res) => {
  const { nombre, pais, usuario, contra, email, tipo } = req.body;

  // Consulta SQL ajustada
  const query = `INSERT INTO usuario (nombre, pais, usuario, contra, email, tipo) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [nombre, pais, usuario, contra, email, tipo], (err, results) => {
      if (err) {
          console.error('Error al registrar usuario:', err);
          res.status(500).json({ error: 'Error al registrar usuario' });
          return;
      }
      res.status(201).json({ message: 'Usuario registrado correctamente', id: results.insertId });
  });
});

// Ruta de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Consulta para obtener los datos del usuario con el email proporcionado
  const query = 'SELECT * FROM usuario WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error al consultar el usuario:', err);
      return res.status(500).json({ error: 'Error al consultar el usuario' });
    }

    console.log('Resultados de la consulta:', results); // Agregar esta línea para ver los resultados

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const storedPassword = results[0].CONTRA;
    console.log('Contraseña almacenada:', storedPassword);

    if (password === storedPassword) {
      // Asegúrate de que se está devolviendo el tipo correctamente
      const tipo = results[0].TIPO;
      console.log('Tipo de usuario:', tipo); // Agregar esta línea para verificar si el tipo está bien

      res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', tipo });
    } else {
      res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }
  });
});

// Codigo para manejar el envío de artistas
app.post('/data_artista', (req, res) => {
  const { nombre_banda, debut, contrato, genero, estado, pais, descripcion } = req.body;
  const query = 'INSERT INTO artista (nombre_banda, debut, contrato, genero, estado, pais, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [nombre_banda, debut, contrato, genero, estado, pais, descripcion], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al guardar los datos' });
    } else {
      res.status(200).json({ message: 'Datos guardados correctamente' });
    }
  });
});

// Codigo para obtener los nombres de los artistas
app.get('/artistas', (req, res) => {
  const query = 'SELECT ID_Artista, nombre_banda FROM artista';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener los artistas');
    }
    res.json(results);
  });
});

// Codigo para obtener los detalles de un artista por su ID
app.get('/artistas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM artista WHERE ID_Artista = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener los detalles del artista:', err);
      return res.status(500).json({ error: 'Error al obtener los detalles del artista' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Artista no encontrado' });
    }
    res.json(results[0]);
  });
});

// Codigo para actualizar un artista
app.put('/artistas/:id', (req, res) => {
  const { id } = req.params;
  const { nombre_banda, debut, contrato, genero, estado, pais, descripcion } = req.body;
  const query = `UPDATE artista SET nombre_banda = ?, debut = ?, contrato = ?, genero = ?, estado = ?, pais = ?, descripcion = ? WHERE ID_Artista = ?`;

  db.query(query, [nombre_banda, debut, contrato, genero, estado, pais, descripcion, id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al actualizar los datos');
    }
    res.json({ message: 'Artista actualizado correctamente' });
  });
});

// Codigo para eliminar un artista
app.delete('/artistas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM artista WHERE ID_Artista = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al eliminar el artista');
    }
    res.json({ message: 'Artista eliminado correctamente' });
  });
});

// Codigo para manejar el envío de album
app.post('/data_album', (req, res) => {
  console.log('Datos recibidos en el servidor:', req.body);

  const { id_artista, nombre, salida, tracklist } = req.body;

  if (!id_artista || !nombre || !salida || !tracklist) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const query = 'INSERT INTO artista_album (id_artista, nombre, salida, tracklist) VALUES (?, ?, ?, ?)';
  db.query(query, [id_artista, nombre, salida, tracklist], (err, results) => {
      if (err) {
          console.error('Error en la consulta:', err.message);
          res.status(500).json({ error: 'Error al guardar los datos' });
      } else {
          res.status(200).json({ message: 'Datos guardados correctamente' });
      }
  });
});

// Obtener los álbumes de un artista
app.get('/artistas/:id/artistas_album', (req, res) => {
  const artistId = req.params.id;
  console.log('Solicitando álbumes para el artista con ID:', artistId);  // Verifica que el ID sea correcto

  const query = 'SELECT id_artista_album, nombre FROM artista_album WHERE id_artista = ?';  // Usamos el nombre correcto del campo

  db.query(query, [artistId], (err, results) => {
    if (err) {
      console.error('Error al obtener los álbumes:', err);
      res.status(500).json({ error: 'Error al obtener los álbumes' });
    } else {
      console.log('Álbumes obtenidos desde la base de datos:', results);  // Verifica que los datos estén llegando bien
      res.status(200).json(results);  // Devuelve los álbumes encontrados
    }
  });
});

// Obtener detalles del álbum
app.get('/albums/:id', (req, res) => {
  const albumId = req.params.id;
  console.log('ID del álbum:', albumId);  // Verifica el ID que estás recibiendo

  const query = 'SELECT * FROM artista_album WHERE id_artista_album = ?';
  
  db.query(query, [albumId], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);  // Más detalles sobre el error
      res.status(500).json({ error: 'Error al obtener los detalles del álbum' });
    } else {
      console.log('Detalles del álbum:', results);  // Verifica los resultados de la consulta
      res.status(200).json(results[0]);
    }
  });
});

//editar detalles album
app.put('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  const { nombre, salida, tracklist } = req.body;
  const query = `UPDATE artista_album SET nombre = ?, salida = ?, tracklist = ? WHERE id_artista_album = ?`;

  db.query(query, [nombre, salida, tracklist, albumId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al actualizar el álbum');
    }
    res.json({ message: 'Álbum actualizado correctamente' });
  });
});

// Codigo para eliminar un album
app.delete('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  console.log('ID del álbum a eliminar:', albumId);

  const query = 'DELETE FROM artista_album WHERE id_artista_album = ?';

  db.query(query, [albumId], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    } else if (results.affectedRows === 0) {
      console.log('Álbum no encontrado:', albumId);
      res.status(404).json({ message: 'Álbum no encontrado' });
    } else {
      console.log('Álbum eliminado:', albumId);
      res.json({ message: 'Álbum eliminado correctamente' });
    }
  });
});

// Codigo para manejar el envío de merch
app.post('/data_merch', (req, res) => {
  console.log('Datos recibidos en el servidor:', req.body);

  const { id_artista, tipo, color, valor, cantidad } = req.body;

  if (!id_artista || !tipo || !color || !valor || !cantidad) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const query = 'INSERT INTO merch (id_artista, tipo, color, valor, cantidad) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id_artista, tipo, color, valor, cantidad], (err, results) => {
      if (err) {
          console.error('Error en la consulta:', err.message);
          res.status(500).json({ error: 'Error al guardar los datos' });
      } else {
          res.status(200).json({ message: 'Datos guardados correctamente' });
      }
  });
});

// Obtener merch de merch
app.get('/artistas/:id/merch', (req, res) => {
  const artistId = req.params.id;
  console.log('Solicitando merch para el artista con ID:', artistId);  // Verifica que el ID sea correcto

  const query = 'SELECT id_merch, tipo FROM merch WHERE id_artista = ?';  // Usamos el nombre correcto del campo

  db.query(query, [artistId], (err, results) => {
    if (err) {
      console.error('Error al obtener los álbumes:', err);
      res.status(500).json({ error: 'Error al obtener los álbumes' });
    } else {
      console.log('Merch obtenida desde la base de datos:', results);  // Verifica que los datos estén llegando bien
      res.status(200).json(results);  // Devuelve los álbumes encontrados
    }
  });
});

// Obtener detalles de merch
app.get('/merch/:id', (req, res) => {
  const albumId = req.params.id;
  console.log('ID del álbum:', albumId);  // Verifica el ID que estás recibiendo

  const query = 'SELECT * FROM merch WHERE id_merch = ?';
  
  db.query(query, [albumId], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);  // Más detalles sobre el error
      res.status(500).json({ error: 'Error al obtener los detalles del merch' });
    } else {
      console.log('Detalles del merch:', results);  // Verifica los resultados de la consulta
      res.status(200).json(results[0]);
    }
  });
});

//editar detalles merch
app.put('/merch/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  const { color, valor, cantidad } = req.body;
  const query = `UPDATE merch SET color = ?, valor = ?, cantidad = ? WHERE id_merch = ?`;

  db.query(query, [color, valor, cantidad, albumId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al actualizar el merch');
    }
    res.json({ message: 'merch actualizado correctamente' });
  });
});

// Codigo para eliminar merch
app.delete('/merch/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  console.log('ID del merch a eliminar:', albumId);

  const query = 'DELETE FROM merch WHERE id_merch = ?';

  db.query(query, [albumId], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    } else if (results.affectedRows === 0) {
      console.log('Álbum no encontrado:', albumId);
      res.status(404).json({ message: 'Merch no encontrada' });
    } else {
      console.log('Álbum eliminado:', albumId);
      res.json({ message: 'Merch eliminada correctamente' });
    }
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});