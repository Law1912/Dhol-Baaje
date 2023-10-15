import MusicPlayer from "./musicplayer/index";
import { playingTrackState } from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import { useRecoilValue } from "recoil";
import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { DragDropContext } from "react-beautiful-dnd";
import TrackContext from "../hooks/trackContext";

const Layout = ({ children }: any) => {
  const playingTrack = useRecoilValue<Track>(playingTrackState);
  const { onDragEnd } = useContext(TrackContext);

  return (
    <>
      <Sidebar />
      <main className="flex min-h-screen min-w-full bg-black">
        <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>

        {playingTrack && (
          <div className="fixed bottom-14 sm:bottom-0 left-0 right-0 z-50">
            <MusicPlayer />
          </div>
        )}
      </main>
    </>
  );
};

export default Layout;
