import Contact from '../db/models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const createContact = async (contact) => {
  return await Contact.create(contact);
};

export const updateContact = async (contactId, contact) => {
  return await Contact.findByIdAndUpdate(contactId, contact, { new: true });
};

export const deleteContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};
