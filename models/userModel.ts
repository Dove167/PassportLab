const database: Express.User[] = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
];

const userModel = {
  /**
   * Find a user by email.
   * @param email - The email to search for.
   * @returns The user if found.
   */
  findOne: (email: string): Express.User | undefined => {
    const user = database.find((user) => user.email === email);
    return user; // Return undefined if not found
  },

  /**
   * Find a user by ID.
   * @param id - The ID to search for.
   * @returns The user if found.
   */
  findById: (id: number): Express.User | undefined => {
    const user = database.find((user) => user.id === id);
    return user; // Return undefined if not found
  },

  /**
   * Create a new user and add it to the database.
   * @param user - The user to create.
   * @returns The created user.
   */
  create: (user: Express.User): Express.User => {
    console.log("Creating user:", user);
    database.push(user); // Add the user to the database
    return user;
  },
};

export { database, userModel };
