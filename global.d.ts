import { MongoClient } from 'mongodb';

// Declares the global namespace augmentation for TypeScript
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

// Ensure this file is saved in the root directory (EDUROAM-MAIN/)
