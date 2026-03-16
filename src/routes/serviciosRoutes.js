const express = require('express');
const { body } = require('express-validator');
const { getServicios, getServicioById, postservicio, putServicio, deleteServicio } = require('../controllers/serviciosController');
const { verificarToken, verificarRol, verificarPropietarioServicio } = require('../middlewares/auth.middleware');
const { handleValidationErrors } = require('../middlewares/validation.middleware');

const router = express.Router();

const servicioValidation = [
  body('nombre').trim().isLength({ min: 3, max: 100 }).withMessage('Nombre debe tener entre 3 y 100 caracteres'),
  body('precio').isInt({ min: 0 }).withMessage('Precio debe ser un número mayor o igual a 0'),
  body('descripcion').optional({ nullable: true }).isLength({ max: 1000 }).withMessage('Descripción demasiado larga'),
  handleValidationErrors
];

router.get('/publicos', getServicios);
router.get('/', getServicios);
router.get('/:id', getServicioById);
router.post('/', verificarToken, verificarRol('admin', 'superadmin'), servicioValidation, postservicio);
router.put('/:id', verificarToken, verificarRol('admin', 'superadmin'), verificarPropietarioServicio, servicioValidation, putServicio);
router.delete('/:id', verificarToken, verificarRol('admin', 'superadmin'), verificarPropietarioServicio, deleteServicio);



module.exports = router;