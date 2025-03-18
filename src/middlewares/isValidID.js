import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export function isValidID(req, res, next) {
  const { id } = req.params;

  if (isValidObjectId(id) !== true) {
    return next(new createHttpError.BadRequest('ID is not valid'));
  }

  next();
}
