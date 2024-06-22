const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const db = mongodb.getDb();
        const result = await db.collection('contacts').find();
        const contacts = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ error: 'An error occurred while fetching contacts', details: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const contactId = req.params.id;
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid contact ID' });
        }
        const db = mongodb.getDb();
        const result = await db.collection('contacts').find({ _id: new ObjectId(contactId) });
        const contacts = await result.toArray();
        if (contacts.length === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    } catch (err) {
        console.error('Error fetching contact:', err);
        res.status(500).json({ error: 'An error occurred while fetching the contact', details: err.message });
    }
};

const createContact = async (req, res) => {
    try {
        const contact = req.body;
        const db = mongodb.getDb();
        const result = await db.collection('contacts').insertOne(contact);
        if (result.acknowledged) {
            res.status(201).json(result);
        } else {
            res.status(500).json({ error: 'Failed to create contact' });
        }
    } catch (err) {
        console.error('Error creating contact:', err);
        res.status(500).json({ error: 'Failed to create contact', details: err.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid contact ID' });
        }
        const contact = req.body;
        const db = mongodb.getDb();
        const result = await db.collection('contacts').replaceOne({ _id: new ObjectId(contactId) }, contact);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Contact not found or no changes made' });
        }
    } catch (err) {
        console.error('Error updating contact:', err);
        res.status(500).json({ error: 'Failed to update contact', details: err.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid contact ID' });
        }
        const db = mongodb.getDb();
        const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(contactId) });
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (err) {
        console.error('Error deleting contact:', err);
        res.status(500).json({ error: 'Failed to delete contact', details: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};