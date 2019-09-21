import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash the whole process
  throw new Error("⚠️  Couldn't find .env file ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * Database URI
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * JSON Authentication secret
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * User by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * Agenda
   */
   agenda: {
     dbCollection: process.env.AGENDA_DB_COLLECTION,
     pooltime: process.env.AGENDA_POOL_TIME,
     concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
   },

  /**
   * API configs
   */
  api: {
    prefix: '/'
  }
}
