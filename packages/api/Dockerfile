# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy root package.json and workspace configuration
COPY package*.json ./
COPY packages/api/package.json ./packages/api/

# Install dependencies using workspaces
RUN npm install --workspaces --production=false

# Copy Prisma schema FIRST
COPY packages/api/prisma ./prisma

# Generate Prisma Client (CORRECT SYNTAX)
RUN npx prisma generate --schema=./prisma/schema.prisma

# Copy the rest of the backend source code
COPY packages/api/ ./packages/api/

# Build the TypeScript code
RUN npm run build --workspace=api

# Stage 2: Create the production image
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy production dependencies from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/packages/api/package.json ./package.json

# Copy the built application code
COPY --from=builder /usr/src/app/packages/api/dist ./dist

# Copy Prisma schema and client
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/packages/api/src/templates ./dist/templates

EXPOSE 4000

CMD ["node", "dist/index.js"]
