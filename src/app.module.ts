import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceAModule } from './service-a/service-a.module';
import { ServiceBModule } from './service-b/service-b.module';
import { ServicenestController } from './g/servicenest/servicenest.controller';

@Module({
  imports: [ServiceAModule, ServiceBModule],
  controllers: [AppController, ServicenestController],
  providers: [AppService],
})
export class AppModule {}
