import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);