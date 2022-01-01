import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/Spotify';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
    }),
    // ...add more providers here
  ],
});
