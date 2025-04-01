import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactController(req, res) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  if (contact.userId.toString() !== req.user._id.toString()) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const contact = {
    ...req.body,
    userId: req.user._id,
  };

  const result = await createContact(contact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
}

export async function updateContactController(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  if (contact.userId.toString() !== req.user._id.toString()) {
    throw createHttpError(404, 'Contact not found');
  }

  const result = await updateContact(contactId, req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  if (contact.userId.toString() !== req.user._id.toString()) {
    throw createHttpError(404, 'Contact not found');
  }

  await deleteContact(contactId);

  res.status(204).send();
}
