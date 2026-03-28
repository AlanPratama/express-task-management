import jwt from "jsonwebtoken";
import { ErrorUtil } from "./error.js";

export const generateJwtToken = (data, expiresIn = "1d") => {
  const token = jwt.sign(
    {
      data,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn,
    },
  );

  return token;
};

export const verifyToken = (token) => {
  return jwt.decode(token, process.env.JWT_SECRET_KEY);
};

export const getToken = (req) => {
  const authHeader = req.headers.authorization;

  ErrorUtil.checkUnAuthorized(!authHeader, "Token Required")

  const token = authHeader.split(" ")[1];

  return token;
};

export const getTokenAndBindToRequest = (req) => {
  const token = getToken(req)

  req.body.token = token

  return req.body
};
