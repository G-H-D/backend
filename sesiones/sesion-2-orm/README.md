# Sesión 2 - ORM con Sequelize

## Objetivo
Migrar de consultas SQL directas (`mysql2`) a modelos ORM con Sequelize, manteniendo endpoints existentes.

## Implementado

- Configuración de Sequelize en `src/config/db.js`.
- Autenticación de conexión con `sequelize.authenticate()`.
- Sincronización de esquema con `sequelize.sync({ alter: true })`.
- Modelos ORM:
  - `src/models/User.js`
  - `src/models/Service.js`
  - `src/models/index.js` (asociaciones)
- Adaptación de capa de acceso:
  - `src/models/usuariosModel.js`
  - `src/models/serviciosModel.js`

## Columnas contempladas en modelo

### usuarios
- `id`
- `nombre`
- `email` (único)
- `password`
- `rol` (`superadmin`, `admin`, `cliente`)
- `activo`
- `createdAt`
- `updatedAt`

### servicios
- `id`
- `nombre`
- `descripcion`
- `precio`
- `usuarioId`
- `createdAt`
- `updatedAt`

## Nota didáctica
En sesión 2 se deja la estructura de datos y ORM. En sesión 3 se implementa la lógica de auth (bcrypt/JWT/roles) aprovechando estas columnas.
