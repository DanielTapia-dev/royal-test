# NestJS Microservices with Redis - `service-a` and `service-b`

This project is a simple example of a NestJS monorepo application with two services (`service-a` and `service-b`) communicating through Redis as a message broker.

## 📦 Structure

```
src/
├── service-a/         # Exposes /double/:num endpoint and sends message via Redis
│   ├── service-a.controller.ts
│   ├── service-a.service.ts
│
├── service-b/         # Listens to 'double_number' message and exposes /square/:num
│   ├── service-b.controller.ts
│   ├── service-b.service.ts
│
├── main.ts            # Boots both services with Redis integration
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://your-repo-url.git
cd your-repo-folder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start Redis (via Docker)

```bash
docker run --name redis-nest -p 6379:6379 -d redis
```

### 4. Run the NestJS app

```bash
npm run start:dev
```

This launches:

- `service-a` on [http://localhost:3000](http://localhost:3000)
- `service-b` on [http://localhost:3001](http://localhost:3001)

---

## 📡 API Usage

### ➤ `GET /double/:num`

- URL: `http://localhost:3000/double/5`
- Description: Sends the number to `service-b` via Redis and returns its double.
- Response:

```json
{ "result": 10 }
```

### ➤ `GET /square/:num`

- URL: `http://localhost:3001/square/4`
- Description: Returns the square of the number.
- Response:

```json
{ "result": 16 }
```

---
