// Importing necessary hooks and modules
import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import spotify from "spotify";

// Defining interfaces for Artist, Track, and Album
interface Artist {
  id: string;
  name: string;
}

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  artists: Array<Artist>;
}

interface Album {
  artists: Array<Artist>;
  id: string;
  image: string;
  name: string;
  tracks: Array<Track>;
}

// Custom hook to fetch album data
export default function useAlbum(album_id: string) {
  // Retrieving access token using custom hook
  const token = useAppSelector((state) => state.auth.access_token);
  // State to hold album data
  const [album, setAlbum] = useState<Album>();

  // Fetching album data when album_id changes
  useEffect(() => {
    console.log(album_id);
    const fetchAAlbum = async () => {
      // Checking if access token is available
      if (spotify.access_token) {
        // Fetching album data from Spotify API
        const res = await spotify.getAAlbum(album_id);
        // Creating an album object from the fetched data
        let alb: Album = {} as Album;
        alb.artists = res.artists.map((artist: Artist) => ({
          id: artist.id,
          name: artist.name,
        }));
        alb.id = res.id;
        alb.image = res.images[0].url;
        alb.name = res.name;
        alb.tracks = res.tracks.items.map((track: Track) => ({
          id: track.id,
          name: track.name,
          duration_ms: track.duration_ms,
          artists: track.artists.map((artist: Artist) => ({
            id: artist.id,
            name: artist.name,
          })),
        }));
        // Setting the album state with the fetched data
        setAlbum(alb);
      }
    };
    // Fetching album data if album_id is available
    if (album_id) {
      fetchAAlbum();
    }
  }, [album_id]);

  // Returning the album data
  return album;
}
