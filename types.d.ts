
declare global {
  namespace Express {
    interface User {
      id: number;
      name: string;
      email?: string;
      role?: string;
      githubId?: string;
      provider?: string;
    }
  }
}

declare module 'passport' {
  interface Profile {
    id: number;
    displayName?: string;
    username?: string;
    emails?: { value: string }[];
    photos?: { value: string }[];
  }
}
  

declare module 'express-session' {
    interface SessionData {
      messages?: string[];
    }
  }
  

declare module 'express-session' {
    interface SessionData {
      passport: {
        user: string;
      };
    }
  
    interface Session {
      id: number;
      destroy: (callback: (err: any) => void) => void;
    }
  }
  
  declare module 'connect' {
    interface SessionStore {
      all: (callback: (err: any, sessions?: any[]) => void) => void;
      destroy: (sessionId: string, callback: (err?: any) => void) => void;
    }
  }
  