require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

const bcrypt = require('bcryptjs');
const { sequelize } = require('../src/config/db');
require('../src/models');
const User = require('../src/models/User');

async function seedSuperadmin () {
  const nombre = process.env.SUPERADMIN_NOMBRE || 'Super Admin';
  const email = process.env.SUPERADMIN_EMAIL || 'superadmin@demo.com';
  const passwordPlano = process.env.SUPERADMIN_PASSWORD || 'Admin1234';

  try {
    await sequelize.authenticate();

    const passwordHash = await bcrypt.hash(passwordPlano, 10);
    const existente = await User.findOne({ where: { email } });

    if (existente) {
      await existente.update({
        nombre,
        password: passwordHash,
        rol: 'superadmin',
        activo: true
      });

      console.log(`Superadmin actualizado: ${email}`);
    } else {
      await User.create({
        nombre,
        email,
        password: passwordHash,
        rol: 'superadmin',
        activo: true
      });

      console.log(`Superadmin creado: ${email}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error al ejecutar semilla de superadmin:', error.message);
    process.exit(1);
  }
}

seedSuperadmin();
