export const UserToDTO = (user) => {
  const { name, email, role, photoUrl, photoPublicId, createdAt, updatedAt } = user;
  return {
    name,
    email,
    role,
    photoUrl,
    photoPublicId,
    createdAt,
    updatedAt
  };
};
