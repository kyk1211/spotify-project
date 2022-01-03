import { atom } from 'recoil';

export const playlistState = atom<SpotifyApi.SinglePlaylistResponse | null>({
  key: 'playlistState',
  default: null,
});

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '7Ghm7HSe5CKPLF5HDSnOoq',
});
