# ==============================
# Stage 1: Build the application
# ==============================
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Copiar archivos raíz del monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copiar los package.json de los workspaces
COPY packages/api/package.json ./packages/api/
COPY packages/web/package.json ./packages/web/

# Copiar el esquema de Prisma antes de instalar dependencias
COPY packages/api/prisma ./packages/api/prisma

# Instalar dependencias (usando pnpm)
RUN pnpm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Generar Prisma Client
RUN pnpm --filter api exec prisma generate

# Compilar el proyecto TypeScript
RUN pnpm --filter api run build


# ==============================
# Stage 2: Crear la imagen de producción
# ==============================
FROM node:18-alpine AS runner

WORKDIR /usr/src/app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Copiar solo lo necesario desde el builder
COPY --from=builder /usr/src/app/packages/api/dist ./dist
COPY --from=builder /usr/src/app/packages/api/package.json ./package.json
COPY --from=builder /usr/src/app/packages/api/prisma ./prisma
COPY --from=builder /usr/src/app/packages/api/src/templates ./dist/templates
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./

# Instalar dependencias de producción
RUN pnpm install --prod --frozen-lockfile

EXPOSE 4000

CMD ["node", "dist/index.js"]
