const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function generarToken (usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol
    },
    process.env.JWT_SECRET || 'dev_secret_change_me',
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
}

async function registro (req, res) {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: true, mensaje: 'Nombre, email y password son obligatorios' });
    }

    const existente = await User.findOne({ where: { email }, raw: true });
    if (existente) {
      return res.status(409).json({ error: true, mensaje: 'El email ya está registrado' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const nuevoUsuario = await User.create({
      nombre,
      email,
      password: passwordHash,
      rol: 'cliente',
      activo: true
    });
    const token = generarToken(nuevoUsuario);

    return res.status(201).json({
      error: false,
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      }
    });
  } catch (error) {
    return res.status(500).json({ error: true, mensaje: 'Error al registrar usuario' });
  }
}

async function login (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: true, mensaje: 'Email y password son obligatorios' });
    }

    const usuario = await User.findOne({ where: { email }, raw: true });
    if (!usuario || !usuario.password) {
      return res.status(401).json({ error: true, mensaje: 'Credenciales inválidas' });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ error: true, mensaje: 'Credenciales inválidas' });
    }

    const token = generarToken(usuario);

    return res.json({
      error: false,
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    return res.status(500).json({ error: true, mensaje: 'Error al iniciar sesión' });
  }
}

async function crearUsuario (req, res) {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: true, mensaje: 'Nombre, email y password son obligatorios' });
    }

    const existente = await User.findOne({ where: { email }, raw: true });
    if (existente) {
      return res.status(409).json({ error: true, mensaje: 'El email ya está registrado' });
    }

    const rolValido = ['cliente', 'admin', 'superadmin'].includes(rol) ? rol : 'cliente';
    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await User.create({
      nombre,
      email,
      password: passwordHash,
      rol: rolValido,
      activo: true
    });

    return res.status(201).json({
      error: false,
      mensaje: 'Usuario creado exitosamente',
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      }
    });
  } catch (error) {
    return res.status(500).json({ error: true, mensaje: 'Error al crear usuario' });
  }
}

module.exports = {
  registro,
  login,
  crearUsuario,
  generarToken
};
