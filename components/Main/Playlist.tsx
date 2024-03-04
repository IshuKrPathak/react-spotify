// Importing necessary modules and hooks
import usePlaylist from "hooks/usePlaylist";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "hooks";
import spotify from "spotify";
import { setOffset, setURI } from "redux/slices/player";
import Head from "next/head";

// Defining Props interface
interface Props {
  id: string;
}

// Playlist component
export default function Playlist({ id }: Props) {
  // Fetching playlist data
  let playlist = usePlaylist(id);
  // Retrieving device ID, track ID, and play state from Redux store
  const device_id = useAppSelector((state) => state.player.device_id);
  const dispatch = useAppDispatch();

  return (
    <div className="pb-10">
      {/* Setting dynamic page title */}
      <Head>
        <title>Playlist: {playlist?.name}</title>
      </Head>
      {/* Displaying playlist header */}
      <div className="w-full h-44 lg:h-52 xl:h-60 flex justify-start p-4 ml-4 text-white">
        <div className="h-full mr-8 w-1/7 flex justify-center items-center">
          <div className="w-full">
            {/* Displaying playlist image */}
            <Image
              layout="responsive"
              height="64"
              width="64"
              src={playlist?.image || "/images/test.jpeg"}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col justify-between my-4">
          <div className="text-sm">Playlist</div>
          <div>
            {/* Displaying playlist name and description */}
            <div className="text-3xl lg:text-4xl xl:text-5xl font-extrabold">
              {playlist?.name}
            </div>
            <div className="text-gray-300 text-sm mt-3">
              {playlist?.description}
            </div>
          </div>
        </div>
      </div>

      {/* Displaying playlist tracks */}
      <div className="text-gray-400 mx-8 text-sm">
        {/* Playlist header row */}
        <div className="w-full flex pr-8 py-4 border-b border-gray-500">
          <div className="w-7/12 lg:w-5/12 flex">
            <div className="w-1/7 text-center">#</div>
            <div>Playlist</div>
          </div>
          <div className="w-3/12 2xl:w-4/12">Album</div>
        </div>
        {/* Mapping playlist tracks */}
        {playlist?.tracks.map((track, index) => (
          <div
            key={track.id}
            className="w-full flex items-center pr-8 py-2 my-2 hover:bg-white hover:bg-opacity-10 rounded"
          >
            <div className="w-7/12 lg:w-5/12 flex items-center pr-8">
              {/* Displaying track number  */}

              <div className="w-1/7 text-center">{index + 1}</div>

              {/* Displaying track image, name, and artists */}
              <div className="w-6/7 flex">
                <div className="w-1/12">
                  <div className="w-full">
                    <Image
                      layout="responsive"
                      height="64"
                      width="64"
                      src={track.image}
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-11/12 pl-3">
                  <div className="text-white text-base whitespace-nowrap overflow-hidden overflow-ellipsis hover:underline cursor-pointer">
                    {track.name}
                  </div>
                  <div className="text-xs">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </div>
                </div>
              </div>
            </div>
            {/* Displaying album name and added date */}
            <div className="w-3/12 2xl:w-4/12">{track.album.name}</div>
          
          </div>
        ))}
      </div>
    </div>
  );
}
