import Center from '@components/Center';
import Sidebar from '@components/Sidebar';
import { getSession } from 'next-auth/react';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      {/* <div>{player}</div> */}
    </div>
  );
}

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
}
