import { createNodeRedisClient } from 'handy-redis';

import config from '../config';
import log from '../util/tslog';

/**
 * Creates a Redis instance to be used by the application.
 */
const redis = createNodeRedisClient({
  host: config.REDIS_HOST,
  password: config.REDIS_PASSWORD,
  port: config.REDIS_PORT,
});

/**
 * Set up pub/sub listeners.
 */
redis.nodeRedis.on('error', (err: unknown) =>
  log.error('An error occurred when setting up Redis. Error:', err)
);
redis.nodeRedis.on('connect', () =>
  log.info('Successfully connected to the Redis instance!')
);

redis.nodeRedis.on('ready', () =>
  log.info('Successfully listening to the Redis instance!')
);

export default redis;
