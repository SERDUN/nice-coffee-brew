# Build stage
FROM node:20-slim as build

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

COPY ./src ./src
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]