import { useSession } from 'next-auth/react';
import Image from 'next/image';
import gravartar from 'gravatar';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '@atoms/playlistAtom';
import useSpotify from '@hooks/useSpotify';
import Songs from './Songs';

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
  const spotifyApi = useSpotify();
  const [color, setColor] = useState<string>('');
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop() as string);
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log('err: ', err));
  }, [spotifyApi, playlistId, setPlaylist]);

  return (
    <div className="flex-grow ">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 
          hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
        >
          <Image
            className="rounded-full"
            src={
              (session?.user.image as string) ||
              'https:' + gravartar.url(session?.user?.email as string)
            }
            alt=""
            width={40}
            height={40}
          />
          <h2 className="font-semibold">{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        {playlist?.images && (
          <Image
            className="shadow-2xl"
            src={playlist?.images?.[0]?.url as string}
            alt=""
            height={176}
            width={176}
          />
        )}
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}
