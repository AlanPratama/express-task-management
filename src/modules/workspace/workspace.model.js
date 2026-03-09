import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
})

workspaceSchema.index({ owner: 1 });

export default mongoose.model("Workspace", workspaceSchema)