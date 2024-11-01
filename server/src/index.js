import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import Zapatilla from './models/Zapatilla.js';
import zapatillasRoutes from './routes/zapatillas.js';
import { sequelize } from './database.js';
import User from './models/User.js';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para obtener la lista de usuarios
app.get('/api/user', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error al obtener usuarios');
  }
});

app.post('/api/user', async (req, res) => {
  try {
    const { username, userpassword, useremail, edad } = req.body;

    // Verificar si el email ya está en uso
    const usuarioExistente = await User.findOne({ where: { useremail } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    // Crea el nuevo usuario
    const nuevoUsuario = await User.create({
      username,
      userpassword,
      useremail,
      edad,
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', usuario: nuevoUsuario });
  } catch (error) {
    console.error("Error al crear el usuario:", error); // Esto es clave para ver el error real
    if (error instanceof Sequelize.ValidationError) {
      return res.status(400).json({ message: error.errors.map(err => err.message) });
    }
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Ruta para obtener información de un usuario específico por su username
app.get('/api/user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true para puerto 465, false para otros puertos
  auth: {
    user: 'codigofrsr@gmail.com',
    pass: 'sdlz gkzh bvrw ixyi',
  },
});

// Ruta para restablecer la contraseña
app.post('/api/user/reset-password', async (req, res) => {
  const { useremail } = req.body;

  try {
    const user = await User.findOne({ where: { useremail } });

    if (!user) {
      return res.status(404).json({ message: 'No se encontró una cuenta asociada a este correo electrónico.' });
    }

    // Aquí puedes definir el contenido del correo
    const mailOptions = {
      from: 'codigofrsr@gmail.com',
      to: useremail,
      subject: 'Restablecimiento de Contraseña',
      text: `Hola, aquí tienes tus credenciales:\n\nUsuario: ${user.username}\nContraseña: ${user.userpassword}`,
    };

    // Envía el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Se ha enviado un correo con tus credenciales.' });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: 'Error al restablecer la contraseña.' });
  }
});

app.get('/api/zapatillas', async (req, res) => {
  try {
    // Obtener los parámetros de consulta (query parameters)
    const { search, color, talle, marca, ordenarPor } = req.query;

    // Crear el objeto "where" para los filtros
    let whereClause = {}; // Asegúrate de definir la variable aquí

    // Agregar el filtro de búsqueda si está presente
    if (search) {
      whereClause.nombre = {
        [Op.like]: `%${search}%`, // Filtrar productos cuyo nombre contenga el término de búsqueda
      };
    }

    // Agregar los filtros si están presentes en los parámetros de consulta
    if (color) {
      whereClause.color = color;
    }
    if (talle) {
      whereClause.talle = talle;
    }
    if (marca) {
      whereClause.marca = marca;
    }

    // Crear el objeto "order" para la ordenación
    let orderClause = [];
    if (ordenarPor === 'menorMayor') {
      orderClause = [['precio', 'ASC']];
    } else if (ordenarPor === 'mayorMenor') {
      orderClause = [['precio', 'DESC']];
    } else if (ordenarPor === 'novedades') {
      orderClause = [['createdAt', 'DESC']]; // Suponiendo que tienes un campo createdAt para novedades
    }

    // Consultar la base de datos con los filtros y ordenación
    const zapatillas = await Zapatilla.findAll({
      where: whereClause,
      order: orderClause,
    });

    res.json(zapatillas);
  } catch (error) {
    console.error("Error al obtener los productos:", error); // Imprime el error detallado
    res.status(500).json({ message: "Error al obtener los productos", error: error.message }); // Devuelve el mensaje de error
  }
});

app.listen(4001, () => {
  console.log('Servidor corriendo en http://localhost:4001');
});

