import mongoose from "mongoose";

const taskAssigneeSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    assignedAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model("TaskAssignee", taskAssigneeSchema)