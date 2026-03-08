export const UserToDTO = (user) => {
  const { name, email, role } = user;
  return {
    name,
    email,
    role,
  };
};
