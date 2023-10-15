import { createContext, ReactNode } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import {
  currentPlaylistState,
  LiveUser,
  playingTrackState,
  playState,
} from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import { SAVE_TRACK, LIKE_TRACK } from "../graphql/mutation"
import { useMutation } from '@apollo/client';

type chooseTrack = (track: Track, playlist: Track[]) => void;

type ReorderProps = (
  list: Track[],
  startIndex: number,
  endIndex: number
) => Track[];

type ITrackContext = {
  chooseTrack: chooseTrack;
  onDragEnd: (result: DropResult) => void;
};

const TrackContext = createContext<ITrackContext>(null as any);

export const TrackProvider = ({ children }: { children: ReactNode }) => {

  
  const [play, setPlay] = useRecoilState(playState);
  const [liveUser, setliveUser] = useRecoilState(LiveUser);
  const [currentPlaylist, setCurrentPlaylist] = useRecoilState(currentPlaylistState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [Save_Track] = useMutation(SAVE_TRACK);
  const [Like_Track] = useMutation(LIKE_TRACK);


  const chooseTrack: chooseTrack = (track, playlist) => {
    setCurrentPlaylist(playlist);
    if(!playingTrack || playingTrack.id !== track.id){
      Save_Track({
        variables: {
          track: {
            id: track.id,
            n_listens: track.n_listens + 1,
            album: track.album,
            createdAt: track.createdAt,
          }
        }
      });
      const newList = liveUser.historyTracksId ? liveUser.historyTracksId.filter((el: String) => el !== track.id) : [];
      const newHistory = liveUser.historyTracksId ? [track.id, ...newList] : [track.id];
      setliveUser({
        ...liveUser,
        historyTracksId: newHistory,
      });
      Like_Track({
        variables: {
          user: {
            id: liveUser.id,
            myTracksId: liveUser.myTracksId,
            likedTracksId: liveUser.likedTracksId,
            historyTracksId: newHistory,
            createdAt: liveUser.createdAt,
            updatedAt: liveUser.updatedAt,
          }
        }
      });
    }
    setPlayingTrack(track);
    if (!play) setPlay(!play);
  };

  const reorder: ReorderProps = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    const startIndex = source.index;
    const endIndex = destination.index;

    const newList = reorder(currentPlaylist, startIndex, endIndex);

    setCurrentPlaylist(newList);
  };

  return (
    <TrackContext.Provider
      value={{
        chooseTrack,
        onDragEnd,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export default TrackContext;
