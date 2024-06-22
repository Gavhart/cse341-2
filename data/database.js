const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('Database is already initialized!');
        return callback(null, _db);
    }

    MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(client => {
            _db = client.db(); // Ensure that you get the database object, not the client
            callback(null, _db);
        })
        .catch(err => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw new Error('Database not initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb
};