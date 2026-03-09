export const UserToDTO = (user) => {
  const { name, email, role, createdAt, updatedAt } = user;
  return {
    name,
    email,
    role,
    createdAt,
    updatedAt
  };
};
