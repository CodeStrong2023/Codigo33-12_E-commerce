import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

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
  url_imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true, // Corrigido: debe ser `true` en lugar de `null`
  },
  talle: {
    type: DataTypes.INTEGER,
    allowNull: true, // Corrigido: debe ser `true` en lugar de `null`
  },
});

export default Zapatilla;

