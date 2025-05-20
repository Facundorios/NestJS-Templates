<!-- # 🚀 NestJS Auth API — JWT + Roles & Permisos

Una API REST construida con [NestJS](https://nestjs.com/) que incluye:

- 🔒 **Autenticación** con JSON Web Tokens (JWT)
- 🛡️ **Sistema de Roles y Permisos**
- 🗄️ **PostgreSQL** + **TypeORM** con migraciones
- 📄 **Documentación Swagger**
- 🐳 Configuración lista con **Docker** y **Docker Compose**

---

## 📦 Tecnologías Utilizadas

- **NestJS** — Framework para Node.js
- **PostgreSQL** — Base de datos relacional
- **TypeORM** — ORM para manejar la base de datos
- **Passport + JWT** — Autenticación y manejo de sesiones
- **Swagger** — Documentación interactiva de la API
- **Docker + Docker Compose** — Contenedores para despliegue y desarrollo

---

## 📂 Estructura del Proyecto

```plaintext
src/
├── auth/         # Módulo de autenticación
├── users/        # Gestión de usuarios
├── roles/        # Gestión de roles
├── permissions/  # Gestión de permisos
├── config/       # Configuraciones (TypeORM, env, etc.)
├── migrations/   # Migraciones de base de datos
└── main.ts       # Punto de entrada de la aplicación
```

---

## ⚙️ Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Configuración de la base de datos
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=nest_auth

# Configuración de JWT
JWT_SECRET=supersecret
JWT_EXPIRES_IN=3600s
```

### 2. Instalación de Dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```

### 3. Configuración con Docker

Si tienes Docker instalado, puedes levantar la base de datos y la aplicación con:

```bash
docker-compose up -d
```

Esto levantará los servicios definidos en el archivo `docker-compose.yml`.

---

## 🚀 Uso de la API

### 1. Iniciar el Servidor

Para iniciar el servidor en modo desarrollo:

```bash
npm run start:dev
```

### 2. Acceso a Swagger

Una vez que el servidor esté en ejecución, puedes acceder a la documentación interactiva de la API en:

```
http://localhost:3000/api
``` -->