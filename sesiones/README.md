# Plan de sesiones

## Completadas

1. Sesión 1 - Base, frontend y entornos
2. Sesión 2 - ORM con Sequelize

## Pendientes

3. Sesión 3 - Autenticación (JWT + bcrypt)
   - Registro/login
   - Middleware de token
   - Primeras rutas protegidas
   - Roles básicos (admin/superadmin)

4. Sesión 4 - Seguridad aplicada
   - Autorización avanzada (ownership por recurso)
   - Validaciones con `express-validator`
   - Hardening: helmet/cors/rate-limit por entorno

5. Sesión 5 - Testing y calidad
   - Pruebas de controladores y middlewares
   - Casos de auth (login inválido, token expirado)
   - Estandarizar respuestas y manejo de errores

6. Sesión 6 - Docker + siguiente paso microservicios
   - Dockerfile + docker-compose
   - Variables por entorno en contenedor
   - Separación inicial por dominios (auth/services)
