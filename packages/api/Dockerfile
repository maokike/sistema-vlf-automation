# -------------------------
# Stage 1: builder
# -------------------------
FROM node:18-bullseye-slim AS builder

ENV DEBIAN_FRONTEND=noninteractive
# evitar que puppeteer descargue su Chromium en install
ENV PUPPETEER_SKIP_DOWNLOAD=true
# forzar prisma a usar binario en producción/build
ENV PRISMA_CLIENT_ENGINE_TYPE=binary

WORKDIR /usr/src/app

# instalar herramientas del sistema necesarias para algunas dependencias nativas (prisma, sharp, bcrypt, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    build-essential \
    python3 \
    git \
    openssl \
    libssl-dev \
    wget \
  && rm -rf /var/lib/apt/lists/*

# instalar pnpm
RUN npm install -g pnpm

# copiar archivos raíz del monorepo y package.json de workspaces
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/api/package.json ./packages/api/
COPY packages/web/package.json ./packages/web/

# instalar dependencias (usa el lockfile)
RUN pnpm install --frozen-lockfile

# copiar todo el código
COPY . .

# generar prisma client (ruta explícita al schema del workspace api)
RUN pnpm --filter api exec prisma generate --schema=packages/api/prisma/schema.prisma

# compilar TypeScript sólo para API
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

# instalar runtime libs necesarias (incluye chromium)
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

# instalar pnpm (para instalar dependencias de producción)
RUN npm install -g pnpm

# copiar package.json + lockfile (necesario para pnpm instalar)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/api/package.json ./packages/api/
COPY packages/web/package.json ./packages/web/

# copiar build y artefactos generados por builder
COPY --from=builder /usr/src/app/packages/api/dist ./packages/api/dist
COPY --from=builder /usr/src/app/packages/api/prisma ./packages/api/prisma
COPY --from=builder /usr/src/app/node_modules ./node_modules
# (si necesitas templates u otros assets)
COPY --from=builder /usr/src/app/packages/api/src/templates ./packages/api/src/templates

# Instalar solo production deps (si ya trajimos node_modules desde builder, normalmente no hace falta
# pero lo dejamos para asegurar coherencia si no se copió todo)
RUN pnpm install --prod --frozen-lockfile

EXPOSE 4000

# Start: ejecuta migrations (deploy) apuntando al schema del workspace y luego arranca la app
CMD ["sh", "-lc", "pnpm --filter api exec prisma migrate deploy --schema=packages/api/prisma/schema.prisma && node packages/api/dist/index.js"]
