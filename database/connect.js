
const { MongoClient } = require('mongodb');

let _db;

const initDb = async () => {
  if (_db) {
    console.log('Db is already initialized!');
    return _db;
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    _db = client.db('project2'); // explicitly choose your database
    console.log('Database connected');
    return _db;
  } catch (err) {
    console.error('Failed to connect to DB', err);
    throw err;
  }
};

const getDb = () => {
  if (!_db) throw new Error('Db not initialized');
  return _db;
};

module.exports = { initDb, getDb };
