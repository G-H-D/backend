const User = require('../models/User');

async function getUsuarios (req, res) {
  try {
    const usuarios = await User.findAll({ raw: true });
    res.json({
      error: false,
      mensaje: 'Usuarios obtenidos exitosamente',
      total: usuarios.length,
      datos: usuarios
    });
  } catch (error) {
    res.status(500).json({ error: true, mensaje: 'Error al obtener los usuarios' });
  }
}

async function getUsuarioById (req, res) {
  try {
    const { id } = req.params;
    const usuario = await User.findByPk(id, { raw: true });

    if (!usuario) {
      return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });
    }

    res.json({ error: false, datos: usuario });
  } catch (error) {
    res.status(500).json({ error: true, mensaje: 'Error al obtener el usuario' });
  }
}

async function postUsuario (req, res) {
  try {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ error: true, mensaje: 'Nombre y email son obligatorios' });
    }

    const nuevoUsuario = await User.create({ nombre, email });

    res.status(201).json({
      error: false,
      mensaje: 'Usuario creado exitosamente',
      id: nuevoUsuario.id
    });
  } catch (error) {
    res.status(500).json({ error: true, mensaje: 'Error al crear el usuario' });
  }
}

async function deleteUsuario (req, res) {
  try {
    const { id } = req.params;
    const affectedRows = await User.destroy({ where: { id } });

    if (affectedRows === 0) {
      return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });
    }

    res.json({ error: false, mensaje: 'Usuario eliminado exitosamente', id });
  } catch (error) {
    res.status(500).json({ error: true, mensaje: 'Error al eliminar el usuario' });
  }
}

async function patchPromoverAdmin (req, res) {
  try {
    const { id } = req.params;

    const usuario = await User.findByPk(id, { raw: true });
    if (!usuario) {
      return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });
    }

    if (usuario.rol === 'superadmin') {
      return res.status(400).json({ error: true, mensaje: 'No se puede modificar el rol de un superadmin' });
    }

    const [affectedRows] = await User.update({ rol: 'admin' }, { where: { id } });
    if (affectedRows === 0) {
      return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });
    }

    res.json({
      error: false,
      mensaje: 'Usuario promovido a admin exitosamente',
      id,
      rol: 'admin'
    });
  } catch (error) {
    res.status(500).json({ error: true, mensaje: 'Error al promover usuario' });
  }
}

module.exports = {
  getUsuarios,
  getUsuarioById,
  postUsuario,
  deleteUsuario,
  patchPromoverAdmin
};
