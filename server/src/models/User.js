import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userpassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  useremail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegura que el email sea único
  },
}, {
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

export default User;
