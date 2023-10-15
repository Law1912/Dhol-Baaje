import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { MusicNoteIcon } from "@heroicons/react/solid";
import { useWallet } from "@meshsdk/react";
import { LogoutIcon } from "@heroicons/react/outline";
import { LiveUser } from "../atoms/playerAtom";
import { useRecoilState } from "recoil";
import { Router, useRouter } from "next/router";

type SearchProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchQuery: (e: any) => void
};


function Search({ search, setSearch, searchQuery}: SearchProps) {
  const { connected, disconnect } = useWallet();
  const handleSubmit = (e :any) => {
    e.preventDefault();
  }

  const [activeUser, setActiveUser] = useRecoilState(LiveUser);

  const router = useRouter();
  const handleLogOut = () => {
    router.reload();
  }

  return (
    <div className="flex gap-2 mr-2">
      <div className="w-5/6 lg:max-w-[1150px] bg-[#1A1A1A] rounded-full overflow-hidden border-2 border-[#333333] p-1.5 px-5 flex items-center md:ml-2">
        <div className="h-4 w-4 rounded-full border-2 flex-shrink-0 animate-pulse mr-1" />
        <form className="w-full lg:max-w overflow-hidden flex items-center " onSubmit={handleSubmit}>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onChangeCapture={searchQuery}
            className="bg-[#1A1A1A] text-white border-none lg:w-full focus:ring-0 outline-none placeholder-[#FAFAFA] text-xs tracking-wider"
            placeholder="Search..."
          />
        </form>
      </div>
      {activeUser ? (
        <div  className="flex gap-2">
          <Link href="/profile" className="flex">
            <button className="bg-white/10 flex items-center border-2 border-[#262626] rounded-full h-12 py-3 px-2 text-sm">
              <MusicNoteIcon className="w-4 h-4 mr-1.5" aria-hidden="true" />
              Profile
            </button>
          </Link>

          <button className="bg-white/10 flex items-center border-2 border-[#262626] rounded-full h-12 py-3 px-2 text-sm" onClick={ handleLogOut }>
            <LogoutIcon className="w-4 h-4 mr-1.5" aria-hidden="true" />
            Logout
          </button>
        </div>
        ) : 
        (
          <div  className="flex gap-2">
            <Link href="/login" className="flex">
              <button className="bg-white/10 flex items-center border-2 border-[#262626] rounded-full h-12 py-3 px-4 text-sm">
                <MusicNoteIcon className="w-4 h-4 mr-1.5" aria-hidden="true" />
                Login
              </button>
            </Link>
          </div>
        )}
    </div>
  );
}

export default Search;
