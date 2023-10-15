import Search from "./Search";
import { useEffect, useState, useContext } from "react";
import { Track as TrackType } from "../types/body.types";
import Poster from "./Poster";
import Track from "./Track";
import Link from "next/link";
// import { MusicDataContext } from "./MusicDataContext";
import { Genre } from "../types/body.types";
import { GET_ALL_SONGS } from "../graphql/query";
import { useQuery } from "@apollo/client";

const Body = () => {

  const [musicData, setMusicData] = useState<TrackType[]>([]);
  const [showHomePlaylist, setShowHomePlaylist] = useState<TrackType[]>([]);
  const { loading, error, data } = useQuery(GET_ALL_SONGS);
  

  useEffect(() => {
    if (!loading && !error && data) {
      const updatedMusicData = data.trackFindAll ? data.trackFindAll : [];
      setMusicData(updatedMusicData);
      const top20Songs = [...updatedMusicData].sort((a, b) => b.likes - a.likes);
      setShowHomePlaylist([...top20Songs].slice(0,20));
    }

  }, [loading, error, data]);


  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchresults] = useState<TrackType[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  
  const genres = Object.values(Genre);

  useEffect(() => {
    if (genres.includes(selectedGenre)) {
      const filteredMusicData = musicData.filter((track) => {
        return track.album && track.album.some((genre) => genre === selectedGenre);
      });
      setShowHomePlaylist(filteredMusicData);
    }
  }, [selectedGenre])

  const searchQuery = (e: any) => {
    const filteredResults = musicData.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase())
    );
    setSearchresults(filteredResults);
  }
  useEffect(() => {
    searchQuery(search);
  }, [search, setSearchresults]);

  return (
    <section className="bg-black w-screen mb-32 sm:mb-20 md:w-[calc(100vw-120px)] ml-2 sm:ml-24 py-4 space-y-8 md:mr-2.5 md:max-w-[79rem] lg:w-4/5">

      <Search search={search} setSearch={setSearch} searchQuery={searchQuery} />

      <div>
        <div className="flex flex-wrap gap-x-5 scrollbar-hide py-0 ml-2 w-full h-full">
          {search.length > 0 && searchResults.length === 0 ? (
            <div className="flex gap-x-8 md:relative ml-2 lg:ml-4">No matching results found...</div>
          ) : search.length === 0 ? (
            showHomePlaylist
              .slice(0, 6)
              .map((track, i) => (
                <Poster key={i} track={track} playlist={showHomePlaylist} />
              ))
          ) : (
            searchResults
            .slice(0, 20)
            .map((track: any, i: number) => (
              <Poster key={i} track={track} playlist={searchResults} />
            ))
          )}
        </div>
      </div>

      <div className="flex gap-x-8 md:relative ml-2 lg:ml-6">
        {/* Genres */}
        <div className="hidden xlg:inline max-w-[270px]">
          <h2 className="text-white font-bold mb-3">Genres</h2>
          <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
            {Object.values(genres).map((genre, i) => (
              <div
                key={i}
                className={`genre ${genre === selectedGenre && "text-green-500"
                  }`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </div>
            ))}
          </div>

          <Link href={'/explore'}>
            <button className="whitespace-nowrap text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out"
            >
              All Genres
            </button>
          </Link>
        </div>

        <div className="pr-2 w-full">
          <h2 className="text-white font-bold mb-3">
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>

          <div className="border-2 border-[#262626] rounded-2xl w-full overflow-y-scroll scrollbarThin h-[380px]">
            {showHomePlaylist
              .slice(4, showHomePlaylist.length)
              .map((track, i) => (
                <Track key={i} track={track} playlist={showHomePlaylist} />
              ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Body;
