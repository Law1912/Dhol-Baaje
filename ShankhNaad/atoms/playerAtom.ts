import { atom, selector } from "recoil";
import { Track, User } from "../types/body.types";

export const playState = atom({
  key: "1",
  default: false,
});

export const playingTrackState = atom<Track>({
  key: "2",
  default: undefined,
});

export const currentPlaylistState = atom<Track[]>({
  key: "3",
  default: undefined,
});

export const LiveUser = atom<User>({
  key: "5",
  default: undefined,
});