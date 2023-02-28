import express from 'express';

import config from '../../config';
import { mongooseInstance } from '../../db/mongoose-connection';
import { typeormInstance } from '../../db/typeorm-connection';
import { FirebaseAdmin } from '../../firebase';
import tslog from '../../util/tslog';
import bull from '../bull';
import { CacheService } from '../cache/service';
import { shutdownServer } from './shutdown-server';

/**
 * Starts our server.
 */
export async function startServer(app: express.Application) {
  // Handle uncaught exceptions to prevent app error before starting.
  process.on('uncaughtException', (err: Error) => {
    tslog.error('Unhandled exception 💥! Application shutting down!');
    tslog.error(err.name, err.message);
    process.exit(1);
  });

  // Provision all infrastructures and test connectivity.
  const status = await Promise.all([
    Promise.resolve(FirebaseAdmin.getInstance().connected),
    CacheService.ping(),
    bull.getMaxListeners(),
    typeormInstance.connect(),
    mongooseInstance.connect(),
  ]);

  const statusLog = {
    firebase: status[0],
    cache: status[1].toString() === 'PONG',
    bull: status[2] > 0,
    postgres: true,
    mongoose: true,
  };

  tslog.info(`Status of infrastructures: \n ${JSON.stringify(statusLog)}.`);

  // Prepare server.
  const server = app.listen(config.PORT, () => {
    tslog.info(`API ready on port ${config.PORT} on mode ${config.NODE_ENV}!`);
  });

  // Handle unhandled rejections, then shut down gracefully.
  process.on('unhandledRejection', (err: Error) => {
    tslog.error('Unhandled rejection 💥! Application shutting down!');
    tslog.error(err.name, err.message);
    tslog.debug(err);

    // Finish all requests that are still pending, the shutdown gracefully.
    shutdownServer(server, 'unhandledRejection', 1);
  });

  // Handle signals: interrupts, quits, and terminates.
  process.on('SIGINT', () => shutdownServer(server, 'SIGINT', 0));
  process.on('SIGQUIT', () => shutdownServer(server, 'SIGQUIT', 0));
  process.on('SIGTERM', () => shutdownServer(server, 'SIGTERM', 0));
}
