/**
 * Database configuration
 *
 * This file is responsible for connecting to the database,
 * We used mongoose to connect to the MongoDB database, and left it for your reference.
 *
 * We have two functions here:
 * 1. mongooseConnection: This function is responsible for connecting to the database.
 * 2. isDatabaseConnected: This function is responsible for checking if the database is connected.
 */

import mongoose from 'mongoose';

import { MONGO_DB_CONN } from '../common/constant/dotenv.constant';

export const mongooseConnection = async (): Promise<void> => {
  if (!MONGO_DB_CONN) {
    throw new Error('MONGO_DB_CONN is not defined');
  }

  try {
    await mongoose.connect(MONGO_DB_CONN, {
      autoIndex: true,
    });
    console.log('Connected with MongoDB');
  } catch (error) {
    console.error(error);
  }
};

export const isDatabaseConnected = (): boolean => {
  const state = mongoose.connection.readyState;
  return state === 1;
};
