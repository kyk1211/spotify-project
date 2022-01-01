import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import SpotifyProvider from 'next-auth/providers/Spotify';

export default function Login({
  providers,
}: {
  providers: typeof SpotifyProvider;
}) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center gap-5">
      <Image
        src="https://links.papareact.com/9xl"
        alt=""
        width={208}
        height={208}
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
