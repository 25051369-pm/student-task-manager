import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      if (process.env.NODE_ENV !== 'production') {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      }
    })
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Export for Vercel
export default app;