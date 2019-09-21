import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';
import crypto from 'bcryptjs';
import { Container } from 'typedi';

const User = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      'Name cannot be blank'
    ],
    match: [
      /^[a-zA-Z0-9]+$/,
      'Invalid name'
    ],
    index: true},

  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [
      true,
      'Email cannot be blank'
    ],
    match: [
      /\S+@\S+\.\S+/,
      'Invalid email'
    ],
    index: true},

  hash: String,

  salt: String,

  // role: {
  //   type: String,
  //   default: 'user',
  // },
},
{
  autoIndex: true,
  timestamps: true
});

// Set password method
User.methods.setPassword = (password) => {
  const Logger = Container.get('logger');
  crypto.genSalt(10).then(salt => {
    this.salt = salt;

    crypto.hash(password, salt).then(hash => {
      this.hash = hash;
    });
  }).catch(err => {
    Logger.error('🔥 Password could not be set: %o', err);
    throw err;
  });
}

export default mongoose.model<IUser & mongoose.Document>('User', User);
