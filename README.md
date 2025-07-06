# nice-coffee-brew

**Coffee Brew Log API — production‑ready minimum**

---

## Project Description

A minimal, production-ready REST API for tracking your coffee brewing journey.

This service allows you to log each coffee preparation, capturing details about every cup or recipe you try. Designed as
a personal brew diary, it helps you record, analyze, and revisit your favorite coffee experiences.

## Quick Start

1. Install dependencies:
   npm install

2. Run in development mode:
   npm run dev

3. Build the project:
   npm run build

4. Start in production mode:
   npm start

---

## Running with Docker

Build and run the API using Docker:

```sh
docker build -t brew-api . && docker run --rm -p 3000:3000 brew-api
```

## API

### Get all brews

```http
GET http://localhost:3000/api/brews
Accept: application/json
```

### Get brew by ID

```http
GET http://localhost:3000/api/brews/{brewId}
Accept: application/json
```

### Create brew

```http
POST http://localhost:3000/api/brews
Content-Type: application/json

{
  "beans": "Ethiopia",
  "method": "v60",
  "brewedAt": "2024-07-06T10:23:00.000Z",
  "time": 180,
  "rating": 4,
  "notes": "Floral aroma"
}
```

### Update brew

```http
PATCH http://localhost:3000/api/brews/{brewId}
Content-Type: application/json

{
  "beans": "Colombia",
  "method": "espresso",
  "brewedAt": "2024-07-06T12:30:00.000Z",
  "time": 30,
  "rating": 5,
  "notes": "Strong body"
}
```

### Delete brew

```http
DELETE http://localhost:3000/api/brews/{brewId}
```

## Scripts

- npm run dev — starts the server in development mode (hot-reload with nodemon + ts-node)
- npm run build — compiles TypeScript using esbuild
- npm start — runs the production server from the compiled dist/ folder
