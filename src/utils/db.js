const MongoClient = require('mongodb').MongoClient;
const LOGGER = require('../utils/logger')(__filename);


const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/intellect';
const OPTIONS = {useNewUrlParser: true};
const DB = process.env.DB || 'intellect';
let client = null;

const getClient = () => {
    return new Promise((resolve, reject) => {
        if (client == null) {
            MongoClient.connect(MONGO_URL, OPTIONS).then(client => resolve(client)).then(err => reject(err));
        } else {
            resolve(client);
        }
    });
};

const getNextSequence = (db, collection) => {
    return new Promise(function (resolve, reject) {
        db.collection(collection).find({}).sort({$natural: -1}).limit(1).next().then(result => {
            id = 1;
            if (result != null) {
                id = result._id + 1;
            }
            resolve(id);
        }).catch(err => {
            reject(err);
        });
    });
};

const closeClient = (client) => {
    if (client) client.close();
};

module.exports = {MONGO_URL, OPTIONS, DB, getNextSequence, getClient, closeClient};