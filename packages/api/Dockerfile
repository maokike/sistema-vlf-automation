# -------------------------
# Stage 1: builder
# -------------------------
FROM node:18-bullseye-slim AS builder

ENV DEBIAN_FRONTEND=noninteractive
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PRISMA_CLIENT_ENGINE_TYPE=binary

WORKDIR /usr/src/app

# Instalar herramientas del sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    build-essential \
    python3 \
    git \
    openssl \
    libssl-dev \
    wget \
  && rm -rf /var/lib/apt/lists/*

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos principales del monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/api/package.json ./packages/api/
COPY packages/web/package.json ./packages/web/

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar solo el código necesario del API (evita sobreescribir prisma)
COPY packages/api ./packages/api

# Asegurar que Prisma tenga acceso al schema
COPY packages/api/prisma ./packages/api/prisma

# Verificar que el schema exista (debug)
 RUN echo "PWD:" && pwd && \
    echo "--- LISTING /usr/src/app ---" && ls -la && \
    echo "--- LISTING packages ---" && ls -la packages || true && \
    echo "--- LISTING packages/api ---" && ls -la packages/api || true && \
    echo "--- LISTING packages/api/prisma ---" && ls -la packages/api/prisma || true && \
    echo "--- PRINTING schema.prisma ---" && cat packages/api/prisma/schema.prisma || true


# Generar Prisma Client
RUN pnpm --filter api exec npx prisma generate --schema=prisma/schema.prisma


# Compilar el proyecto API
RUN pnpm --filter api run build

# -------------------------
# Stage 2: runtime
# -------------------------
FROM node:18-bullseye-slim AS runner

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PRISMA_CLIENT_ENGINE_TYPE=binary

WORKDIR /usr/src/app

# Instalar dependencias de ejecución
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    chromium \
    fonts-liberation \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxss1 \
    libasound2 \
    libgbm-dev \
    libgtk-3-0 \
    openssl \
  && rm -rf /var/lib/apt/lists/*

# Instalar pnpm
RUN npm install -g pnpm

# 🟢 Instalar Prisma CLI (corrección para entorno Render)
RUN npm install -g prisma

# Copiar package.json + lockfile
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/api/package.json ./packages/api/
COPY packages/web/package.json ./packages/web/

# Copiar build y artefactos del builder
COPY --from=builder /usr/src/app/packages/api/dist ./packages/api/dist
COPY --from=builder /usr/src/app/packages/api/prisma ./packages/api/prisma
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/packages/api/src/templates ./packages/api/src/templates

# Instalar dependencias de producción
RUN pnpm install --frozen-lockfile

EXPOSE 4000

# Ejecutar migraciones y arrancar API
CMD ["sh", "-lc", "npx prisma migrate deploy --schema=./packages/api/prisma/schema.prisma && node packages/api/dist/index.js"]