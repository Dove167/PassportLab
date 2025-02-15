import { userModel, User } from "../models/userModel";

const getUserByEmailIdAndPassword = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await userModel.findOne(email);
  return user && isUserValid(user, password) ? user : null;
};

const getUserById = async (id: number): Promise<User | null> => {
  return await userModel.findById(id);
};

function isUserValid(user: User, password: string): boolean {
  return user.password === password;
}

export { getUserByEmailIdAndPassword, getUserById, isUserValid };
