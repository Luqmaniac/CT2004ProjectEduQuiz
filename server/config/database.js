import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  constructor() {
    this.mongoURI = process.env.MONGODB_URI;
  }

  async connect() {
    try {
      await mongoose.connect(this.mongoURI);
      console.log('MongoDB Connected...');
    } catch (err) {
      console.error('Database Connection Error:', err.message);
      process.exit(1);
    }
  }
}

export default new Database();