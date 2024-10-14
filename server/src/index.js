const express = require('express'); // Asegúrate de que esta línea esté presente solo una vez
const cors = require('cors'); // Asegúrate de que esta línea también esté presente una vez
const Zapatilla = require('./models/Zapatilla'); 
const zapatillasRoutes = require('./routes/zapatillas');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/zapatillas', async (req, res) => {
    try {
        const zapatillas = await Zapatilla.findAll();
        res.json(zapatillas);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ message: "Error al obtener los productos" });
    }
});


app.listen(4000, () => {
    console.log('Servidor corriendo en http://localhost:4000');
});

