import workspaceModel from "./workspace.model.js"

export const createWorkspace = (workspace) => workspaceModel.create(workspace)

export const updateWorkspace = (id, workspace) => workspaceModel.updateOne(id, workspace)

export const deleteWorkspaceById = (id) => workspaceModel.deleteOne({ id })

export const findWorkspaceByName = (name) => workspaceModel.findOne({ name })

export const findWorkspaceById = (id) => workspaceModel.findOne({ id })

export const getAllWorkspace = () => workspaceModel.find()