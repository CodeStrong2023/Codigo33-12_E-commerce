const { DataTypes } = require('sequelize');
const { sequelize } = require('../database.js');

const Zapatilla = sequelize.define('zapatilla', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Zapatilla;
