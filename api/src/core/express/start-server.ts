import express from 'express';

import config from '../../config';
import { typeormInstance } from '../../db/typeorm-connection';
import tslog from '../../util/tslog';
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

  await Promise.all([typeormInstance.connect()]);

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
