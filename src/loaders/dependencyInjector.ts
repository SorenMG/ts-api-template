import { Container } from 'typedi';
import LoggerInstance from './logger';
import agendaFactory from './agenda';
import config from '../config';

export default ({ mongoConnection, models }: { mongoConnection; models: { name: string; model: any }[] }) => {
  try {
    models.forEach(model => {
      Container.set(model.name, model.model);
    });

    const agendaInstance = agendaFactory({ mongoConnection });

    Container.set('agendaInstance', agendaInstance);
    Container.set('logger', LoggerInstance);

    LoggerInstance.info('Agenda injected into container 🙌');

    return { agenda: agendaInstance };
  } catch (error) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', error);
    throw error;
  }
};
