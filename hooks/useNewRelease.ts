// Importing necessary modules and hooks
import { useEffect, useState } from "react";
import { useAppSelector } from ".";
import spotify from "spotify";

// Interface for representing album data
export interface Album {
  id: string;
  href: string;
  duration: number;
  singer: {
    name: string;
    id: string;
    href: string;
  };
  name: string;
  image: string;
  uri: string;
}

// Custom hook to fetch user's top tracks
export default function useUserTopTracks() {
  // State to store new release tracks
  const [newRelease, setNewRelease] = useState<Album[]>([]);
  // Accessing authentication token from Redux store
  const token = useAppSelector((state) => state.auth.access_token);

  useEffect(() => {
    // Function to fetch recent tracks
    const fetchRecentTracks = async () => {
      if (token) {
        // Fetching new release tracks from Spotify API
        const res = await spotify.getNewReleaseTracks();
        // Array to store unique tracks
        let allTracks: Album[] = [];
        // Iterating over fetched tracks
        for (const track of res.albums.items) {
          // Extracting relevant track information
          const singleTrack: Album = {
            id: track.id,
            href: track.href,
            duration: track.duration_ms,
            name: track.name,
            image: track.images[0].url,
            singer: {
              name: track.artists[0].name,
              id: track.artists[0].id,
              href: track.artists[0].href,
            },
            uri: track.uri,
          };
          // Checking if the track already exists in the array
          const isExisting = allTracks.some((t) => t.id === singleTrack.id);
          // If track is not already present, add it to the array
          if (!isExisting) {
            allTracks.push(singleTrack);
          }
        }
        // Updating state with the new release tracks
        setNewRelease(allTracks);
      }
    };
    // Fetch recent tracks when the token changes
    fetchRecentTracks();
  }, [token]);

  return newRelease; // Returning the new release tracks
}
