const express = require('express');
const cors = require('cors');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Zapatilla = require('./models/Zapatilla');
const zapatillasRoutes = require('./routes/zapatillas');
const sequelize = require('./database');
const User = require('./models/User');


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

        //Crea el nuevo usuario
        const nuevoUsuario = await User.create({
            username,
            userpassword,
            useremail,
            edad
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

// Ruta para verificar si el email tiene cuenta
app.post('/api/user/check-email', async (req, res) => {
    const { useremail } = req.body;

    try {
        const user = await User.findOne({ where: { useremail } });

        if (!user) {
            return res.status(404).json({ message: 'No se encontró una cuenta asociada a este correo electrónico.' });
        }

        res.status(200).json({ message: 'El correo electrónico existe.' });
    } catch (error) {
        console.error("Error al verificar el email:", error);
        res.status(500).json({ message: 'Error al verificar el correo electrónico.' });
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
                [Op.like]: `%${search}%` // Filtrar productos cuyo nombre contenga el término de búsqueda
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
            order: orderClause
        });

        res.json(zapatillas);
        
    } catch (error) {
        console.error("Error al obtener los productos:", error); // Imprime el error detallado
        res.status(500).json({ message: "Error al obtener los productos", error: error.message }); // Devuelve el mensaje de error
    }
});

app.listen(4000, () => {
    console.log('Servidor corriendo en http://localhost:4000');
});
