import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  playingTrackState,
  playState,
} from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import TrackContext from "../hooks/trackContext";
import Heart from "./track/Heart";
import { SAVE_TRACK, LIKE_TRACK } from "../graphql/mutation"
import { useMutation, useQuery } from '@apollo/client';
import { LiveUser } from "../atoms/playerAtom";
import { useRouter } from "next/router";
import { GET_USER } from "../graphql/query";

interface TrackProps {
  track: Track;
  playlist: Track[];
}

function Track({ track, playlist }: TrackProps) {
  const [liveUser, setliveUser] = useRecoilState(LiveUser);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [play, setPlay] = useRecoilState<boolean>(playState);
  const playingTrack = useRecoilValue<Track>(playingTrackState);
  const { chooseTrack } = useContext(TrackContext);
  const [Save_Track] = useMutation(SAVE_TRACK);
  const [Like_Track] = useMutation(LIKE_TRACK);
  const router = useRouter();
  const { data } = useQuery(GET_USER, {
    variables: {
      username: track.username
    }
  });

  if(liveUser && liveUser.likedTracksId) {
    const index = liveUser.likedTracksId.findIndex(
      (el: String) => el === track.id
    );
    useEffect(() => {
      let liked = index !== -1 ? true : false;
      setHasLiked(liked);
    }, [index]);
  }
  const handlePlay = () => {
    if(!liveUser) {
      router.push({
        pathname: '/login',
      });
    }
    else {
      chooseTrack(track, playlist);
      if (!playingTrack) {
        setPlay(!play);
      }

      if (track.id === playingTrack?.id) {
        setPlay(!play);
      }
    }
  };

  function handleLike(track: Track) {
    if(!liveUser) {
      router.push({
        pathname: '/login',
      });
    }
    else {
      if (hasLiked == false || liveUser.likedTracksId.length === 0) {
        setliveUser({
          ...liveUser,
          likedTracksId: liveUser.likedTracksId !== null ? [...liveUser.likedTracksId, track.id] : [track.id],
        });
        Save_Track({
          variables: {
            track: {
              id: track.id,
              likes: track.likes + 1,
              album: track.album,
              createdAt: track.createdAt,
            }
          }
        });
        Like_Track({
          variables: {
            user: {
              id: liveUser.id,
              myTracksId: liveUser.myTracksId,
              likedTracksId: liveUser.likedTracksId !== null ? [...liveUser.likedTracksId, track.id] : [track.id],
              historyTracksId: liveUser.historyTracksId,
              createdAt: liveUser.createdAt,
              updatedAt: liveUser.updatedAt,
            }
          }
        });
        Like_Track({
          variables: {
            user: {
              id: data.userFindOneByUsername.id,
              myTracksId: data.userFindOneByUsername.myTracksId,
              likedTracksId: data.userFindOneByUsername.likedTracksId,
              historyTracksId: data.userFindOneByUsername.historyTracksId,
              likes: data.userFindOneByUsername.likes + 1,
              createdAt: data.userFindOneByUsername.createdAt,
              updatedAt: data.userFindOneByUsername.updatedAt,
            }
          }
        });
      } 
      else {
        Save_Track({
            variables: {
              track: {
                id: track.id,
                likes: track.likes - 1,
                album: track.album,
                createdAt: track.createdAt,
              }
            }
          });
        const newLiked = liveUser.likedTracksId.filter((el: String) => el !== track.id);
        setliveUser({
          ...liveUser,
          likedTracksId: newLiked,
        });
        Like_Track({
          variables: {
            user: {
              id: liveUser.id,
              myTracksId: liveUser.myTracksId,
              likedTracksId: newLiked,
              historyTracksId: liveUser.historyTracksId,
              createdAt: liveUser.createdAt,
              updatedAt: liveUser.updatedAt,
            }
          }
        });
        Like_Track({
          variables: {
            user: {
              id: data.userFindOneByUsername.id,
              myTracksId: data.userFindOneByUsername.myTracksId,
              likedTracksId: data.userFindOneByUsername.likedTracksId,
              historyTracksId: data.userFindOneByUsername.historyTracksId,
              likes: data.userFindOneByUsername.likes - 1,
              createdAt: data.userFindOneByUsername.createdAt,
              updatedAt: data.userFindOneByUsername.updatedAt,
            }
          }
        });      
      }

      const mapLikesToRewards = (likes) => {
        if(likes < 0) {
          return 0;
        }
        return 150 * likes/(1000000 + likes);
      };

      const monthBefore = new Date();
      monthBefore.setDate(monthBefore.getMonth() - 1);
      if(new Date(data.userFindOneByUsername.updatedAt) < monthBefore) {
        Like_Track({
          variables: {
            user: {
              id: data.userFindOneByUsername.id,
              myTracksId: data.userFindOneByUsername.myTracksId,
              likedTracksId: data.userFindOneByUsername.likedTracksId,
              historyTracksId: data.userFindOneByUsername.historyTracksId,
              createdAt: data.userFindOneByUsername.createdAt,
              rewards: data.userFindOneByUsername.rewards + mapLikesToRewards(data.userFindOneByUsername.likes),
              likes: 0,
            }
          }
        });
      }
    }
  }

  return (
    <div className={`flex items-center justify-between md:space-x-20 hover:bg-white/10 py-2 px-2 sm:px-4 rounded-lg group transition ease-out ${track.id === playingTrack?.id && 'bg-white/10'}`}>
      <div className="flex items-center gap-2 ">
        <div className="relative w-8 h-8 sm:w-12 sm:h-12 align-center">
          <img
            src={track.image}
            alt=""
            className="rounded-xl object-contain"
          />
        </div>

        <div>
          <h4 className="text-white text-[10px] sm:text-sm font-semibold truncate md:w-56 sm:w-[380px]">
            {track.title.substring(0, 20)}
          </h4>
          <p className="text-[rgb(179,179,179)] text-[10px] font-semibold group-hover:text-white">
            {(track?.subtitle || "").replace("-", " ") || ""}
          </p>
        </div>
      </div>

      <div className="lg:ml-auto flex items-center md:space-x-2.5">
        <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
          <Heart handleLike={handleLike} hasLiked={hasLiked} track={track} />
          {track.id === playingTrack?.id && play ? (
            <>
              <div
                className="h-10 w-10 rounded-full border border-[#15883e] flex items-center justify-center absolute -right-0.5 bg-[#15883e] icon hover:scale-110"
                onClick={handlePlay}
              >
                <BsFillPauseFill className="text-white text-xl" />
              </div>
            </>
          ) : (
            <>
              <div
                className="h-10 w-10 rounded-full border border-white/60 flex items-center justify-center absolute -right-0.5 hover:bg-[#15883e] hover:border-[#15883e] icon hover:scale-110"
                onClick={handlePlay}
              >
                <BsFillPlayFill className="text-white text-xl ml-[1px]" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Track;
