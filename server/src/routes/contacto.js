import express from 'express';
import Contacto from '../models/Contacto.js'; // Asegúrate de importar el modelo

const router = express.Router();

// Ruta para guardar los datos
router.post('/', async (req, res) => {
  const { nombre, apellido, email, telefono, mensaje } = req.body;

  // Validación de longitud del mensaje
  if (mensaje.length > 500) {
    return res.status(400).json({ message: 'El mensaje no puede exceder los 500 caracteres.' });
  }

  try {
    const contacto = await Contacto.create({ nombre, apellido, email, telefono, mensaje });
    res.status(200).json({ message: 'Se envio correctamente el mensaje', contacto });
  } catch (err) {
    res.status(500).json({ message: 'Error al guardar el mensaje', error: err.message });
  }
});

export default router;




