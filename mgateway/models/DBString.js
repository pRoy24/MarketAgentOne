import 'dotenv/config';

import * as mongoose from 'mongoose';



let db;

export async function getDBConnectionString() {
  if (db) {
    return db;
  }
  let connectionString = `mongodb://localhost:27017/MarketAgent`;
  if (process.env.CURRENT_ENV === 'production') {
    connectionString = 'mongodb://localhost:27017/Marketgent';
  }
  mongoose.connect(`${connectionString}`, { useNewUrlParser: true, useUnifiedTopology: true });

  db = mongoose;

  return db;
}





export async function getDatabase() {
  const dbConnection = await getDBConnectionString();
  return dbConnection.connection.db;
}
