import userModel from "./user.model.js";

export const createUser = (user) => userModel.create(user)

export const updateUser = (user) => userModel.updateOne(user.id, user)

export const findUserByEmail = (email) => userModel.findOne({ email })

export const findUserById = (_id) => userModel.findOne({ _id })

export const getAllUser = () => userModel.find()