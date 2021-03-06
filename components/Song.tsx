import { currentTrackIdState, isPlayingState } from '@atoms/songAtom';
import useSpotify from '@hooks/useSpotify';
import { millisToMinutesAndSeconds } from '@lib/time';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

interface Props {
  order: number;
  track: SpotifyApi.PlaylistTrackObject;
}

export default function Song({ order, track }: Props) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = async () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div
      className="grid grid-cols-[16px_4fr_2fr_minmax(120px,_1fr)] gap-4 text-gray-500 py-4 px-5 
    hover:bg-gray-900 rounded-md cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center">
        <div className="relative items-center min-h-[16px] min-w-[16px]">
          <span className="absolute top-[-4px] tabular-nums right-[0.25em]">
            {order + 1}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <Image
            src={track.track.album.images[0].url}
            alt=""
            width={40}
            height={40}
            layout="fixed"
          />
        </div>
        <div>
          <p className="w-36 lg:w-64 text-white truncate">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}
