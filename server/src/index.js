const express = require('express'); // Asegúrate de que esta línea esté presente solo una vez
const cors = require('cors'); // Asegúrate de que esta línea también esté presente una vez
const Zapatilla = require('./models/Zapatilla'); 
const zapatillasRoutes = require('./routes/zapatillas');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/zapatillas', async (req, res) => {
    try {
        // Obtener los parámetros de consulta (query parameters)
        const { color, talle, marca, ordenarPor } = req.query;

        // Crear el objeto "where" para los filtros
        let whereClause = {};

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
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ message: "Error al obtener los productos" });
    }
});


app.listen(4000, () => {
    console.log('Servidor corriendo en http://localhost:4000');
});

