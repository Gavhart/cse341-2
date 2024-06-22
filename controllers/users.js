const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  const result = await mongodb.getDatabase().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb.getDb().db().collection("users").replaceOne({ _id: userId }, user);
  if (response.acknowledged > 0) {
    res.status(204).send();
  }
  else {
    res.status(500).json(response.error || "Some error occurred while creating the contact.");
  }
};

const updateUser = async (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    ipadress: req.body.ipadress,
  };
  const response = await mongodb.getDb().db().collection("users").insertOne(user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the contact."
      );
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection("users").remove({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the contact."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
