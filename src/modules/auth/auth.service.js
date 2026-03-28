import bcrypt from "bcrypt";
import { ErrorUtil } from "../../shared/utils/error.js";
import { generateJwtToken } from "../../shared/utils/jwt.js";
import userModel from "../user/user.model.js";
import { createUser, findUserByEmail } from "../user/user.repository.js";
import { findUserByEmailService } from "../user/user.service.js";

const generateJwtData = (token, user) => {
    return {
        token,
        _id: user._id,
        email: user.email,
        role: user.role
    }
}

export const registerService = async (data) => {
  const { name, email, password } = data;

  const existingUser = await findUserByEmail(email)

  ErrorUtil.checkUnAuthorized(existingUser, `Email ${email} telah digunakan, silahkan gunakan email lainnya`)

  const hashedPassword = bcrypt.hashSync(password, 12);

  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  await createUser(newUser);

  const token = generateJwtToken(generateJwtData(null, newUser));

  return generateJwtData(token, newUser);
};

export const loginService = async (data) => {
  const { email, password } = data;

  const existingUser = await findUserByEmailService(email);

  const isValidPassword = bcrypt.compareSync(password, existingUser.password)

  ErrorUtil.checkUnAuthorized(!isValidPassword, `Email / password salah`)

  const token = generateJwtToken(generateJwtData(null, existingUser));

  return generateJwtData(token, existingUser)
};

export const getAuthenticatedUser = async (data) => {
  const { authenticatedUser } = data

  return await findUserByEmailService(authenticatedUser.email);
}