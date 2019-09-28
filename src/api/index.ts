import { Router } from 'express';
import users from './routes/users';
import auth from './routes/auth';

export default () => {
  const app = Router();

  // Reroute here
  users(app);
  auth(app);

  return app
}
