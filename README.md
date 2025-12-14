# nestjs-hexagonal-architecture-crud

## Descripción

El proyecto se base en un crud con el framework nestjs aplicando la arquitectura hexagonal. <br>
Este proyecto estará usando docker y será compatible con 3 bases de datos "Mysql", "Postgresql" o "Sqlserver"

```bash
# Recomendación: Utilizar Node v22.20.0 o mayor y pnpm v9.14
```

## Iniciar proyecto

Se debe tener el archivo .env para que pueda funcionar el proyecto. A continuación se mostrará las variables necesaria para poder correr el proyecto

```
PORT=8000 # Puerto donde está disponible el proyecto
NODE_ENV=development
CORS_ORIGIN= # Las url que está aceptando el proyecto eje: http://localhost:4200

# DATABASE OPTIONS
DB_TYPE= # La base de datos que desea usar, las opciones a elegir son: mysql, postgresql o sqlserver
DB_HOST= # La ruta donde se encuentra la base de datos o IP. Si usa docker recomendado usar IP
DB_NAME= # Nombre de la base de datos
DB_USERNAME= # Usuario del servidor de base de datos
DB_PASSWORD= # Contraseña del usuario
DB_PORT= # Puerto donde se encuentra disponible
```

Actualmente el proyecto se puedo iniciar de dos formas, sin docker o con docker.

### Iniciar proyecto sin docker

A continuación los comandos para que pueda correr el proyecto

```bash
# Instalar los paquetes
$ pnpm install
```

```bash
# Crear la carpeta generated para las bases de datos
$ npx prisma generate --schema=prisma/mysql/schema.prisma
$ npx prisma generate --schema=prisma/postgresql/schema.prisma
$ npx prisma generate --schema=prisma/sqlserver/schema.prisma
```

```bash
# Correr la migración
$ npx prisma migrate deploy
```

```bash
# Correr proyecto
$ pnpm run start:dev
```

## Iniciar proyecto con docker

A continuación los comandos para que pueda correr el proyecto

```bash
# Al correr este comando ya se encuentra configurado todo lo anterior
$ docker compose up --build
```

## Estructura del proyecto

```
.
├── 📂 prisma/
|   ├── 📂 mysql/
|   |   ├── 📂 migrations/
|   |   └── 📄 schema.prisma
|   ├── 📂 postgresql/
|   |   ├── 📂 migrations/
|   |   └── 📄 schema.prisma
|   └── 📂 sqlserver/
|       ├── 📂 migrations/
|       └── 📄 schema.prisma
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 http/
|   |   |   ├── 📂 dto/
|   |   |   ├── 📂 filters/
|   |   |   ├── 📂 interceptors/
|   |   |   ├── 📂 routes/
|   |   |   └── 📄 http.module.ts
│   │   └── 📄 app.module.ts
│   ├── 📂 contexts/
│   │   ├── 📂 users/
│   │   |   ├── 📂 application/
│   │   |   │   ├── 📂 commands/
|   |   |   |   |   ├── 📂 user-create/
|   |   |   |   |   ├── 📂 user-delete/
|   |   |   |   |   └── 📂 user-update/
│   │   |   │   ├── 📂 queries/
|   |   |   |   |   ├── 📂 exist-by-email/
|   |   |   |   |   ├── 📂 find-all/
|   |   |   |   |   └── 📂 find-one-by-id/
│   │   |   │   └── 📄 index.ts
│   │   |   ├── 📂 domain/
│   │   |   │   ├── 📂 exceptions/
│   │   |   │   ├── 📂 projections/
│   │   |   │   ├── 📂 repositories/
│   │   |   │   ├── 📂 service/
│   │   |   │   ├── 📂 vo/
│   │   |   │   ├── 📄 user.interface.ts
│   │   |   │   └── 📄 user.ts
│   │   |   ├── infrastructure/
│   │   |   │   ├── 📂 controllers/
|   |   |   |   |   ├── 📂 user-create/
|   |   |   |   |   ├── 📂 user-delete/
|   |   |   |   |   ├── 📂 user-exist-by-email/
|   |   |   |   |   ├── 📂 user-find-all/
|   |   |   |   |   ├── 📂 user-find-one-by-id/
|   |   |   |   |   ├── 📂 user-update/
|   |   |   |   |   └── 📄 index.ts
│   │   |   │   ├── 📂 decorators/
│   │   |   │   └── 📂 persistences/
|   |   |   |       ├── 📂 mysql/
|   |   |   |       ├── 📂 postgresql/
|   |   |   |       ├── 📂 sqlserver
|   |   |   |       └── 📄 index.ts
│   │   |   └── 📄 users.module.ts
│   │   └── 📄 contexts.module.ts
│   ├── 📂 shared/
│   │   ├── 📂 bcrypt/
|   |   |   ├── 📂 domain/
|   |   |   ├── 📂 infrastructure/
|   |   |   |   └── 📂 persistences/
|   |   |   └── 📄 database.module.ts
│   │   ├── 📂 database/
|   |   |   ├── 📂 domain/
|   |   |   ├── 📂 infrastructure/
|   |   |   |   ├── 📂 persistences/
|   |   |   |   └── 📂 utils/
|   |   |   └── 📄 database.module.ts
│   │   ├── 📂 env/
|   |   |   ├── 📂 domain/
|   |   |   ├── 📂 infrastructure/
|   |   |   |   ├── 📂 persistences/
|   |   |   |   └── 📂 schemas/
|   |   |   └── 📄 env.module.ts
│   │   ├── 📂 system/
|   |   |   └── 📂 domain/
|   |   |       ├── 📂 constants/
|   |   |       ├── 📂 exceptions
|   |   |       ├── 📂 vo/
|   |   |       └── 📄 system.interface.ts
│   │   └── 📂 uuid/
|   |       ├── 📂 domain/
|   |       ├── 📂 infrastructure/
|   |       |   ├── 📂 constants/
|   |       |   └── 📂 persistences/
|   |       └── 📄 uuid.module.ts
│   ├── 📄 main.ts
│   └── 📄 prestart.ts
```
