import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader().catch(error => {
      Logger.error('DB failed to load 🔥');
      process.exit(1);
  });
  Logger.info('DB loaded and connected! 🙌');

  // Load model into dependency injector
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [
      // userModel,
    ],
  });
  Logger.info('Dependency Injector loaded 🙌');

  await expressLoader({ app: expressApp });
  Logger.info('Express loaded 🙌');
};
