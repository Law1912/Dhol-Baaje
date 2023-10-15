import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { checkSignature, generateNonce } from '@meshsdk/core';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS } from '../graphql/query';
import { SAVE_USER } from '../graphql/mutation';
import { useRecoilState } from 'recoil';
import { LiveUser } from '../atoms/playerAtom';
import { useRouter } from 'next/router';

const signup = () => {

  const currentDate = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(currentDate.getDate() + 7);
  const dateStr = sevenDaysLater.toISOString();
  
  const [username, setUsername] = useState('');
  const [activeUser, setActiveUser] = useRecoilState(LiveUser);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(
    'Waiting for Username'
  );
  const { wallet, connected, disconnect } = useWallet();
  const [validity, setValidity] = useState('Waiting for Wallet');

  const router = useRouter();
  if (activeUser) {
    router.push('/');
  }

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [Save_User] = useMutation(SAVE_USER);
  async function backendGetNonce(userAddress) {
    const nonce = generateNonce('Sign up to Dhol Baaje: ');
    return nonce;
  }

  async function backendVerifySignature(nonce, userAddress, signature) {
    const result = checkSignature(nonce, userAddress, signature);
    if (result) {
      console.log('success');
      const addr = await wallet.getChangeAddress();
      if (
        data &&
        data.userFindAll.some((user) => user.wallet.address === addr)
      ) {
        setValidity('Wallet already Registered');
        disconnect();
      } 
      else {
      Save_User({
        variables: {
          user: {
            username: username,
            wallet: {
              address: addr,
            },
            myTracksId: [],
            likedTracksId: [],
            historyTracksId: [],
            rewards: 0,
            likes: 0,
            subscriptionEndDate: dateStr,
          },
        },
      }).then(response => {
        const userId = response.data.userSave.id;
        console.log(userId);
        setActiveUser({
          id: username,
          username: username,
          wallet: {
            address: addr,
          },
          myTracksId: [],
          likedTracksId: [],
          historyTracksId: [],
          subscriptionEndDate: dateStr,
          rewards: 0,
          createdAt: response.data.userSave.createdAt,
          updatedAt: response.data.userSave.updatedAt,
        });
        setValidity('User Logged In');
      })
      .catch((error) => {
        alert('Sign Up failed.');
        console.error('Error:', error);
    });
  }
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
    const userAddress = (await wallet.getRewardAddresses())[0];
    const signature = await wallet.signData(userAddress, nonce);
    await backendVerifySignature(nonce, userAddress, signature);
  }

  const handleCheckUsernameAvailability = async () => {
    console.log(data);
    if (
      !data ||
      data.userFindAll.length === 0 ||
      !data.userFindAll.some((user) => user.username === username)
    ) {
      setIsUsernameAvailable('Getting Wallet');
    } else {
      setIsUsernameAvailable('Username Already Taken');
    }
  };

  console.log(isUsernameAvailable);
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
          {isUsernameAvailable === 'Waiting for Username' && (
            <div className="contents">
              <input
                type="text"
                onChange={handleUsernameChange}
                placeholder="Enter Your Username"
                className="w-9/12 p-2 mt-2 border border-gray-300 rounded-md text-center text-black"
              />
              <button
                onClick={handleCheckUsernameAvailability}
                className="mt-2 transparent border border-white text-white px-4 py-2 my-4 rounded hover:bg-green-700 text-center w-9/12"
              >
                Check Username Availability
              </button>
            </div>
          )}
          {isUsernameAvailable === 'Getting Wallet' &&
            ((validity === 'Waiting for Wallet' && (
              <>
                <div className="flex flex:row py-2">
                  Username <p className="text-green-500 px-2">{username}</p> is
                  available!!
                </div>
                <div className="flex flex:row py-2">
                  You will be subscribed for a free 7 day trial.
                </div>
                <CardanoWallet
                  label="Sign In with Cardano"
                  onConnected={() => frontendStartLoginProcess()}
                />
              </>
            )) ||
              (validity === 'User Logged In' && (
                <>
                  <CardanoWallet label="Sign In with Cardano" />
                  <div>Now you can access all pages!!</div>
                </>
              )) ||
              (validity === 'Wallet already Registered' && (
                <>
                  <CardanoWallet
                    label="Sign In with Cardano"
                    onConnected={() => frontendStartLoginProcess()}
                  />
                  <div>This wallet is already registered.</div>
                </>
              )))}
          {isUsernameAvailable === 'Username Already Taken' && (
            <>
              <div className="contents">
              <input
                type="text"
                onChange={handleUsernameChange}
                placeholder="Enter Your Username"
                className="w-9/12 p-2 mt-2 border border-gray-300 rounded-md text-center text-black"
              />
              <button
                onClick={handleCheckUsernameAvailability}
                className="mt-2 transparent border border-white text-white px-4 py-2 my-4 rounded hover:bg-green-700 text-center w-9/12"
              >
                Check Username Availability
              </button>
                <p className="text-red-500 flex flex:row py-2">
                  Username <p className="text-green-500 px-2">{username}</p> not
                  available. Please choose a different username.
                </p>
              </div>
            </>
          )}
        </div>
      </form>
    </section>
  );
};

export default signup;
