import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ServiceBService } from './service-b.service';

@Controller()
export class ServiceBController {
  constructor(private readonly serviceBService: ServiceBService) {}

  @MessagePattern('double_number')
  handleDouble(data: number): number {
    return this.serviceBService.calculateDouble(data);
  }

  @Get('square/:num')
  getSquare(@Param('num') num: string) {
    const val = Number(num);
    return { result: this.serviceBService.calculateSquare(val) };
  }
}
