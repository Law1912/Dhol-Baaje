import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilValue } from "recoil";
import { LiveUser } from "../atoms/playerAtom";
import { useRouter } from 'next/router';
import { useWallet } from '@meshsdk/react';
import { SAVE_USER, SUBMIT_TRANSACTION } from '../graphql/mutation';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TRANSFER_CBOR } from '../graphql/query';

const Subscription = () => {
  const router = useRouter();
  const referer = router.query.referer ? router.query.referer as string : "/";
  const liveUser = useRecoilValue(LiveUser);
  const currentDate = new Date();
  const [cbor, setCbor] = useState('');

  if ( typeof window !== 'undefined' && (!liveUser || (liveUser.subscriptionEndDate && (new Date(liveUser.subscriptionEndDate) > currentDate)))) {
    router.push({
      pathname: referer,
    });
  }
  console.log(liveUser);

    const { data } = useQuery(GET_TRANSFER_CBOR,{
      variables: {
        transfer: {
          walletAddress: liveUser?.wallet.address,
          recipients: {
            walletAddress: process.env.CARDANO_WALLET_ADDRESS,
            asset: {
              name: "lovelace",
              amount: 10000000
            }
          }
        }
      }
    });
    
    useEffect(() => {
      if (data && data.transferCbor) {
        setCbor(data.transferCbor);
      }
    }, [data]);

  const [submit] = useMutation(SUBMIT_TRANSACTION);
  const [Save_User] = useMutation(SAVE_USER);
  const oneMonthLater = new Date();
  oneMonthLater.setMonth(currentDate.getMonth() + 1);
  const dateStr = oneMonthLater.toISOString();

  const { wallet } = useWallet();
  
  const handleSubscription = async (e: any) => {
    e.preventDefault();

    const signedTx = await wallet.signTx(cbor);
    
    submit({
      variables: {
        cbor: signedTx,
      }
    });

    Save_User({
      variables: {
        user: {
          id: liveUser.id,
          myTracksId: liveUser.myTracksId,
          likedTracksId: liveUser.likedTracksId,
          historyTracksId: liveUser.historyTracksId,
          subscriptionEndDate: dateStr,
          updatedAt: liveUser.updatedAt,
          createdAt: liveUser.createdAt,
        },
      },
    });

    router.push({
      pathname: referer
    });
    
  }
  
  return (
    <section className="w-screen mb-32 sm:mb-20 md:w-[calc(100vw-120px)] ml-2 sm:ml-24 py-4 space-y-8 md:mr-2.5 md:max-w-[79rem] flex sm:justify-center sm:items-center h-screen">
      <form className="w-full p-4 bg-black rounded-md shadow-lg flex justify-center items-center h-screen">
        <div className="w-full sm:w-1/4 md:w-5/12 transform -translate-y-11 flex flex-col items-center">
          <Image
            src="/../public/logo.png"
            alt=""
            className="w-full object-contain opacity-100 group-hover:scale-110 p-2"
            width={1000}
            height={1000}
            draggable="false"
          />
          <button onClick={handleSubscription} className="border border-white transparent rounded hover:bg-red-500 mt-4 p-2 py-3 hover:text-red">
            Subscribe Now : Only 100 Ada a month!!
          </button>
        </div>
      </form>
    </section>
  );
};

export default Subscription;
