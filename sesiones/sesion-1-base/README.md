# Sesión 1 - Base del proyecto + Frontend + Entornos

## Objetivo
Dejar una base estable del backend conectada con la carpeta `public` y preparar configuración para múltiples entornos.

## Qué se implementó

- API base modular con Express:
  - `GET /api/health`
  - `GET/POST/DELETE /api/services`
  - `GET /api/services/publicos`
  - `GET/POST/DELETE /api/users`
- Conexión a base de datos desacoplada en `src/config/db.js`.
- Carga de variables de entorno desde `server.js` con `dotenv` según `NODE_ENV`.
- Frontend estático servido por Express:
  - `/`
  - `/login`
  - `/registro`
  - `/dashboard`

## Archivos de entorno

- `.env.example`
- `.env.development`
- `.env.test`
- `.env.production`
- `.env.docker`

## Variables mínimas

- `NODE_ENV`
- `PORT`
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET`, `JWT_EXPIRES_IN`
- `CORS_ORIGIN`
- `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS`

## Scripts

- `npm run dev`
- `npm start`
- `npm run dev:test`
- `npm run dev:docker`
- `npm run start:prod`

> Nota: estos scripts usan `cross-env` para establecer `NODE_ENV` de forma compatible en Windows, macOS y Linux.

## Nota didáctica
En sesión 1 se deja la base y la conexión frontend/API. La autenticación y seguridad completa se implementan en sesiones siguientes.
