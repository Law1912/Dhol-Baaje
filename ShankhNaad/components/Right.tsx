import { Track } from "../types/body.types";
import RecentlyPlayed from "./RecentlyPlayed";
import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/solid";

interface RightProps {
  recentlyPlayed: Track[];
}

function Right({ recentlyPlayed }: RightProps) {

  return (
    <section className="p-4 space-y-8 w-1/5 hidden md:block min-w-[280px]">

      {recentlyPlayed.length > 0 && (
        <div className="bg-[#0D0D0D] border-2 border-[#262626] p-4 rounded-xl space-y-4">
          <div className="flex items-center justify-between gap-5">
            <h4 className="text-white font-semibold text-sm whitespace-nowrap">
              Recently Played
            </h4>
            <ViewGridIcon className="text-[#686868] h-6" />
          </div>

          <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[100px] md:h-[580px] scrollbarThin">
            {[...recentlyPlayed].map((track) => (
              <RecentlyPlayed
                track={track}
                button={false}
                playlist={recentlyPlayed}
              />
            ))}
          </div>
          <Link href="/history">
            <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
              View All
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}

export default Right;
