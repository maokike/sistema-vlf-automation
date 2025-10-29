# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Set up workspaces
COPY package*.json ./
COPY packages/web/package.json ./packages/web/

RUN npm install --workspaces --production=false

# Copy the rest of the web source code
COPY packages/web/ ./packages/web/

# Build the Next.js application
RUN npm run build --workspace=web


# Stage 2: Create the production image
FROM node:18-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy production dependencies from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/packages/web/package.json ./package.json

# Copy the built Next.js application
COPY --from=builder /usr/src/app/packages/web/.next ./.next
COPY --from=builder /usr/src/app/packages/web/public ./public


EXPOSE 3000

CMD ["npm", "start", "--workspace=web"]
