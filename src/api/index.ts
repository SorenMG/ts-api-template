import { Router } from 'express';
import users from './routes/users';

export default () => {
  const app = Router();

  // Reroute here
  users(app);

  return app
}
