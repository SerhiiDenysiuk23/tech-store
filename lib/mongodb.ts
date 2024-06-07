import { connect, connection, Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedPromise: Promise<Connection>;

const globalWithMongoose = global as typeof globalThis & {
  _mongooseClientPromise: Promise<Connection>
};

const connectToDatabase = async () => {
  if (connection.readyState >= 1) {
    return connection;
  }

  if (process.env.NODE_ENV === 'development') {
    if (!globalWithMongoose._mongooseClientPromise) {
      globalWithMongoose._mongooseClientPromise = connect(MONGODB_URI).then(() => connection);
    }
    cachedPromise = globalWithMongoose._mongooseClientPromise;
  } else {
    cachedPromise = connect(MONGODB_URI).then(() => connection);
  }

  await cachedPromise;
  console.log('Connected to MongoDB');
  return connection;
};

export default connectToDatabase;
