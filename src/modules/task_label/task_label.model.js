import mongoose from "mongoose";

const taskLabelSchema = new mongoose.Schema({
  task: {
    type: mongoose.Types.ObjectId,
    ref: "Task",
    required: true
  },
  label: {
    type: mongoose.Types.ObjectId,
    ref: "Label",
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model("TaskLabel", taskLabelSchema)