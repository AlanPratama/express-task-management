import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  project: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'todo', 'in_progress', 'done'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  },
  created_by: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.Model("Task", taskSchema)