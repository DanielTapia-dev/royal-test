# Microservices: Double & Square

This project contains two services:

- **Service-A (NestJS)**: Exposes a REST endpoint `/double/:num`, sends the number via Redis, and receives the doubled result.
- **Service-B (Node.js)**: Listens to Redis messages, calculates the double, and exposes a REST endpoint `/square/:num` to return the square of a number.

---

## Enviroment variables

You can create .env file with this example ports

```bash
REDIS_HOST=localhost
REDIS_PORT=6379
PORT_A=3000
PORT_B=3001
```

## 📦 Install dependencies

### Service-A (NestJS)

```bash
cd service-a
npm install
```

### Service-B (Node.js)

```bash
cd service-b
npm install
```

---

## 🐳 Run Redis using Docker (recommended)

You need Redis running for inter-service communication. The easiest way is via Docker:

```bash
docker run --name redis-microservice -p 6379:6379 -d redis
```

> If you already have Redis installed locally, you can skip Docker.

---

## 🚀 Run the project

### 1. Start Service-B (Node.js)

```bash
cd service-b
npm start
```

This will start the REST endpoint at:  
`http://localhost:3001/square/:num`  
And the worker will listen on Redis for `double_number` events.

### 2. Start Service-A (NestJS)

```bash
cd service-a
npm run start:dev
```

This will expose the endpoint:  
`http://localhost:3000/double/:num`

---

## 🧪 Run Tests

### Service-A (NestJS)

```bash
cd service-a
npm run test
```

### Service-B (Node.js)

```bash
cd service-b
npm test
```

> Make sure Redis is running before running integration tests.
