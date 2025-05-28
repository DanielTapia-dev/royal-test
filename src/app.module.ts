import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceAModule } from './service-a/service-a.module';
import { ServiceBModule } from './service-b/service-b.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServiceAModule,
    ServiceBModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
