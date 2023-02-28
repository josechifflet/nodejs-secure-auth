import mongoose from 'mongoose';

import config from '../config';
import log from '../util/tslog';

class MongooseConnectionInstance {
  private readonly connectionString: string;
  private readonly connectionOptions: mongoose.ConnectOptions;

  constructor(
    connectionString: string,
    connectionOptions: mongoose.ConnectOptions
  ) {
    this.connectionString = connectionString;
    this.connectionOptions = connectionOptions;
  }

  public async connect(): Promise<boolean> {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(this.connectionString, this.connectionOptions);
      log.info('Successfully connected to the MongoDb instance!');
      return true;
    } catch (error) {
      log.error('Error connecting to the MongoDb database:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      log.info('Successfully disconnected from the MongoDb instance!');
    } catch (error) {
      log.error('Error disconnecting from the database:', error);
      throw error;
    }
  }
}

export const mongooseInstance = new MongooseConnectionInstance(
  config.DOCUMENT_DB,
  { authSource: 'admin' }
);
