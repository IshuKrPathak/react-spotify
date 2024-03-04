// Importing necessary modules and hooks

import useArtist from "hooks/useArtist";
import useArtistTopTracks from "hooks/useArtistTopTracks";
import Image from "next/image";

import { msToTime } from "utils";
import Head from "next/head";

// Interface for component props
interface Props {
  id: string;
}

// Artist component definition
export default function Artist({ id }: Props) {
  // Retrieving artist profile and top tracks using custom hooks
  const profile = useArtist(id);
  const topTracks = useArtistTopTracks(id);

  return (
    <div className="px-10 pb-10">
      <Head>
        <title>{profile?.name}</title>
      </Head>
      <div className="h-72 text-gray-400">
        <div className="flex items-end h-full">
          <div className="h-full w-64">
            <Image
              layout="responsive"
              height="64"
              width="64"
              src={profile?.image || "/images/test.jpg"}
              alt=""
            />
          </div>
          <div className="ml-8 pt-6 pb-3 h-full flex flex-col justify-between">
            <div className="text-white text-xl">Artist</div>
            <div>
              <div className="text-5xl text-white mb-6 font-black">
                {profile?.name}
              </div>
              <div>{profile?.followers} Followers</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-white mt-10 mb-6 text-3xl font-bold">Songs</div>
      {/* Rendering top tracks */}
      {topTracks?.map((track, index) => (
        <div
          key={track.id}
          className="text-gray-400 w-8/12 hover:bg-white hover:bg-opacity-10 py-2 px-4 rounded"
        >
          <div className="flex justify-between w-full items-center">
            <div className="flex w-7/12 items-center">
              <div className="w-1/12 flex justify-center items-center">
                <div className="w-full flex justify-center items-center">
                  <div>{index + 1}</div>
                </div>
              </div>
              <div className="flex items-center h-10">
                <Image
                  layout="responsive"
                  height="64"
                  width="64"
                  src={track.image || "/images/test.jpeg"}
                  alt=""
                />
                {/* Rendering track name and handling click event to play the track */}
                <div className="ml-2 text-white hover:underline cursor-pointer">
                  <div>{track.name}</div>
                </div>
              </div>
            </div>
            <div>{msToTime(track.duration_ms)}</div>{" "}
            {/* Rendering track duration */}
          </div>
        </div>
      ))}
    </div>
  );
}
