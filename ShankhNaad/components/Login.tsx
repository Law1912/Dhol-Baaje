import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { checkSignature, generateNonce } from '@meshsdk/core';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../graphql/query';
import { useRecoilState } from "recoil";
import { LiveUser } from "../atoms/playerAtom";
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const { wallet, connected, disconnect } = useWallet();
  const [validity, setValidity] = useState('Waiting for Wallet');
  const { data } = useQuery(GET_ALL_USERS);
  const [activeUser, setActiveUser] = useRecoilState(LiveUser);
  const referer = router.query.referer as string | "/";
  const currentDate = new Date();

  if (activeUser && !referer) {
    router.push({
      pathname: '/',
    });
  }

  async function backendGetNonce(userAddress) {
    const nonce = generateNonce('Sign to login in to Dhol Baaje: ');
    return nonce;
  }
  
  async function backendVerifySignature(nonce, userAddress, signature) {
    const result = checkSignature(nonce, userAddress, signature);
    if (result) {
        console.log("success");
        const addr = await wallet.getChangeAddress();
        const liveUser = data.userFindAll.filter((user) =>{ return user && user.wallet.address === addr});
        
        if (!data || liveUser.length == 0){
          setValidity('Wallet not Registered');
          disconnect();
        }
        else
        {
          setActiveUser({
            id: liveUser[0].id,
            username: liveUser[0].username,
            wallet: {
              address: liveUser[0].wallet.address,
            },
            myTracksId: liveUser[0].myTracksId,
            likedTracksId: liveUser[0].likedTracksId,
            historyTracksId: liveUser[0].historyTracksId,
            subscriptionEndDate: liveUser[0].subscriptionEndDate,
            rewards: liveUser[0].rewards,
            createdAt: liveUser[0].createdAt,
            updatedAt: liveUser[0].updatedAt,
          });
          setValidity('User Logged In');
          if (referer && (new Date(liveUser.subscriptionEndDate) > currentDate)) {
            router.push(referer);
          }
          else if(referer){
            router.push({
              pathname: '/subscription',
              query: { referer },
            });
          }
        }
      }
      else {
          console.log("fail");
        }
      }

  async function frontendStartLoginProcess() {
    if (connected) {
          const userAddress = (await wallet.getRewardAddresses())[0];
          const nonce = await backendGetNonce(userAddress);
          await frontendSignMessage(nonce);
      }
  }
  
  async function frontendSignMessage(nonce) {
      try {
        const userAddress = (await wallet.getRewardAddresses())[0];
        const signature = await wallet.signData(userAddress, nonce);
        await backendVerifySignature(nonce, userAddress, signature);
      } catch (error) {
          console.log("failure");
      }
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
          {validity === 'Waiting for Wallet' && (<>
            <Link href="/signup"><button className="transparent hover:bg-green-700 border boder:white py-3 px-7 text-xl mb-5 rounded">New User? Sign Up!!</button></Link>
            <CardanoWallet label="Sign In with Cardano" onConnected={() => frontendStartLoginProcess()} />
          </>)}
          {validity === 'User Logged In' &&
          <>
            <CardanoWallet label="Sign In with Cardano" />
            <div>Now you can access all pages!!</div>
          </>}
          {validity === 'Wallet not Registered' &&
          <>
            <Link href="/signup"><button className="transparent hover:bg-green-700 border boder:white py-3 px-7 text-xl mb-5 rounded">New User? Sign Up!!</button></Link>
            <div  className="text-red-500">This wallet is not registered.</div>
            <CardanoWallet label="Sign In with Cardano" onConnected={() => frontendStartLoginProcess()} />
          </>}
        </div>
      </form>
    </section>
  );
};

export default Login;
