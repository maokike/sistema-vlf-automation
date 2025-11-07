# Stage 1: Build the application
FROM node:18-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/api/package.json ./packages/api/
COPY packages/web/package.json ./packages/web/

# Tell Puppeteer to skip downloading Chrome. We'll install a system version instead.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install all dependencies for building
RUN pnpm install --frozen-lockfile

# Copy the entire source code
COPY . .

# Generate Prisma client
RUN pnpm --filter api exec prisma generate

# Build the TypeScript code
RUN pnpm --filter api run build


# Stage 2: Create the final, lightweight production image
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Install system-level dependencies for running Puppeteer headlessly
# This is much faster and smaller than downloading a full Chrome browser.
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    npm

WORKDIR /usr/src/app

# Copy workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/api/package.json ./packages/api/
COPY packages/web/package.json ./packages/web/

# Copy built code and necessary assets from the builder stage
COPY --from=builder /usr/src/app/packages/api/dist ./packages/api/dist
COPY --from=builder /usr/src/app/packages/api/prisma ./packages/api/prisma
COPY --from=builder /usr/src/app/packages/api/src/templates ./packages/api/src/templates

# Tell Puppeteer to skip downloading Chrome again for the production install
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install ONLY production dependencies
RUN pnpm install --prod --frozen-lockfile

ENV NODE_ENV=production

EXPOSE 4000

CMD ["pnpm", "--filter", "api", "start"]
