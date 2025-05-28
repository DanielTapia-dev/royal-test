import { Injectable, BadRequestException } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ServiceAService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    });
  }

  async getDouble(numParam: string): Promise<number> {
    const num = Number(numParam);
    if (isNaN(num)) {
      throw new BadRequestException('Invalid number');
    }

    return await firstValueFrom(
      this.client.send<number, number>('double_number', num),
    );
  }
}
