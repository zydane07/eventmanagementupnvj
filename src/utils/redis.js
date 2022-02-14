const redis = require('redis');

const redis_port = process.env.PORT || 6379;

(async() => {
  const client = redis.createClient(redis_port);
  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
  module.exports = client;
})();



