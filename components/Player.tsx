import { currentTrackIdState, isPlayingState } from '@atoms/songAtom';
import { ReplyIcon, SwitchHorizontalIcon } from '@heroicons/react/outline';
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
} from '@heroicons/react/solid';
import useSongInfo from '@hooks/useSongInfo';
import useSpotify from '@hooks/useSpotify';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = useCallback(() => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('now: ', data.body?.item);
        setCurrentTrackId(data.body?.item?.id as string);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  }, [setCurrentTrackId, setIsPlaying, songInfo, spotifyApi]);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session, fetchCurrentSong]);

  return (
    <div
      className="text-white h-24 bg-gradient-to-b from-black to-gray-900 
    grid grid-cols-3 text-xs md:text-base px-2 md:px-8"
    >
      <div className="flex items-center space-x-4">
        <div>
          {songInfo && (
            <Image
              className="hidden md:inline"
              src={songInfo.album.images?.[0]?.url}
              alt=""
              width={40}
              height={40}
              layout="fixed"
            />
          )}
        </div>
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}

        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
    </div>
  );
}
