import workspace_memberModel from "./workspace_member.model.js";
import userModel from "../user/user.model.js";

export const findAllWorkspaceMemberPagination = async (
  workspaceId,
  name,
  skip,
  limit,
) => {
  const criteria = { workspace: workspaceId };

  if (name) {
    const userIds = (
      await userModel.find({ name: { $regex: name, $options: "i" } }).lean()
    ).map((user) => user._id);

    criteria.user = { $in: userIds };
  }

  return await workspace_memberModel
    .find(criteria)
    .skip(skip)
    .limit(limit)
    .populate("user")
    .populate({ path: "workspace", populate: "owner" });
};

export const findWorkspaceMemberById = (_id) =>
  workspace_memberModel
    .findOne({ _id })
    .populate("user")
    .populate({ path: "workspace", populate: "owner" });

export const findWorkspaceMemberByWorkspaceIdAndUserId = (
  workspaceId,
  userId,
) =>
  workspace_memberModel
    .findOne({ workspace: workspaceId, user: userId })
    .populate("workspace");

export const checkWorkspaceMemberByWorkspaceIdAndUserId = (
  workspaceId,
  userId,
) =>
  workspace_memberModel
    .findOne({ workspace: workspaceId, user: userId })
    .select("_id");

export const createWorkspaceMember = (workspaceMember) =>
  workspace_memberModel.create(workspaceMember);

export const updateWorkspaceMember = (_id, workspaceMember) =>
  workspace_memberModel
    .findByIdAndUpdate(_id, workspaceMember, {
      returnDocument: "after",
    })
    .populate("user")
    .populate({ path: "workspace", populate: "owner" });

export const deleteWorkspaceMemberById = (_id) =>
  workspace_memberModel.findByIdAndDelete(_id, { returnDocument: "after" });
