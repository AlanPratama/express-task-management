import mongoose from "mongoose";
import { TaskConstant } from "./task.constant.js";

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

// taskSchema.pre("findOneAndDelete", async function (next) {
//   try {
//     // 1. Ambil query filter (misal: { _id: '...' })
//     const query = this.getQuery();
    
//     // 2. Hapus semua TaskAssignee yang merujuk ke Task ini
//     await TaskAssignee.deleteMany({ task: query._id });
    
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

export default mongoose.model("Task", taskSchema)