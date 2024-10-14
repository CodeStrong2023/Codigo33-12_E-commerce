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
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  url_imagen:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock:{
    type: DataTypes.INTEGER,
    allowNull: null,
  },
  talle:{
    type: DataTypes.INTEGER,
    allowNull: null,
  },
});

module.exports = Zapatilla;
