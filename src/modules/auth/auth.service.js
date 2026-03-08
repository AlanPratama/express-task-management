import bcrypt from "bcrypt";
import userModel from "../user/user.model.js";
import { createUser, findUserByEmail } from "../user/user.repository.js";
import { generateJwtToken } from "../../shared/utils/jwt.js";
import { generateError } from "../../shared/utils/error.js";

const generateJwtData = (token, user) => {
    return {
        token,
        email: user.email,
        role: user.role
    }
}

export const registerService = async (data) => {
  const { name, email, password } = data;

  const existingUser = await findUserByEmail(email)

  if (existingUser)
    throw generateError(`Email ${email} telah digunakan, silahkan gunakan email lainnya`, 401)

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

  const existingUser = await findUserByEmail(email);

  if (!existingUser)
    throw generateError("User tidak ditemukan", 404)

  const isValidPassword = bcrypt.compareSync(password, existingUser.password)

  if (!isValidPassword)
    throw generateError("Email / password salah", 401)

  const token = generateJwtToken(generateJwtData(null, existingUser));

  return generateJwtData(token, existingUser)
};
