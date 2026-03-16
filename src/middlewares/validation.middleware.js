const { validationResult } = require('express-validator');

function handleValidationErrors (req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    error: true,
    mensaje: 'Datos de entrada inválidos',
    detalles: errors.array().map((error) => ({
      campo: error.path,
      mensaje: error.msg
    }))
  });
}

module.exports = {
  handleValidationErrors
};
