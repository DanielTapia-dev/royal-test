import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServiceAController } from './service-a.controller';
import { ServiceAService } from './service-a.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ServiceAController],
  providers: [ServiceAService],
})
export class ServiceAModule {}
