import mongoose from "mongoose";

const taskAttachmentSchema = new mongoose.Schema({
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
    file_path: {
        type: String,
        required: true
    },
    uploaded_by: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    timestamps: true
})

export default mongoose.model("TaskAttachment", taskAttachmentSchema)