import mongoose from "mongoose";
import { TaskConstant } from "./task.constant";

const taskSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    enum: TaskConstant.TASK_STATUS,
    default: TaskConstant.TASK_STATUS_DEFAULT
  },
  priority: {
    type: String,
    enum: TaskConstant.TASK_PRIORITY,
    default: TaskConstant.TASK_PRIORITY_DEFAULT
  },
  dueDate: {
    type: Date
  }
}, {
  timestamps: true
})

export default mongoose.model("Task", taskSchema)