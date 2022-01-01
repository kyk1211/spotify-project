import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/Spotify';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      //@ts-ignore
      clientId: process.env.NEXT_PUBLIC_CLIENT_PUBLIC_ID,
      //@ts-ignore
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
});
