import mongoose from "mongoose";
import workspaceModel from "./workspace.model.js";
import workspace_memberModel from "../workspace_member/workspace_member.model.js";

export const createWorkspace = (workspace) => workspaceModel.create(workspace);

export const updateWorkspace = (_id, data) =>
  workspaceModel.findByIdAndUpdate(_id, data, { returnDocument: "after" });

export const deleteWorkspaceById = (_id) =>
  workspaceModel.findByIdAndDelete(_id, { returnDocument: "after" });

export const findAllWorkspaceByOwnerIdWithPagination = async (
  name,
  ownerId,
  skip,
  limit,
) => {

  const workspaceRecords = await workspace_memberModel.find({ user: ownerId }).select("workspace")
  const workspaceIds = workspaceRecords.map((data) => data.workspace)

  return await workspaceModel
    .find({ name: { $regex: name, $options: "i" }, $or: [
      { owner: ownerId },
      { _id: { $in: workspaceIds } }
    ]})
    .skip(skip)
    .limit(limit)
    .populate("owner")
    .populate({
      path: "members",
      populate: "user",
    })
    .exec();
}

export const findWorkspaceById = (_id) =>
  workspaceModel
    .findOne({ _id })
    .populate("owner")
    .populate({
      path: "members",
      populate: { path: "user" },
    });

export const findWorkspaceByIdAndUserId = (_id, userId) => workspaceModel.findOne({ _id, user: userId })