// Importing necessary modules and hooks
import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import spotify from "spotify";

// Interface for Playlist
export interface Playlist {
  tracks: any;
  id: string;
  name: string;
  description: string;
  image: string;
  uri: string;
}

// Custom hook to fetch featured playlists
export default function useFuturedPlaylists() {
  // Retrieving access token from Redux store
  const token = useAppSelector((state) => state.auth.access_token);
  // State to store fetched playlists
  const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>();

  useEffect(() => {
    // Function to fetch featured playlists
    const fetchFeaturedPlaylists = async () => {
      // Checking if the Spotify access token is available
      if (spotify.access_token) {
        // Fetching featured playlists from Spotify API
        const res = await spotify.getFuturedPlaylists();
        // Array to store fetched playlists
        let playlists: Playlist[] = [];
        // Iterating through fetched playlists and populating the playlists array
        for (const playlist of res.playlists.items) {
          let playlistObj: Playlist = {
            id: playlist.id,
            name: playlist.name,
            description: playlist.description,
            image: playlist.images[0].url,
            uri: playlist.uri,
            tracks: undefined
          };
          // Adding the playlist object to the playlists array
          playlists.push(playlistObj);
        }
        // Updating the state with fetched playlists
        setFeaturedPlaylists(playlists);
      }
    };
    // Fetching featured playlists when the token changes
    fetchFeaturedPlaylists();
  }, [token]);

  // Returning the fetched featured playlists
  return featuredPlaylists;
}
