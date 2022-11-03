const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://sang2x:sAg12081995@cluster0.j1wx6nb.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected!');
            db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if (db) {
        return db;
    }
    throw 'No databse found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;