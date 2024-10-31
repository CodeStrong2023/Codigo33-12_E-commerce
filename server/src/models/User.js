const { DataTypes } = require('sequelize');
const { sequelize } = require('../database.js');

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userpassword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    edad:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userpassword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    useremail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Asegura que el email sea único
    },
},{
    freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = User;