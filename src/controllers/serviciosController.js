const Service = require('../models/Service');

// ✅
async function getServicios (req, res) {
  try {
    const servicios = await Service.findAll({ raw: true });

    res.json({
      error: false,
      mensaje: 'Servicios obtenidos exitosamente',
      total: servicios.length,
      datos: servicios
    });
  } catch (error) {
    res.status(500).json({ error: true, mensaje: 'Error al obtener los servicios' });
  }
}

// ✅
async function getServicioById (req, res) {
  try {
    const { id } = req.params;
    const servicio = await Service.findByPk(id, { raw: true });

    if (!servicio) {
      return res.status(404).json({ error: true, mensaje: 'Servicio no encontrado' });
    }

    res.json({ error: false, datos: servicio });


  } catch (error) {
    res.status(500).json({ error: true, mensaje: 'Error al obtener el servicio' });
  }

}

async function postservicio (req, res) {

  try {
    const { nombre, precio, descripcion } = req.body;
    const nombreLimpio = (nombre || '').trim();
    const precioNumero = Number(precio);

    if (!nombreLimpio || Number.isNaN(precioNumero)) {
      return res.status(400).json({ error: true, mensaje: 'Nombre y precio son obligatorios' });
    }

    const nuevoServicio = await Service.create({
      nombre: nombreLimpio,
      precio: precioNumero,
      descripcion,
      usuarioId: req.user?.id ?? null
    });

    // if (result.affectedRows === 0) {
    //   return res.status(404).json({ error: 'Servicio no encontrado' });
    // }

    // if (!nombre || !precio) {
    //   return res.status(400).json({ error: 'Faltan datos para crear el servicio' });
    // }

    res.status(201).json({
      error: false,
      mensaje: 'Servicio creado exitosamente',
      id: nuevoServicio.id
    });

  } catch (error) {
    res.status(500).json({ error: true, mensaje: 'Error al crear el servicio' });
  }

}

async function putServicio (req, res) {
  try {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;
    const nombreLimpio = (nombre || '').trim();
    const precioNumero = Number(precio);

    if (!nombreLimpio || Number.isNaN(precioNumero)) {
      return res.status(400).json({ error: true, mensaje: 'Nombre y precio son obligatorios' });
    }

    const [affectedRows] = await Service.update(
      { nombre: nombreLimpio, precio: precioNumero, descripcion },
      { where: { id } }
    );

    if (affectedRows === 0) {
      return res.status(404).json({ error: true, mensaje: 'Servicio no encontrado' });
    }

    return res.json({ error: false, mensaje: 'Servicio actualizado exitosamente', id });
  } catch (error) {
    return res.status(500).json({ error: true, mensaje: 'Error al actualizar el servicio' });
  }
}

async function deleteServicio (req, res) {
  try {
    const { id } = req.params;
    const affectedRows = await Service.destroy({ where: { id } });

    if (affectedRows === 0) {
      return res.status(404).json({ error: true, mensaje: 'Servicio no encontrado' });
    }

    res.json({ error: false, mensaje: 'Servicio eliminado exitosamente', id: id });
  } catch (error) {
    res.status(500).json({ error: true, mensaje: 'Error al eliminar el servicio' });
  }
}

module.exports = {
  getServicios,
  getServicioById,
  postservicio,
  putServicio,
  deleteServicio
}


