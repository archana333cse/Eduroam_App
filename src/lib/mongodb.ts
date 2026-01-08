import { MongoClient } from 'mongodb';

// Check if the MONGO_URL variable is defined
if (!process.env.MONGO_URL) {
  throw new Error('Please define the MONGO_URL environment variable inside .env.local');
}

const uri = process.env.MONGO_URL;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// This logic is optimized for Next.js to prevent creating new MongoDB connections on every hot reload/request in development.
if (process.env.NODE_ENV === 'development') {
  // Use a global variable in development mode
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, connect normally
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export the promise that resolves to the MongoClient instance
export default clientPromise;
