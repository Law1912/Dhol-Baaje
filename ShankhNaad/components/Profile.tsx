import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LiveUser } from '../atoms/playerAtom';
import SongList from './SongList';
import { Track } from '../types/body.types';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SONGS_BY_IDS } from '../graphql/query';
import { SAVE_USER, SEND_TRANSACTION } from '../graphql/mutation';
import Link from 'next/link';
import { FaCoins } from 'react-icons/fa';

const Profile = () => {
  const [liveUser, setLiveUser] = useRecoilState(LiveUser);
  const [UserSongs, setUserSongs] = useState<Track[]>([]);
  const { loading, error, data } = useQuery(GET_SONGS_BY_IDS, {
    variables: {
      idList: liveUser.myTracksId,
    }
  });
  console.log(process.env.CARDANO_SPACED_MNEMONIC);
  console.log(process.env.CARDANO_WALLET_ADDRESS);
  const [send] = useMutation(SEND_TRANSACTION, {
    context: {
        headers: {
          'seed-phrase': process.env.CARDANO_SPACED_MNEMONIC
        }
    }
  });

  const [SaveUser] = useMutation(SAVE_USER);

  useEffect(() => {
    if (!loading && !error && data) {
      const updatedMusicData = data.trackFindManyById ? data.trackFindManyById : [];
      setUserSongs(updatedMusicData);
    }
  }, [loading, error, data]);

  const sendRewards = () => {
    const toSend = liveUser.rewards * 1000000;
    send({
      variables: {
        transfer: {
          walletAddress: process.env.CARDANO_WALLET_ADDRESS,
          recipients: {
            walletAddress: liveUser.wallet.address,
            asset: {
                name: "lovelace",
                amount: toSend
            }
          }
        }
      }
    });

    SaveUser({
      variables: {
        user: {
          id: liveUser.id,
          myTracksId: liveUser.myTracksId,
          likedTracksId: liveUser.likedTracksId,
          historyTracksId: liveUser.historyTracksId,
          rewards: 0,
          updatedAt: liveUser.updatedAt,
          createdAt: liveUser.createdAt,
        },
      },
    });

    setLiveUser({
      ...liveUser,
      rewards: 0
    });
    alert("your rewards have been sent!");
  }

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section className="sm:ml-24 w-full overflow-y-scroll scrollbarThin">
      <div className="flex w-full justify-between item-center bg-black p-2 fixed">
        <div className="text-xl text-green-500 font-bold">My Songs</div>
        <div className="flex items-center space-x-5 sm:mr-24">
          <Link href="/upload"><button className="transparent hover:bg-green-700 border boder:white py-2 px-4 mb-5 rounded">Upload Track</button></Link>
          <button
            className={`transparent flex flex:row hover:bg-green-700 border border-white py-2 px-4 mb-5 rounded ${isHovered ? 'hovered' : ''}`}
            onClick={() => {
              if (liveUser.rewards < 10) {
                alert('Accumulate more than 10 coins to collect reward');
              } 
              else {
                sendRewards();
              }
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          >
           {isHovered ? 'Accumulated' : null} {isHovered ? <FaCoins className="w-6 h-6 mx-2"/> : null} {isHovered ? liveUser.rewards : 'Collect Rewards'}
          </button>
        </div>
      </div>
      <div className="mt-16">
        {UserSongs.length > 0 ? (
          UserSongs.map((track) => (
            <SongList track={track} playlist={UserSongs} />
          ))
        ) : (
          <div className="text-white p-4">
            <p>You have not uploaded any songs.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
