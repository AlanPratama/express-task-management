import mongoose from "mongoose";

const labelSchema = new mongoose.Schema({
  workspace: {
    type: mongoose.Types.ObjectId,
    ref: "Workspace",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true,
    default: "none"
  }
}, {
  timestamps: true
})

export default mongoose.model("Label", labelSchema)