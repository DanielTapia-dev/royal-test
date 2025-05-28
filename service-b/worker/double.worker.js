const { pub, sub } = require('../redis');

sub.subscribe('double_number', () => {
  console.log('Subscribed to double_number');
});

sub.on('message', async (channel, message) => {
  if (channel === 'double_number') {
    try {
      const payload = JSON.parse(message);
      const result = payload.data * 2;
      await pub.publish(`response_${payload.id}`, JSON.stringify({ result }));
      console.log(`Responded to ${payload.id} with ${result}`);
    } catch (err) {
      console.error('Error handling message:', err);
    }
  }
});
