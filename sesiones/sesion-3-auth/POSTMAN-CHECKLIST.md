# Checklist rápido (Postman) - Sesión 3

Base URL: `http://localhost:3000`

## 1) Registrar usuario cliente

- Método: `POST`
- URL: `/api/auth/registro`
- Body (JSON):

```json
{
  "nombre": "Ana Cliente",
  "email": "ana.cliente@mail.com",
  "password": "123456"
}
```

Esperado:
- `201`
- Respuesta con `token` y `usuario.rol = cliente`

## 2) Login de superadmin

- Método: `POST`
- URL: `/api/auth/login`
- Body (JSON):

```json
{
  "email": "TU_SUPERADMIN@mail.com",
  "password": "TU_PASSWORD"
}
```

Esperado:
- `200`
- Guardar `token` como variable de Postman: `token_superadmin`

## 3) Promover usuario a admin (solo superadmin)

- Método: `PATCH`
- URL: `/api/users/:id/promover-admin`
- Header:
  - `Authorization: Bearer {{token_superadmin}}`

Esperado:
- `200`
- `mensaje = Usuario promovido a admin exitosamente`
- `rol = admin`

## 4) Validar acceso admin a usuarios

Primero: login del usuario promovido.

- Método: `POST`
- URL: `/api/auth/login`
- Body (JSON):

```json
{
  "email": "ana.cliente@mail.com",
  "password": "123456"
}
```

Guardar token como `token_admin`.

Luego:
- Método: `GET`
- URL: `/api/users`
- Header:
  - `Authorization: Bearer {{token_admin}}`

Esperado:
- `200`
- Lista de usuarios.

---

## Pruebas negativas rápidas

- `GET /api/users` sin token → `401`
- `PATCH /api/users/:id/promover-admin` con token de `admin` (no superadmin) → `403`
- `POST /api/auth/login` con password incorrecto → `401`
