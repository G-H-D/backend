require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
const { createApp } = require('./src/app');
const { conectarDB } = require('./src/config/db');


const app = createApp();

const PORT = process.env.PORT || 3000;


async function iniciarServidor () {
  await conectarDB();

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);

  });
}

iniciarServidor();


