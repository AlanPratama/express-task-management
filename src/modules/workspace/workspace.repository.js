import workspaceModel from "./workspace.model.js"

export const createWorkspace = (workspace) => workspaceModel.create(workspace)

export const updateWorkspace = (_id, data) => workspaceModel.findByIdAndUpdate(_id, data, { returnDocument: "after" })

export const deleteWorkspaceById = (_id) => workspaceModel.findByIdAndDelete(_id, { returnDocument: "after" })

export const findWorkspaceByName = (name) => workspaceModel.findOne({ name }).populate("owner")

export const findAllWorkspaceByOwnerIdWithPagination = (ownerId, skip, limit) => workspaceModel.find({ owner: ownerId }).skip(skip).limit(limit).populate("owner").exec()

export const findWorkspaceById = (_id) => workspaceModel.findOne({ _id }).populate("owner")

export const findWorkspaceByIdAndOwnerId = (_id, ownerId) => workspaceModel.findOne({ _id, owner: ownerId }).populate("owner")

export const getAllWorkspace = () => workspaceModel.find().populate("owner")