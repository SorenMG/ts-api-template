import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IUser } from '../../interfaces/IUser';

/**
 * Attach user to req.user
 */
 const attachCurrentUser = async (req, res, next) => {
   const Logger = Container.get('logger');
   try {
     const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;
     const currentUser = await UserModel.findById(req.token._id).lean();
     if (!currentUser) {
       return res.sendStatus(401);
     }
     Reflect.deleteProperty(currentUser, 'password');
     Reflect.deleteProperty(currentUser, 'salt');
     req.currentUser = currentUser;
     return next();
   } catch(error) {
     Logger.error('🔥 Error attaching user to req: %o', error);
     return next(error);
   }
 };

 export default attachCurrentUser;
