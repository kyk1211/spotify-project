import { useSession } from 'next-auth/react';
import Image from 'next/image';
import gravartar from 'gravatar';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useEffect, useLayoutEffect, useState } from 'react';
import { shuffle } from 'lodash';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

export default function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState<string>('');

  useLayoutEffect(() => {
    setColor(shuffle(colors).pop() as string);
  }, []);

  return (
    <div className="flex-grow ">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-red-300 space-x-3 opacity-90 
          hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
        >
          <Image
            className="rounded-full"
            src={
              (session?.user?.image as string) ||
              'https:' + gravartar.url(session?.user?.email as string)
            }
            alt=""
            width={40}
            height={40}
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <h1>hi</h1>
        {/* <Image scr={} alt="" /> */}
      </section>
    </div>
  );
}
