import jwt from "jsonwebtoken";

export const generateJwtToken = (data, expiresIn = '1d') => {
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
