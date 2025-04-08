import express from 'express';
import {
  createContactController,
  deleteContactController,
  getContactController,
  getContactsController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidID } from '../middlewares/isValidID.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema, updateContactSchema } from '../validation/contacts.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValidID, ctrlWrapper(getContactController));
router.post(
  '/',
  jsonParser,
  upload.single('photo'),
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:contactId',
  isValidID,
  upload.single('photo'),
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);
router.delete('/:contactId', isValidID, ctrlWrapper(deleteContactController));

export default router;
