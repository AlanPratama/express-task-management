import mongoose from "mongoose";

const workspaceMemberSchema = new mongoose.Schema({
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    privilage: {
        type: String,
        enum: ["view", "edit"],
        default: "view"
    },
    role: {
        type: String,
        enum: ["owner", "admin", "member"]
    }
})

workspaceMemberSchema.index({ workspace: 1, user: 1 });

export default mongoose.Model("WorkspaceMember", workspaceMemberSchema)