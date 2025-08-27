import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';

// import examRoutes from './routes/examRoutes.js';
// index.js


import examRoutes from './routes/examRoutes.js';


import mcqRoutes from './routes/mcqRoutes.js';
import flashcardRoutes from './routes/flashcardRoutes.js';
import quizRoutes from './routes/quizRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB connected successfully'))
// .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// // Routes
// app.use('/api', examRoutes);
app.use('/api', examRoutes);
app.use('/api/mcq', mcqRoutes);
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/quiz', quizRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running successfully!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Exam Generator API ready at http://localhost:${PORT}`);
});
