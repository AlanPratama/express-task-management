import { bcrypt } from "bcrypt";
import { generateError } from "../../shared/utils/error.js";
import { UserToDTO } from "./user.mapper.js";
import { findUserById, updateUser } from "./user.repository.js";

export const updateUserService = async (data) => {
  const { id, name, password, email } = data;

  const existUser = await findUserById(id);

  if (!existUser) throw generateError("User tidak ditemukan", 404);

  existUser.name = name;
  existUser.email = email;

  if (password) existUser.password = bcrypt.hashSync(password, 12);

  await updateUser(existUser);

  return UserToDTO(await updateUser(existUser));
};