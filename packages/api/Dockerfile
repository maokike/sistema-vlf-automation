# Stage 1: Build the application
# This stage installs all dependencies (dev and prod) and builds the TypeScript code.
FROM node:18-alpine AS builder

# Install pnpm globally inside the container
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy workspace configuration files first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy the package.json files for all workspaces
COPY packages/api/package.json ./packages/api/
COPY packages/web/package.json ./packages/web/

# Install ALL dependencies. We need devDependencies for `tsc` to work.
RUN pnpm install --frozen-lockfile

# Copy the entire source code
COPY . .

# Generate the Prisma client based on the schema
RUN pnpm --filter api exec prisma generate

# Build the TypeScript code for the API
RUN pnpm --filter api run build


# Stage 2: Create the final, lightweight production image
# This stage only installs production dependencies and copies the built code.
FROM node:18-alpine

# Install pnpm globally inside the container
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy only the files necessary for a production installation
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/api/package.json ./packages/api/
COPY packages/web/package.json ./packages/web/

# Copy the built code and the prisma schema from the builder stage
COPY --from=builder /usr/src/app/packages/api/dist ./packages/api/dist
COPY --from=builder /usr/src/app/packages/api/prisma ./packages/api/prisma
COPY --from=builder /usr/src/app/packages/api/src/templates ./packages/api/src/templates


# Install ONLY production dependencies to keep the image small
RUN pnpm install --prod --frozen-lockfile

ENV NODE_ENV=production

EXPOSE 4000

# Start the application using the 'start' script defined in api's package.json
CMD ["pnpm", "--filter", "api", "start"]
