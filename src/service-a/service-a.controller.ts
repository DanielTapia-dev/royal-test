import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ServiceAService } from './service-a.service';

@Controller()
export class ServiceAController {
  constructor(private readonly serviceAService: ServiceAService) {}

  @Get('double/:num')
  async getDouble(
    @Param('num', ParseIntPipe) numParam: number,
  ): Promise<{ result: number }> {
    const result = await this.serviceAService.getDouble(numParam);
    return { result };
  }
}
