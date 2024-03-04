// Importing necessary modules, hooks, and interfaces
import { Playlist } from "hooks/useFuturedPlaylists";
import { RTrack } from "hooks/useRecentlyTracks";
import Link from "next/link";
import Image from "next/image";
import { Album } from "hooks/useNewRelease";

// Interface for the props of the Topic component
interface TopicProps {
  title: string;
  sub_title: string;
  tracks: Array<RTrack>;
  albums: Array<Album>;
  playlists: Array<Playlist> | undefined;
  type: string;
}

// Topic component
export default function Topic({
  title,
  sub_title,
  tracks,
  type,
  playlists,
  albums,
}: TopicProps) {

  function renderItems() {
    let items: JSX.Element[] | undefined = [];

    if (type === "playlist") {
      items = playlists?.map((item) => (
        <div
          key={item.id}
          className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded"
        >
          <div className="item w-full relative">
            <Link href={`/${type}/${item.id}`}>
              <div>
                <Image
                  layout="responsive"
                  height="64"
                  width="64"
                  src={item.image}
                  alt=""
                />
              </div>
            </Link>
            <div
              className="sub_item w-2/6 absolute bottom-0 right-0 mb-3 mr-3 invisible opacity-0"
              
            >
              <Image
                layout="responsive"
                height="64"
                width="64"
                src="/svgs/play.svg"
                alt=""
              />
            </div>
          </div>
          <div className="text-sm font-semibold mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
            <Link href={`/${type}/${item.id}`}>
              <div className="hover:underline cursor-pointer">{item.name}</div>
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-2 font-medium overflow-ellipsis overflow-hidden h-12">
            {item.description}
          </p>
        </div>
      ));
    } else if (type == "track") {
      items = tracks?.map((item) => (
        <div
          key={item.id}
          className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded"
        >
          <div className="item w-full relative">
            <div className="w-full">
              <Image
                layout="responsive"
                height="64"
                width="64"
                src={item.image}
                alt=""
              />
            </div>
            <div
              className="sub_item w-2/6 absolute bottom-0 right-0 mb-3 mr-3 invisible opacity-0"
        
            >
              <Image
                layout="responsive"
                height="64"
                width="64"
                src="/svgs/play.svg"
                alt=""
              />
            </div>
          </div>
          <div
            className="text-sm font-semibold mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis hover:underline cursor-pointer"
            
          >
            {item.name}
          </div>
          <Link href={`/artist/${item.singer.id}`}>
            <div className="text-xs text-gray-400 mt-2 font-medium cursor-pointer hover:underline">
              {item.singer.name}
            </div>
          </Link>
        </div>
      ));
    } else {
      items = albums?.map((item) => (
        <div
          key={item.id}
          className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded"
        >
          <div className="item w-full relative">
            <Link href={`/${type}/${item.id}`}>
              <div className="w-full">
                <Image
                  layout="responsive"
                  height="64"
                  width="64"
                  src={item.image}
                  alt=""
                />
              </div>
            </Link>
            <div
              className="sub_item w-2/6 absolute bottom-0 right-0 mb-3 mr-3 invisible opacity-0"
             
            >
              <Image
                layout="responsive"
                height="64"
                width="64"
                src="/svgs/play.svg"
                alt=""
              />
            </div>
          </div>
          <Link href={`/${type}/${item.id}`}>
            <div className="text-sm font-semibold mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis cursor-pointer hover:underline">
              {item.name}
            </div>
          </Link>
          <Link href={`/artist/${item.singer.id}`}>
            <div className="text-xs text-gray-400 mt-2 font-medium cursor-pointer hover:underline">
              {item.singer.name}
            </div>
          </Link>
        </div>
      ));
    }

    return items;
  }

  return (
    <div className="w-full px-8 text-white mt-6">
      {/* Rendering title and subtitle */}
      <div className="text-2xl font-bold hover:underline mb-2 ml-2">
        <span className="cursor-pointer">{title}</span>
      </div>
      <div className="mb-4 ml-2 text-sm text-gray-300">{sub_title}</div>

      {/* Rendering items */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 pb-10">
        {renderItems()}
      </div>
    </div>
  );
}
