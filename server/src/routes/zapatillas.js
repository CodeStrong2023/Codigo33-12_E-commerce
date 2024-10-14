const express = require('express');
const router = express.Router();
const Zapatilla = require('../models/Zapatilla');

// Ruta para obtener todas las zapatillas
router.get('/', async (req, res) => {
  try {
      const zapatillas = await Zapatilla.findAll();
      res.json(zapatillas);
  } catch (error) {
      console.error('Error al obtener las zapatillas:', error);
      res.status(500).json({ message: "Error al obtener las zapatillas" });
  }
});

module.exports = router;