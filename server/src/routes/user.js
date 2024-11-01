import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Ruta para obtener todas las zapatillas
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: "Error al obtener las zapatillas" });
  }
});

export default router;
