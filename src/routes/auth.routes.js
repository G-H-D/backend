const express = require('express');
const { body } = require('express-validator');
const { registro, login, crearUsuario } = require('../controllers/auth.controller');
const { verificarToken, soloSuperadmin } = require('../middlewares/auth.middleware');
const { handleValidationErrors } = require('../middlewares/validation.middleware');

const router = express.Router();

const registroValidation = [
  body('nombre').trim().isLength({ min: 2, max: 80 }).withMessage('Nombre debe tener entre 2 y 80 caracteres'),
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password debe tener al menos 6 caracteres'),
  handleValidationErrors
];

const loginValidation = [
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').notEmpty().withMessage('Password es obligatorio'),
  handleValidationErrors
];

const crearUsuarioValidation = [
  body('nombre').trim().isLength({ min: 2, max: 80 }).withMessage('Nombre debe tener entre 2 y 80 caracteres'),
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password debe tener al menos 6 caracteres'),
  body('rol').optional().isIn(['cliente', 'admin', 'superadmin']).withMessage('Rol inválido'),
  handleValidationErrors
];

router.post('/registro', registroValidation, registro);
router.post('/login', loginValidation, login);
router.post('/crear-usuario', verificarToken, soloSuperadmin, crearUsuarioValidation, crearUsuario);

module.exports = router;
