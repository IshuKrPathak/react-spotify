// Importing necessary modules and hooks
import useBrowse from "hooks/useBrowse";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

// Browse component
export default function Browse() {
  // Fetching browse data using custom hook
  const browses = useBrowse();

  return (
    <div className="mt-8 px-6 pb-10">
      {/* Setting the page title */}
      <Head>
        <title>Search</title>
      </Head>
      {/* Grid layout for displaying browse items */}
      <div className="grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {/* Mapping through browse items and rendering them */}
        {browses?.map((browse) => (
          // Linking each browse item to its details page
          <Link key={browse.id} href={`/search/${browse.id}`}>
            <div className="browseContainer relative cursor-pointer">
              {/* Image container with hover effect */}
              <div className="w-full hover:scale-105 transition duration-500 ease-in-out">
                <Image
                  className="rounded"
                  layout="responsive"
                  height={64}
                  width={64}
                  src={browse.image || "/images/test.jpg"}
                ></Image>
              </div>
              {/* Displaying browse name */}
              <div className="absolute bottom-4 lg:bottom-6 xl:bottom-8 w-full px-4 flex justify-center text-white">
                <div className="browseName whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold text-base">
                  {browse.name}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
