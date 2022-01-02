import { DefaultSession, Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken?: string;
      refreshToken?: string;
      username?: string;
      accessToken?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    // [key: any]: any;
  }
}
