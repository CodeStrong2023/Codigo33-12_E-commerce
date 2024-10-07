const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

// Base de datos simulada de usuarios
const usuarios = [
    {
        username: 'gianellaAchetoni',
        email: 'gianellaachetoni@gmail.com',
        contraseña: '123456'
    },
    {
        username: 'ezequielFlores',
        email: 'ezequiel@gmail.com', 
        contraseña: '123456'
    },
    {
        username: 'jessiPagano',
        email: 'jessi@gmail.com', 
        contraseña: '123456'
    }
];

const app = express();
app.use(cors());  // Permite hacer solicitudes desde otro dominio
app.use(bodyParser.json());  // Para analizar los datos JSON

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tecnicatura.codigo.33.12@gmail.com',
    pass: 'tecnicatura2023',
  },
});

// Ruta para enviar la contraseña al correo
app.post('/enviar-contraseña', (req, res) => {
  const { email } = req.body;

  // Buscar el usuario por correo
  const usuarioEncontrado = usuarios.find(usuario => usuario.email === email);

  if (!usuarioEncontrado) {
    return res.status(404).json({ message: 'Correo no encontrado' });
  }

  // Configuración del correo
  const mailOptions = {
    from: 'tecnicatura.codigo.33.12@gmail.com',
    to: email,
    subject: 'Restauración de Contraseña',
    text: `Tu contraseña es: ${usuarioEncontrado.contraseña}`,
    html: `<p>Tu contraseña es: <strong>${usuarioEncontrado.contraseña}</strong></p>`,
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error al enviar el correo' });
    }
    res.status(200).json({ message: 'Correo enviado exitosamente' });
  });
});

// Iniciar el servidor en el puerto 5500
app.listen(5500, () => {
  console.log('Servidor corriendo en puerto 5500');
});

