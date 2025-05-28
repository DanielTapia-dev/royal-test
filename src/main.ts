import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ServiceAModule } from './service-a/service-a.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const redisHost = process.env.REDIS_HOST || 'localhost';
  const redisPort = Number(process.env.REDIS_PORT || '6379');
  const appPort = Number(process.env.PORT_A || '3000');

  const appA = await NestFactory.create(ServiceAModule);

  appA.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: redisHost,
      port: redisPort,
    },
  });

  await appA.startAllMicroservices();
  await appA.listen(appPort);
}
bootstrap();
