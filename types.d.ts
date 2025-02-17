declare namespace Express {
  interface User {
  id: number | string;
  name: string;
  email?: string | null;
  password: string | null;
  role: "user" | "admin";
  }
}