import { Module } from '@nestjs/common';
import { ServiceAController } from './service-a.controller';
import { ServiceAService } from './service-a.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ServiceAController],
  providers: [
    ServiceAService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: { host: 'localhost', port: 6379 },
        }),
    },
  ],
})
export class ServiceAModule {}
