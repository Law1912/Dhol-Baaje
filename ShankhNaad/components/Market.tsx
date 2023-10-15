import React, { useState, useContext } from 'react';
import BuySell from './BuySell';
import { FaCoins } from 'react-icons/fa';
import { MusicDataContext } from "./MusicDataContext";

const Market = () => {
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');

  const handleTabChange = (newTab: 'buy' | 'sell') => {
    setTab(newTab);
  };
  const musicData = useContext(MusicDataContext);
  const musicDataCopy = [...musicData];
  const Tracks = musicDataCopy;

  return (
    <>
    <section className="sm:ml-24 w-full sm:w-[calc(100vw-120px)] overflow-y-scroll scrollbarThin">
      <div className="flex w-full justify-between item-center bg-black p-2 fixed">
        <div className="text-xl text-green-500 font-bold">Exchange Center</div>
        <div className="flex items-center bg-white/10 border-2 border-[#262626] rounded-full h-8 px-10 hover:scale-110 sm:mr-24">
          <FaCoins className="w-5 h-5 mr-2" aria-hidden="true" />
          0
        </div>
      </div>

      <div className="flex fixed w-full sm:w-[calc(100vw-100px)] mt-10 py-2 justify-center">
        <button
          className={`px-4 py-2 w-1/2 rounded ${tab === 'buy' ? 'bg-green-500' : 'bg-black border border-white'}`}
          onClick={() => handleTabChange('buy')}
        >
          Buy
        </button>
        <button
          className={`px-4 py-2 w-1/2 rounded  ${tab === 'sell' ? 'bg-green-500' : 'bg-black border border-white'}`}
          onClick={() => handleTabChange('sell')}
        >
          Sell
        </button>
      </div>

      <div className="mt-24">
      {Tracks.map((track, i) => (
        <>
          {tab === 'buy' && (

            <BuySell action='Buy' track={track} playlist={Tracks} />

          )}
          {tab === 'sell' && (
            <BuySell action='Sell' track={track} playlist={Tracks} />
          )}
        </>
        ))}
      </div>
    </section>
    </>
  );
};

export default Market;
