const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/real_estate_india_db';
    try {
      const conn = await mongoose.connect(connStr, {
        serverSelectionTimeoutMS: 2000
      });
      console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    } catch (localErr) {
      console.log('[Database] Local MongoDB connection failed/not running. Launching in-memory MongoDB server...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`[Database] In-Memory MongoDB Connected successfully at: ${mongoUri}`);
    }
  } catch (error) {
    console.error(`[Database Error] ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
