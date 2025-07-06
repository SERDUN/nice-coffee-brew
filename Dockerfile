# Build stage
FROM node:20-slim as build

WORKDIR /usr/src/app

# Встановлюємо залежності для білду
COPY package*.json ./
COPY tsconfig.json ./
COPY build.mjs ./
RUN npm ci

COPY ./src ./src

RUN node build.mjs

# Production stage
FROM node:20-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.mjs"]