const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || process.env.PASSWORD || '',
  database: process.env.DB_NAME || 'railway',
  logging: false,
  // define: {
  //   timestamps: false
  // }
});

async function conectarDB () {
  try {
    await sequelize.authenticate();
    require('../models');
    await sequelize.sync();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
}

module.exports = {
  conectarDB,
  sequelize
}