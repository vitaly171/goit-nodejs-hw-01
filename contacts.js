const fs = require("fs/promises");
const path = require("path");
const {v4} = require("uuid");

const contactsPath = path.join("db/contacts.json");


async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}
  
async function getContactById(id) {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === id);
    if(!result){
        return null;
    }
    return result
  }
  
async function addContact(name, email, phone) {

    const data = {id: v4(), name, email , phone};
    const contacts = await listContacts();
    contacts.push(data);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return data;
}
  
async function removeContact(id) {
    const contacts = await listContacts();
    
    const idx = contacts.findIndex(contact => contact.id === id);
    if(idx === -1){
        return null;
    }
    const deleteContacts = contacts[idx];
    
    contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deleteContacts;
  }


module.exports = {
    listContacts, 
    getContactById,
    addContact,
    removeContact,
  }