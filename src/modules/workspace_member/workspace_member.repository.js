import workspace_memberModel from "./workspace_member.model.js"

export const createWorkspaceMember = (workspaceMember) => workspace_memberModel.create(workspaceMember)

export const updateWorkspaceMember = (_id, workspaceMember) => workspace_memberModel.updateOne(_id, workspaceMember)

export const deleteWorkspaceByIdMember = (_id) => workspace_memberModel.deleteOne({ _id })

export const findWorkspaceByNameMember = (name) => workspace_memberModel.findOne({ name })

export const findWorkspaceByIdMember = (_id) => workspace_memberModel.findOne({ _id })

export const getAllWorkspaceMember = () => workspace_memberModel.find()