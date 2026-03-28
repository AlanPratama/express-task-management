import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
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

projectSchema.index({ workspace: 1 });

export default mongoose.model("Project", projectSchema)