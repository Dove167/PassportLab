import {userModel} from "../models/userModel";

//Define a User type (I assume userModel follows this structure)
interface User {
  id: string;
  email: string;
  password: string;
}

//Fix types
const getUserByEmailIdAndPassword = async (email: string, password: string): Promise<User | null> => {
  const user = await userModel.findOne({ email }) as User | null; // Assuming findOne takes an object
  return user && isUserValid(user, password) ? user : null;
};

const getUserById = async (id: string): Promise<User | null> => {
  return await userModel.findById(id) as User | null; // Ensure this returns a User or null
};

// Fix type of user
function isUserValid(user: User, password: string): boolean {
  return user.password === password;
}

export { getUserByEmailIdAndPassword, getUserById };
// const getUserByEmailIdAndPassword = (email: string, password: string): User | null => {
//   let user = userModel.findOne(email) as User | null;
//   if (user) {
//     if (isUserValid(user, password)) {
//       return user;
//     }
//   }
//   return null;
// };
// const getUserById = (id:any) => {
//   let user = userModel.findById(id);
//   if (user) {
//     return user;
//   }
//   return null;
// };

// function isUserValid(user: any, password: string) {
//   return user.password === password;
// }

// export {
//   getUserByEmailIdAndPassword,
//   getUserById,
// };
