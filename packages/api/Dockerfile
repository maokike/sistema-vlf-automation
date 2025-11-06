# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy root package.json and workspace configuration
COPY package*.json ./
COPY pnpm-workspace.yaml ./

# Copy all package.json files to reconstruct the workspace structure
COPY packages/api/package.json ./packages/api/
COPY packages/web/package.json ./packages/web/

# Copy the Prisma schema before installing dependencies
COPY packages/api/prisma ./packages/api/prisma

# Install dependencies using workspaces
# We copy all package.json files so npm can resolve the workspace correctly
RUN npm install --workspaces --omit=dev

# Copy the rest of the backend source code
COPY packages/api/ ./packages/api/

# Generate Prisma Client
RUN npx prisma generate --schema=./packages/api/prisma/schema.prisma

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

# Copy Prisma schema and templates
COPY --from=builder /usr/src/app/packages/api/prisma ./prisma
COPY --from=builder /usr/src/app/packages/api/src/templates ./dist/templates


EXPOSE 4000

CMD ["node", "dist/index.js"]
