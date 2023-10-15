import { useRecoilValue } from "recoil";
import { LiveUser } from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import Body from "./Body";
import Right from "./Right";
import { useEffect, useState } from "react";
import { GET_SONGS_BY_IDS } from "../graphql/query";
import { useQuery } from "@apollo/client";

const Dashboard = () => {
  const liveUser = useRecoilValue(LiveUser);
  const [recentlyPlayed, setRecentTracks] = useState<Track[]>([]);
  
  if(liveUser) {
    const { data } = useQuery(GET_SONGS_BY_IDS, {
      variables: {
        idList: liveUser.historyTracksId,
      }
    });

    useEffect(() => {
      if (data) {
        const userrecenttracks = data.trackFindManyById ? data.trackFindManyById : [];
        setRecentTracks(userrecenttracks);
      }
    }, [data]);
  }
  return (
    <>
      <Body />
      <Right recentlyPlayed={recentlyPlayed} />
    </>
  );
};

export default Dashboard;
