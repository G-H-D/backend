function saludar (req, res) {
  res.json({ mensaje: '¡Hola desde el controlador!' });
}

module.exports = {
  saludar
};