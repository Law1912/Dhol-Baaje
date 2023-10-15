import { AiFillHeart } from "react-icons/ai";
import { useRouter } from 'next/router';
import { useWallet } from "@meshsdk/react";
import { Track } from "../../types/body.types";

interface HeartProps {
  hasLiked: boolean;
  handleLike: (track: Track) => void;
  track: Track;
}

const Heart = ({ hasLiked, handleLike, track }: HeartProps) => {
  const router = useRouter();
  const { connected } = useWallet();
  
  const handleLikeButton = (e: any) => {
    e.stopPropagation();
    if(!connected){
      router.push('/login');
    }
    else{
      handleLike(track);
    }
  }
  return (
    <>
      <AiFillHeart
        className={`text-xl ml-3 icon ${
          hasLiked ? "text-[#1ED760]" : "text-[#868686]"
        }`}
        onClick={(e)=>{handleLikeButton(e)}}
      />
    </>
  );
};

export default Heart;
