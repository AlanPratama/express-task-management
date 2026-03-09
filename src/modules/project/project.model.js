import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    workspace: {
        type: mongoose.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
}, {
    timestamps: true
})

export default mongoose.Model("Project", projectSchema)