import { atom } from 'recoil';

export const currentTrackIdState = atom<string>({
  key: 'currentTrackIdState',
  default: '',
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});
