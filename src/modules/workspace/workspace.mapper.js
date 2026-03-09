import { UserToDTO } from "../user/user.mapper.js";

export const WorkspaceToDTO = (workspace) => {
  const { _id, name, createdAt, updatedAt, owner } = workspace;
  const ownerDTO = UserToDTO(owner);

  return {
    _id,
    name,
    createdAt,
    updatedAt,
    owner: ownerDTO,
  };
};

export const ListWorkspaceToDTO = (workspaces) => {
    const workspacesDTO = []

    for (const workspace of workspaces) {
        workspacesDTO.push(WorkspaceToDTO(workspace))
    }

    return workspacesDTO
}