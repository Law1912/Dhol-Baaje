import { useRecoilValue } from "recoil";
import { Track as TrackType } from "../types/body.types";
import Head from "next/head";
import { useEffect, useState } from "react";
import Track from "../components/Track";
import { GET_SONGS_BY_IDS } from "../graphql/query";
import { useQuery } from '@apollo/client';
import { LiveUser } from "../atoms/playerAtom";
import PrivateRoute from "../PrivateRoute";


const Playlist = () => {

  const liveUser = useRecoilValue(LiveUser);
  const [likedTracks, setLikedTracks] = useState<Track[]>([]);

  if(liveUser) {
    const { data } = useQuery(GET_SONGS_BY_IDS, {
      variables: {
          idList: liveUser.likedTracksId,
      }
    });

    useEffect(() => {
      if (data) {
        const userlikedtracks = data.trackFindManyById ? data.trackFindManyById : [];
        setLikedTracks(userlikedtracks);
      }
    }, [data]);
  }

  return (
    <div className="md:w-[calc(100vw-120px)] w-full">

      <Head>
        <title>Dhol Baaje - Liked Playlist</title>
      </Head>

      <section className="sm:ml-24 p-2 w-full">
        <div className="flex flex-col w-full">

          {likedTracks.length > 0 ? (
            <div>
              <h1 className="text-xl text-green-500 font-bold mx-auto w-full bg-black z-10 top-0 p-2 fixed">Liked Playlist </h1>

              <div className="mt-10 overflow-y-scroll scrollbarThin ">
                <div className="flex flex-col gap-3 p-1 h-[78vh] min-w-max border-2 border-[#262626] rounded-2xl overflow-y-scroll scrollbarThin">
                  {likedTracks.map((track: TrackType) => (
                    <Track track={track} playlist={likedTracks} />
                  ))}
                </div>
              </div>

            </div>
          ): (
            <div className="flex items-center justify-center">
              <h1 className="text-white">You have not liked any Track.</h1>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default PrivateRoute(Playlist);
