import mongoose from "mongoose";

const taskActivitySchema = new mongoose.Schema({
  task: {
    type: mongoose.Types.ObjectId,
    ref: "Task",
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  action: {
    type: String,
    enum: ["task_created", "status_changed", "assigned_user", "comment_added"]
  },
  old_value: {
    type: String,
  },
  new_value: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.model("TaskActivity", taskActivitySchema)