# Sesión 3 - Autenticación con JWT

## Objetivo
Implementar autenticación base para el API usando hash de contraseña y token JWT.

## Implementado

- Dependencias:
  - `bcryptjs`
  - `jsonwebtoken`
- Nuevos endpoints:
  - `POST /api/auth/registro`
  - `POST /api/auth/login`
- Middleware JWT:
  - `verificarToken` en `src/middlewares/auth.middleware.js`
- Roles básicos:
  - `verificarRol('admin', 'superadmin')` para rutas de administración
- Protección de rutas de escritura en servicios:
  - `POST /api/services`
  - `DELETE /api/services/:id` (solo admin/superadmin)
- Rutas de usuarios protegidas:
  - `GET /api/users`
  - `GET /api/users/:id`
  - `POST /api/users`
  - `PATCH /api/users/:id/promover-admin` (solo superadmin)
  - `DELETE /api/users/:id`

## Semilla superadmin

Variables sugeridas en `.env.development`:

- `SUPERADMIN_NOMBRE`
- `SUPERADMIN_EMAIL`
- `SUPERADMIN_PASSWORD`

Ejecutar:

- `npm run seed:superadmin`

La semilla es idempotente: si el email ya existe, lo actualiza a rol `superadmin`.

## Flujo de prueba rápido

1. Registrar usuario:
  - `POST /api/auth/registro`
  - Body: `{ "nombre": "Ana", "email": "ana@mail.com", "password": "123456" }`
2. Login:
   - `POST /api/auth/login`
   - Body: `{ "email": "ana@mail.com", "password": "123456" }`
3. Consumir ruta protegida:
   - Header: `Authorization: Bearer <token>`
   - `POST /api/services`
4. Promover usuario a admin (requiere token de superadmin):
  - `PATCH /api/users/:id/promover-admin`

## Nota didáctica
En esta sesión se implementa autenticación base (identity + token) y autorización por roles básica, en continuidad directa con sesión 2. Autorización avanzada (ownership), refresh token y revocación se profundizan en sesión 4.
