const express = require('express');
const { body, param } = require('express-validator');
const {
  getUsuarios,
  getUsuarioById,
  postUsuario,
  deleteUsuario,
  patchPromoverAdmin
} = require('../controllers/usuariosController');
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware');
const { handleValidationErrors } = require('../middlewares/validation.middleware');

const router = express.Router();

const usuarioValidation = [
  body('nombre').trim().isLength({ min: 3, max: 100 }).withMessage('Nombre debe tener entre 3 y 100 caracteres'),
  body('email').isEmail().withMessage('Email no válido'),
  handleValidationErrors
];

const usuarioIdValidation = [
  param('id').isInt({ min: 1 }).withMessage('ID de usuario inválido'),
  handleValidationErrors
];

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', verificarToken, verificarRol('admin', 'superadmin'), usuarioValidation, postUsuario);
router.patch('/:id/promover-admin', verificarToken, verificarRol('superadmin'), usuarioIdValidation, patchPromoverAdmin);
router.delete('/:id', verificarToken, verificarRol('admin', 'superadmin'), deleteUsuario);

module.exports = router;
