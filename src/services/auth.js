import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';

export async function registerUser(payload) {
  const user = await User.findOne({ email: payload.email });

  if (user !== null) {
    throw createHttpError.Conflict('Email is already exists');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return User.create(payload);
}
