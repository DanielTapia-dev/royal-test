import Redis, { Redis as RedisInstance } from 'ioredis';

export function createRedisClient(): RedisInstance {
  const client = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    lazyConnect: true,
  });

  client.on('error', (err) => {
    console.error('Redis error:', err);
  });

  return client;
}
