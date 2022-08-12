const mongodb = require('mongodb');
const MongoClint = mongodb.MongoClient;
const dbName = "connection"
const dbUrl = 'mongodb+srv://wikky:Admin326@wikky.niqdc7c.mongodb.net/?retryWrites=true&w=majority';
module.exports = {dbUrl,dbName,mongodb,MongoClint}