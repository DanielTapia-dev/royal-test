jest.mock('../redis', () => {
  const events = {};
  return {
    pub: { publish: jest.fn() },
    sub: {
      subscribe: jest.fn((_ch, cb) => cb()),
      on: (event, callback) => {
        if (event === 'message') events.message = callback;
      },
      _emit: (channel, message) => events.message(channel, message),
    },
  };
});

describe('double.worker', () => {
  it('should parse message and publish double result', async () => {
    const { pub, sub } = require('../redis');
    require('../worker/double.worker');

    const testPayload = { id: 'test123', data: 5 };
    await sub._emit('double_number', JSON.stringify(testPayload));

    expect(pub.publish).toHaveBeenCalledWith(
      'response_test123',
      JSON.stringify({ result: 10 }),
    );
  });
});
