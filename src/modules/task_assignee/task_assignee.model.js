import mongoose from "mongoose";

const taskAssigneeSchema = new mongoose.Schema({
    task: {
        type: mongoose.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    assigned_at: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.Model(taskAssigneeSchema, "TaskAssignee")