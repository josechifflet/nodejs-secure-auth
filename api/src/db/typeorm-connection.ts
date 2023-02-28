import 'reflect-metadata';

import { DataSource } from 'typeorm';

import log from '../util/tslog';
import { dbDataSource } from './typeorm.config';

export class TypeORMConnectionInstance {
  private static instance: TypeORMConnectionInstance;

  public dataSource: DataSource;

  constructor() {
    this.dataSource = dbDataSource;
  }

  static getInstance() {
    if (!TypeORMConnectionInstance.instance) {
      TypeORMConnectionInstance.instance = new TypeORMConnectionInstance();
    }
    return TypeORMConnectionInstance.instance;
  }

  public connect = async (): Promise<void> => {
    try {
      this.dataSource = await this.dataSource.initialize();
      await this.runMigrations();
      log.info('Successfully connected to the Postgres instance!');
    } catch (error) {
      log.error('Error connecting to the Postgres database:', error);
      throw error;
    }
  };

  public disconnect = async (): Promise<void> => {
    try {
      await this.dataSource.destroy();
      log.info('Successfully disconnected from the Postgres instance!');
    } catch (err) {
      log.error(`${err}`);
    }
  };

  public syncModels = async (dropBefore: boolean) => {
    try {
      await this.dataSource.synchronize(dropBefore);
      log.info('Synchronization between API models and Postgres was done!');
    } catch (err) {
      log.error(
        'Synchronization between API models models and Postgres failed'
      );
    }
  };

  public runMigrations = async (): Promise<boolean> => {
    try {
      log.info('Running migrations...');
      const hasPendingMigrations = await this.dataSource.showMigrations();
      if (hasPendingMigrations) {
        const appliedMigrations = await this.dataSource.runMigrations();
        log.info(
          `${
            appliedMigrations?.length || 0
          } migrations were successfully applied!`
        );
      } else log.info(`There is no pending migration to apply!`);
      return true;
    } catch (err) {
      log.error(`Error running migrations. ERROR: ${err}`);
      return false;
    }
  };
}
export const typeormInstance = TypeORMConnectionInstance.getInstance();
