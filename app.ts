import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import path from "path";
import passportMiddleware from './middleware/passportMiddleware';
import { Request, Response, NextFunction } from 'express';

require('dotenv').config();

const port = process.env.PORT || 8000;
const app = express();

// Session store declaration
const sessionStore = new session.MemoryStore();

// Type extensions
declare module 'express-session' {
  interface SessionData {
    passport: {
      user?: number;
    };
    messages?: string[];
  }
}

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Message middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.messages = req.session.messages || [];
  req.session.messages = [];
  next();
});

// Routes import
import authRoute from "./routes/authRoute";
import indexRoute from "./routes/indexRoute";
import adminRoute from "./routes/adminRoute";

// Middleware ordering
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

// Passport initialization
passportMiddleware(app);

// Debugging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`User details: `, req.user);
  console.log("Session object:", req.session);
  next();
});

// Session store methods
export const sessionStoreMethods = {
  getAllSessions: (callback: (err: any, sessions?: any[]) => void) => {
    sessionStore.all(callback);
  },
  destroySession: (sessionId: string, callback: (err?: any) => void) => {
    sessionStore.destroy(sessionId, callback);
  }
};

// Routes
app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/", adminRoute);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

export { sessionStore };
