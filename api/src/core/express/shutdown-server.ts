import { Server } from 'http';
import toobusy from 'toobusy-js';

import tslog from '../../util/tslog';
import bull from '../bull';
import redis from '../redis';

/**
 * Gracefully shuts down the application server.
 *
 * @param server - Node.js server.
 * @param signal - Signal to be placed in standard output.
 * @param code - Exit error code.
 */
export function shutdownServer(server: Server, signal: string, code: number) {
  const stoppingInfrastructures = [
    redis.quit(),
    // prisma.$disconnect(),
    toobusy.shutdown(),
    bull.close(),
  ];

  // Shuts down the server, then synchronously stop the infrastructure.
  tslog.info(`Received ${signal}. Shutting down gracefully.`);
  server.close(() => {
    Promise.all(stoppingInfrastructures)
      .then(() => {
        tslog.info(`Server has closed due to ${signal} signal.`);
        process.exit(code);
      })
      .catch((err) => {
        tslog.error('Failed to shut down infrastructures due to an error.');
        tslog.error(err);
        process.exit(1);
      });
  });

  // If fail to shut down in time (30 secs), forcefully shutdown.
  setTimeout(() => {
    tslog.error('Graceful shutdown timeout, forcing exit.');
    process.exit(1);
  }, 30000);
}
