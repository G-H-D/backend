const jwt = require('jsonwebtoken');
const Service = require('../models/Service');

function verificarToken (req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: true, mensaje: 'Token no proporcionado' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_change_me');
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: true, mensaje: 'Token inválido o expirado' });
  }
}

function verificarRol (...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({ error: true, mensaje: 'No tienes permisos para esta acción' });
    }

    next();
  };
}

const soloSuperadmin = verificarRol('superadmin');
const adminOSuperadmin = verificarRol('admin', 'superadmin');

async function verificarPropietarioServicio (req, res, next) {
  try {
    const { id } = req.params;
    const servicio = await Service.findByPk(id, { raw: true });

    if (!servicio) {
      return res.status(404).json({ error: true, mensaje: 'Servicio no encontrado' });
    }

    if (req.user?.rol === 'superadmin') {
      req.servicio = servicio;
      return next();
    }

    if (req.user?.rol === 'admin' && servicio.usuarioId === req.user.id) {
      req.servicio = servicio;
      return next();
    }

    return res.status(403).json({ error: true, mensaje: 'No tienes permisos sobre este servicio' });
  } catch (error) {
    return res.status(500).json({ error: true, mensaje: 'Error al validar permisos del servicio' });
  }
}

module.exports = {
  verificarToken,
  verificarRol,
  soloSuperadmin,
  adminOSuperadmin,
  verificarPropietarioServicio
};
