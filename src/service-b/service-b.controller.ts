import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ServiceBService } from './service-b.service';
import { MESSAGE_PATTERNS } from '../common/constants';

@Controller()
export class ServiceBController {
  constructor(private readonly serviceBService: ServiceBService) {}

  @MessagePattern(MESSAGE_PATTERNS.DOUBLE_NUMBER)
  handleDouble(data: number): number {
    return this.serviceBService.calculateDouble(data);
  }

  @Get('square/:num')
  getSquare(@Param('num', ParseIntPipe) num: number) {
    const val = Number(num);
    return { result: this.serviceBService.calculateSquare(val) };
  }
}
