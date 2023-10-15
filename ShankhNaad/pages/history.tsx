import Head from "next/head";
import { useRecoilValue } from "recoil";
import RecentlyPlayed from "../components/RecentlyPlayed";
import { Track } from "../types/body.types";
import PrivateRoute from "../PrivateRoute";
import { LiveUser } from "../atoms/playerAtom";
import { useQuery } from "@apollo/client";
import { GET_SONGS_BY_IDS } from "../graphql/query";
import { useEffect, useState } from "react";

function History() {
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
      <Head>
        <title>Dhol Baaje - History </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {recentlyPlayed.length > 0 ? (
        <div className="m-2 sm:ml-28 w-full h-screen">
          <h1 className="text-white mb-3">Recently Played Tracks</h1>
          <div>

            <div className="border-2 border-[#262626] rounded-2xl overflow-y-scroll w-full h-full max-h-[78vh] scrollbarThin">
              {recentlyPlayed.map((track, i) => (
                <RecentlyPlayed
                  track={track}
                  playlist={recentlyPlayed}
                  button={true}
                />
              ))}
            </div>
            
          </div>
          <div className="h-20" />
        </div>
      ) : (
        <div className="sm:ml-28 flex justify-center items-center w-screen sm:w-[calc(100vw-80px)]">
          <h1 className="text-center text-white">No Songs Played </h1>
        </div>
      )}
    </>
  );
}

export default PrivateRoute(History);