import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../database.js'; // Asegúrate de importar la conexión

const Contacto = sequelize.define('Contacto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mensaje: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
}, {
  tableName: 'contactos', // Nombre de la tabla
});

// Sincronizar el modelo con la base de datos
await sequelize.sync();

export default Contacto;
