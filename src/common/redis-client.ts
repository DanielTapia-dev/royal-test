import Redis, { Redis as RedisInstance } from 'ioredis';

export function createRedisClient(): RedisInstance {
  const client = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    lazyConnect: true,
  });

  client.on('error', (err) => {
    console.error('Redis error:', err);
  });

  return client;
}
