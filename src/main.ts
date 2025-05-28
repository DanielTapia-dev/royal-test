import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ServiceAModule } from './service-a/service-a.module';

async function bootstrap() {
  const appPort = Number(process.env.PORT_A || '3000');
  const app = await NestFactory.create(ServiceAModule);
  await app.listen(appPort);
  console.log(`Service-A listening on http://localhost:${appPort}`);
}
bootstrap();
