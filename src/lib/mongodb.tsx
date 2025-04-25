import { MongoClient } from 'mongodb';

const url = process.env.DATABASE_URL;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!url) throw new Error('Add MONGODB_URI to .env.local');

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(url, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(url, options);
  clientPromise = client.connect();
}

export default clientPromise;