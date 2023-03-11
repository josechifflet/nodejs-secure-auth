import session from 'express-session';

declare module 'express-session' {
  interface SessionData extends session.Session {
    userID: string;
    lastActive: string;
    sessionInfo: {
      device: string;
      ip: string;
    };
    signedIn: string;
  }
}

export {};
