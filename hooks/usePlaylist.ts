// Importing necessary modules and hooks
import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import spotify from "spotify";

// Defining interfaces for Artist, Album, Track, and Playlist
interface Artist {
  id: string;
  name: string;
}

interface Album {
  id: string;
  name: string;
}

interface Track {
  added_at: string;
  id: string;
  duration_ms: number;
  album: Album;
  name: string;
  artists: Artist[];
  image: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: Track[];
}

// Custom hook to fetch playlist data
export default function usePlaylist(playlist_id: string) {
  // Retrieving access token from Redux store
  const token = useAppSelector((state) => state.auth.access_token);
  // State to store playlist data
  const [playlist, setPlaylist] = useState<Playlist>();

  // Fetching playlist data on component mount or when playlist_id changes
  useEffect(() => {
    // Function to fetch a playlist
    const fetchAPlaylist = async () => {
      // Checking if access token is available
      if (spotify.access_token) {
        // Fetching playlist data from Spotify API
        const res = await spotify.getAPlaylist(playlist_id);
        // Creating a new playlist object
        let pll: Playlist = {} as Playlist;
        // Setting playlist properties
        pll.id = res.id;
        pll.name = res.name;
        pll.description = res.description;
        pll.image = res.images[0].url;
        // Mapping tracks data
        pll.tracks = res.tracks.items.map((track: any) => ({
          added_at: track.added_at,
          id: track.track.id,
          name: track.track.name,
          duration_ms: track.track.duration_ms,
          album: { id: track.track.album.id, name: track.track.album.name },
          artists: track.track.album.artists.map((artist: Artist) => ({
            id: artist.id,
            name: artist.name,
          })),
          image: track.track.album.images[0].url,
        }));
        // Updating playlist state with fetched data
        setPlaylist(pll);
      }
    };

    // Fetch playlist data only if playlist_id is available
    if (playlist_id) {
      fetchAPlaylist();
    }
  }, [token, playlist_id]); // Dependency array to ensure useEffect runs when token or playlist_id changes

  // Returning playlist data
  return playlist;
}
