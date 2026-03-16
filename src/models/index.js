const User = require('./User');
const Service = require('./Service');

User.hasMany(Service, {
  foreignKey: 'usuarioId',
  as: 'servicios'
});

Service.belongsTo(User, {
  foreignKey: 'usuarioId',
  as: 'usuario'
});

module.exports = {
  User,
  Service
};