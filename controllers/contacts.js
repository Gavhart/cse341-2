const mongodb = require('../data/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
    const contact = req.body;
    const result = await mongodb.getDb().collection('contacts').insertOne(contact);
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json({ error: 'Failed to create contact' });
    }
};

const updateContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const contact = req.body;
    const result = await mongodb.getDb().collection('contacts').replaceOne({ _id: contactId }, contact);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Failed to update contact' });
    }
};

const deleteContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').deleteOne({ _id: contactId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};