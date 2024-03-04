// Importing necessary modules and hooks

import useAlbum from "hooks/useAlbum";
import Image from "next/image";
import { msToTime } from "utils";
import Head from "next/head";

// Interface for Props
interface Props {
  id: string;
}

// Album component
export default function Album({ id }: Props) {
  // Fetching album data using custom hook
  let album = useAlbum(id);
  return (
    <div className="pb-10">
      <Head>
        <title>Album: {album?.name}</title>
      </Head>
      {/* Album Information */}
      <div className="w-full h-52 lg:h-60 2xl:h-72 flex justify-start p-4 ml-4 text-white">
        <div className="w-1/6 mr-8 flex justify-center items-center">
          <div className="w-full">
            <Image
              layout="responsive"
              height="64"
              width="64"
              src={album?.image || "/images/test.jpg"}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col justify-between my-8">
          <div className="text-sm">Album</div>
          <div className="text-3xl lg:text-4xl xl:text-5xl font-extrabold">
            {album?.name}
          </div>
          <div>
            <div className="flex text-sm">
              <div className="font-bold">
                {/* Displaying artists */}
                {album?.artists.map((artist) => artist.name).join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracks */}
      <div className="text-gray-400 mx-8 text-sm">
        {/* Track headers */}
        <div className="w-full flex pr-8 py-4 border-b border-gray-500">
          <div className="w-5/12 flex">
            <div className="w-1/7 text-center">#</div>
            <div>Album Name</div>
          </div>
          <div className="w-7/12 flex justify-end">
            <div>Duration</div>
          </div>
        </div>
        {/* Track details */}
        {album?.tracks.map((track, index) => (
          <div
            key={track.id}
            className="w-full flex items-center pr-8 py-2 my-2 hover:bg-white hover:bg-opacity-10 rounded"
          >
            <div className="w-5/12 flex items-center">
              {/* displaying serial number */}
              <div className="w-1/7 text-center">{index + 1}</div>
           
              <div className="w-6/7">
                {/* Clickable track name */}
                <div className="text-white text-base cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {track.name}
                </div>
                {/* Displaying track artists */}
                <div className="text-xs">
                  {track.artists?.map((artist) => artist.name).join(", ")}
                </div>
              </div>
            </div>
            {/* Displaying track duration */}
            <div className="w-7/12 text-right">
              {msToTime(track.duration_ms)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
