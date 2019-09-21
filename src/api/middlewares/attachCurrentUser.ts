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
     const userRecord = UserModel.findById(req.token._id);
     if (!userRecord) {
       return res.sendStatus(401);
     }
     const currentUser = userRecord.toObject();
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
