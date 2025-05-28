import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ServiceAService {
  constructor(@Inject('REDIS_CLIENT') private readonly client: ClientProxy) {}

  async getDouble(numParam: string): Promise<number> {
    const num = Number(numParam);
    if (isNaN(num)) {
      throw new Error('Invalid number');
    }

    return await firstValueFrom(
      this.client.send<number, number>('double_number', num),
    );
  }
}
