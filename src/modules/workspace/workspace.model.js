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
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

workspaceSchema.virtual('members', {
    ref: "WorkspaceMember",
    localField: "_id",
    foreignField: "workspace"
})

workspaceSchema.index({ owner: 1 });

export default mongoose.model("Workspace", workspaceSchema)