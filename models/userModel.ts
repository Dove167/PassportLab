// const database = [
//   {
//     id: 1,
//     name: "Jimmy Smith",
//     email: "jimmy123@gmail.com",
//     password: "jimmy123!",
//     role: "admin",
//   },
//   {
//     id: 2,
//     name: "Johnny Doe",
//     email: "johnny123@gmail.com",
//     password: "johnny123!",
//     role: "user",
//   },
//   {
//     id: 3,
//     name: "Jonathan Chen",
//     email: "jonathan123@gmail.com",
//     password: "jonathan123!",
//     role: "user",
//   },
// ];

// const userModel = {

//   /* FIX ME (types) 😭 */
//   findOne: (email: any) => {
//     const user = database.find((user) => user.email === email);
//     if (user) {
//       return user;
//     }
//     throw new Error(`Couldn't find user with email: ${email}`);
//   },
//   /* FIX ME (types) 😭 */
//   findById: (id: any) => {
//     const user = database.find((user) => user.id === id);
//     if (user) {
//       return user;
//     }
//     throw new Error(`Couldn't find user with id: ${id}`);
//   },
// };

// export { database, userModel };

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string; //or you can use a union type e.g. 'admin' | 'user'
}

const database: User[] = [
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
  findOne: (email: string): User | null => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id: number): User | null => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

export { database, userModel };

