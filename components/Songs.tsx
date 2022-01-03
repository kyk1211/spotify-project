import { playlistState } from '@atoms/playlistAtom';
import { useRecoilValue } from 'recoil';
import Song from './Song';

export default function Songs() {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlist?.tracks.items.map((track, idx) => (
        <Song key={idx} track={track} order={idx} />
      ))}
    </div>
  );
}
