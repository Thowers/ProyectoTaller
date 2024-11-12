// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Para encriptar las contraseñas
const saltRounds = 10; // Define la cantidad de saltos para la encriptación

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
  const { nombre, pais, usuario, contra, email } = req.body;

  // Insertar usuario con la contraseña sin encriptar
  const query = 'INSERT INTO usuario (nombre, pais, usuario, contra, email) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, pais, usuario, contra, email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al guardar los datos del usuario' });
    }
    res.status(200).json({ message: 'Usuario registrado exitosamente' });
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

    // Depuración: mostrar los resultados completos de la consulta
    console.log('Resultados de la consulta:', results);

    // Si no se encuentra el usuario, se responde con un error
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // La contraseña almacenada está en `results[0].contra`
    const storedPassword = results[0].CONTRA;
    console.log('Contraseña almacenada:', storedPassword);

    // Comparar la contraseña ingresada con la almacenada
    if (password === storedPassword) {
      // Contraseña correcta
      res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } else {
      // Contraseña incorrecta
      res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }
  });
});

// Codigo para manejar el envío de datos
app.post('/data', (req, res) => {
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

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});