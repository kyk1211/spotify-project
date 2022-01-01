import { DefaultSession, Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    username?: string;
    user?: {
      accessToken?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
