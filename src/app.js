const express = require('express');
const path = require('node:path');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const serviciosRoutes = require('./routes/serviciosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const authRoutes = require('./routes/auth.routes');
const jsonMiddleware = require('./middlewares/jsonMiddleware');

function createApp () {
  const app = express();

  // app.disable('x-powered-by');
  // app.use(helmet());
  app.use(cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000"
    ]
  }));

  // const apiLimiter = rateLimit({
  //   windowMs: 15 * 60 * 1000,
  //   max: 100,
  //   standardHeaders: true,
  //   legacyHeaders: false
  // });

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            scriptSrc: ["'self'", "'unsafe-inline'"],
            scriptSrcAttr: ["'unsafe-inline'"]
          }
        }
      })
    );
    app.use(rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false
    }));
  }

  app.use(jsonMiddleware);
  // app.use('/api', apiLimiter);

  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
  });

  app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'registro.html'));
  });

  app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'));
  });

  app.get('/api/health', (req, res) => {
    res.json({ error: false, mensaje: 'API funcionando correctamente' });
  });

  app.use('/api/services', serviciosRoutes);
  app.use('/api/users', usuariosRoutes);
  app.use('/api/auth', authRoutes);

  return app;
}

module.exports = {
  createApp
}