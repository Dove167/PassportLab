import { userModel } from "../models/userModel";

// Fetch user by email and validate password
const getUserByEmailIdAndPassword = (email: string, password: string) => {
  const user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

// Fetch user by ID
const getUserById = (id: any) => {
  const user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

// Fetch user by email only (used in localStrategy.ts)
const getUserByIdOrEmail = (email: string) => {
  const user = userModel.findOne(email);
  return user || null; // Return the user if found, otherwise return null
};

// Helper function to validate the password
function isUserValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByIdOrEmail, // Export the new function
};
