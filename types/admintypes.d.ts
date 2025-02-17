// types/admintypes.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    passport?: {
      user: number | string;
    };
    cookie: Cookie;
  }
}

interface Cookie {
  originalMaxAge: number;
  expires: Date | null;
  secure?: boolean;
  httpOnly: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  path: string;
}

interface CustomSessionStore {
  all: (callback: (err: any, obj?: { [sid: string]: Session }) => void) => void;
  destroy: (sid: string, callback: (err: any) => void) => void;
}

declare namespace Express {
  interface Request {
    sessionStore: CustomSessionStore;
  }
}
