import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { Track } from "../types/body.types";
import { useRecoilState, useRecoilValue } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";
import TrackContext from "../hooks/trackContext";
import { useContext, useState, useEffect } from "react";
import Heart from "./track/Heart";
import { useMutation, useQuery } from '@apollo/client';
import { LiveUser } from "../atoms/playerAtom";
import { SAVE_TRACK, LIKE_TRACK } from "../graphql/mutation"
import { useRouter } from "next/router";
import { GET_USER } from "../graphql/query";

interface PosterProps {
    track : Track
    playlist : Track[]
}

function Poster({ track, playlist }: PosterProps) {
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [play, setPlay] = useRecoilState<boolean>(playState);
  const playingTrack = useRecoilValue<Track>(playingTrackState);
  const {chooseTrack} = useContext(TrackContext)
  const [liveUser, setliveUser] = useRecoilState(LiveUser);
  const [Save_Track] = useMutation(SAVE_TRACK);
  const [Like_Track] = useMutation(LIKE_TRACK);
  const router = useRouter();
  const { data } = useQuery(GET_USER, {
    variables: {
        username: track.username,
    }
  });

  console.log(data);

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
    <div
      className="w-[90px] h-[142px] sm:w-[160px] sm:h-[200px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group"
        onClick={handlePlay}
    >
      <img
        src= {track.image}
        alt=""
        className="z-0 absolute inset-0 object-contain rounded-[50px] opacity-80 group-hover:opacity-100 p-2"
        width={3200}
        height={3200}
        draggable="false"
      />

      <div className="absolute bottom-4 inset-x-0 ml-1 flex items-center space-x-2">
        <div className="w-4 h-4 sm:h-10 sm:w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
          {track.id === playingTrack?.id && play ? (
            <BsFillPauseFill className="text-white text-xl" />
          ) : (
            <BsFillPlayFill className="text-white text-xl ml-[1px]" />
          )}
        </div>

        <div className="text-[10px] sm:text-[15px]">
          <h4 className="font-bold truncate w-40">{track.title}</h4>
          <h6 className="capitalize truncate">
            {track?.subtitle?.replace("-", " ") || ""}
          </h6>
        </div>
      </div>

      <div className=" hidden group-hover:block absolute top-4 right-4">
        <Heart handleLike={handleLike} hasLiked={hasLiked} track={track} />
      </div>
      
    </div>
  );
}

export default Poster;
