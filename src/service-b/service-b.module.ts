import { Module } from '@nestjs/common';
import { ServiceBService } from './service-b.service';
import { ServiceBController } from './service-b.controller';

@Module({
  providers: [ServiceBService],
  controllers: [ServiceBController]
})
export class ServiceBModule {}
