import 'dotenv/config';
import { Sequelize } from 'sequelize';

console.log('dotenv loaded:', !!process.env.DB_USER);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

export { sequelize, connectDb };

