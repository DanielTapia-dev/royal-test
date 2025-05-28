import { NestFactory } from '@nestjs/core';
import { ServiceAModule } from './service-a/service-a.module';
import { ServiceBModule } from './service-b/service-b.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const appA = await NestFactory.create(ServiceAModule);
  appA.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'redis://localhost',
      port: 6379,
    },
  });
  await appA.startAllMicroservices();
  await appA.listen(3000);

  const appB = await NestFactory.create(ServiceBModule);
  appB.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'redis://localhost',
      port: 6379,
    },
  });
  await appB.startAllMicroservices();
  await appB.listen(3001);
}
bootstrap();
