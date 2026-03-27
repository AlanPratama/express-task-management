import projectModel from "./project.model.js";

export const findAllProjectPagination = async (
  workspaceId,
  skip,
  limit,
) => {
  const criteria = { workspace: workspaceId };

  return await projectModel
    .find(criteria)
    .skip(skip)
    .limit(limit)
    .populate({ path: "workspace", populate: "owner" });
};

export const findProjectById = (_id) =>
  projectModel
    .findOne({ _id })
    .populate("workspace")

export const createProject = (Project) => projectModel.create(Project);

export const updateProject = (_id, Project) =>
  projectModel
    .findByIdAndUpdate(_id, Project, {
      returnDocument: "after",
    })

export const deleteProjectById = (_id) =>
  projectModel.findByIdAndDelete(_id, { returnDocument: "after" });
