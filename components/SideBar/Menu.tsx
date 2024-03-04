// Importing necessary modules and hooks
import Link from "next/link";
import { useRouter } from "next/router";

// Menu component
export default function Menu() {
  return (
    <div className="p-2">
      {/* Home link */}
      <Link href="/">
        <div className="flex justify-start items-center text-white py-3 px-4 rounded hover:text-green-500 hover:cursor-pointer">
          <div className="text-xl">
            {/* Home icon */}
            <svg width="1em" height="1em" viewBox="0 0 1200 1200">
              <path
                d="M600 0L56.645 422.323V1200h373.829V730.541h339.054V1200h373.828V422.323L600 0z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          {/* Home text */}
          <div className="text-sm ml-4 font-medium">Home</div>
        </div>
      </Link>

      {/* Search link */}
      <Link href="/search" scroll={false}>
        <div className="flex justify-start items-center text-white py-3 px-4 rounded hover:text-green-500 hover:cursor-pointer">
          <div className="text-xl">
            {/* Search icon */}
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path
                d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          {/* Search text */}
          <div className="text-sm ml-4 font-medium">Search</div>
        </div>
      </Link>

  

      {/* Popular link */}
      <Link href="/Market">
        <div className="flex justify-start items-center text-white py-3 px-4 rounded hover:text-green-500 hover:cursor-pointer">
          <div className="text-xl">
            {/* Popular icon */}
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path
                d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m7 14l.72-.66C15.3 14 17 12.46 17 10.57c0-1.54-1.21-2.75-2.75-2.75c-.87 0-1.7.41-2.25 1.05a3.007 3.007 0 0 0-2.25-1.05C8.21 7.82 7 9.03 7 10.57c0 1.89 1.7 3.43 4.28 5.77L12 17z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          {/* Popular text */}
          <div className="text-sm ml-4 font-medium">Popular</div>
        </div>
      </Link>

      {/* Country link */}
      <Link href="/country">
        <div className="flex justify-start items-center text-white py-3 px-4 rounded hover:text-green-500 hover:cursor-pointer">
          <div className="text-xl">
            {/* Country icon */}
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path
                d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          {/* Country text */}
          <div className="text-sm ml-4 font-medium">Country</div>
        </div>
      </Link>

      {/* Footer */}
      <div className="p-2">
        <div className="text-gray-500 my-3 mx-4 py-3 border-t border-gray-500 hover:cursor-pointer">
          {/* Footer text */}
          Made by Ishu Pathak
        </div>
      </div>
    </div>
  );
}
