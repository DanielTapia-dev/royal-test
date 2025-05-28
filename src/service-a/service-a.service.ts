import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { once } from 'events';
import { createRedisClient } from 'src/common/redis-client';

interface DoubleResponse {
  result: number;
}

@Injectable()
export class ServiceAService {
  private publisher = createRedisClient();

  constructor() {
    this.publisher.connect().catch((err) => {
      console.error('Redis publisher failed to connect:', err);
    });
  }

  async getDouble(numParam: number): Promise<number> {
    const num = Number(numParam);
    if (isNaN(num)) {
      throw new BadRequestException('Invalid number');
    }

    const requestId = uuidv4();
    const responseChannel = `response_${requestId}`;

    const tempSub = createRedisClient();
    await tempSub.connect();

    try {
      await tempSub.subscribe(responseChannel);

      await this.publisher.publish(
        'double_number',
        JSON.stringify({ id: requestId, data: num }),
      );

      const result = await Promise.race([
        once(tempSub, 'message') as Promise<[string, string]>,
        this.timeout(5000),
      ]);

      const [channel, message] = result;

      if (channel !== responseChannel) {
        throw new InternalServerErrorException('Unexpected response channel');
      }

      const data = JSON.parse(message) as DoubleResponse;

      if (typeof data.result !== 'number') {
        throw new InternalServerErrorException('Invalid response format');
      }

      return data.result;
    } finally {
      await tempSub.unsubscribe(responseChannel);
      await tempSub.quit();
    }
  }

  private timeout(ms: number): Promise<never> {
    return new Promise((_, reject) =>
      setTimeout(
        () =>
          reject(
            new InternalServerErrorException(
              'Timeout waiting for service-b response',
            ),
          ),
        ms,
      ),
    );
  }
}
