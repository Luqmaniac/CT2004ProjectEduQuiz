import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import quizRoutes from './routes/quizRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI; // Updated to match .env
    console.log('Connecting to MongoDB with URI:', uri);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Database Connection Error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);

// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});