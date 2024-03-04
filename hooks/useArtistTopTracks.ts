// Importing necessary modules and hooks
import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import spotify from "spotify";

// Interface for defining the Track object structure
export interface Track {
  id: string;
  name: string;
  image: string;
  duration_ms: number;
  uri: string;
  offset: number;
}

// Custom hook to fetch an artist's top tracks
export default function useArtistTopTracks(artist_id: string) {
  // Retrieving access token from Redux store
  const token = useAppSelector((state) => state.auth.access_token);
  // State to store fetched top tracks
  const [tracks, setTracks] = useState<Track[]>();

  // Fetching artist's top tracks when component mounts or artist_id changes
  useEffect(() => {
    // Function to fetch artist's top tracks
    const fetchArtistTopTracks = async () => {
      // Fetching top tracks data from Spotify API
      const res = await spotify.getArtistTopTracks(artist_id);
      // Parsing and formatting fetched tracks data
      const totalTopTracks: Track[] = res.tracks.map((track: any) => ({
        id: track.id,
        name: track.name,
        image: track.album.images[0].url,
        duration_ms: track.duration_ms,
        uri: track.album.uri,
        offset: track.track_number,
      }));
      // Setting the fetched tracks to the state
      setTracks(totalTopTracks);
    };
    // Checking if artist_id is provided before fetching data
    if (artist_id) {
      fetchArtistTopTracks();
    }
  }, [token, artist_id]); // Dependency array includes token and artist_id

  return tracks; // Returning the fetched tracks
}
