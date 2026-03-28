import bcrypt from "bcrypt";
import {
  CLOUDINARY_FOLDER,
  CLOUDINARY_TRANSFORM,
} from "../../shared/constants/cloudinary.constant.js";
import {
  cloudinaryDeleteFile,
  cloudinaryUploadBuffer,
} from "../../shared/utils/cloudinary_upload.js";
import { ErrorUtil } from "../../shared/utils/error.js";
import { verifyToken } from "../../shared/utils/jwt.js";
import { UserConstant } from "./user.constant.js";
import {
  findUserByEmail,
  findUserById,
  updateUser,
} from "./user.repository.js";

export const findUserByTokenService = async (token) => {
  const jwtUserDecode = verifyToken(token)?.data;

  const user = await findUserById(jwtUserDecode.id);

  ErrorUtil.checkNotFound(user, UserConstant.USER_NOT_FOUND_MSG);

  return user;
};

export const findUserByIdService = async (id) => {
  const user = await findUserById(id);

  ErrorUtil.checkNotFound(user, UserConstant.USER_NOT_FOUND_MSG);

  return user;
};

export const findUserByEmailService = async (email) => {
  const user = await findUserByEmail(email);

  ErrorUtil.checkNotFound(user, UserConstant.USER_NOT_FOUND_MSG);

  return user;
};

const logicUpdateUser = async (id, data) => {
  const existUser = await findUserByIdService(id);

  existUser.name = data.name;
  existUser.email = data.email;

  if (data?.photoBuffer) {
    if (existUser.photoPublicId) {
      await cloudinaryDeleteFile(existUser.photoPublicId);
    }

    const res = await cloudinaryUploadBuffer(
      CLOUDINARY_FOLDER.USERS,
      CLOUDINARY_TRANSFORM.PROFILE_PICTURE,
      data.photoBuffer,
    );

    existUser.photoUrl = res.secure_url;
    existUser.photoPublicId = res.public_id;
  }

  if (data.password) existUser.password = bcrypt.hashSync(data.password, 12);

  return await updateUser(id, existUser);
};

export const updateMyProfileUserService = async (data) => {
  const { authenticatedUser } = data;

  return await logicUpdateUser(authenticatedUser._id, data);
};

export const updateUserService = async (data) => {
  const { id } = data;

  return await logicUpdateUser(id, data);
};
