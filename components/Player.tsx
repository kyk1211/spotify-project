import { currentTrackIdState, isPlayingState } from '@atoms/songAtom';
import useSpotify from '@hooks/useSpotify';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  return (
    <div>
      <div>{/* <Image src="" alt="" /> */}</div>
    </div>
  );
}
