// Importing necessary modules and hooks
import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import spotify from "spotify";

// Defining the Artist interface
interface Artist {
  id: string;
  image: string;
  followers: number;
  name: string;
}

// Custom hook to fetch artist profile
export default function useArtist(artist_id: string) {
  // Retrieving access token from Redux store
  const token = useAppSelector((state) => state.auth.access_token);
  // State to store artist data
  const [artist, setArtist] = useState<Artist>();

  useEffect(() => {
    // Function to fetch artist profile from Spotify API
    const fetchArtistProfile = async () => {
      // Fetching artist profile data
      const res = await spotify.getArtistProfile(artist_id);
      // Setting artist data to state
      setArtist({
        id: res.id,
        name: res.name,
        followers: +res.followers.total, // Converting followers to number
        image: res.images[0].url, // Getting artist image URL
      });
    };
    // Fetch artist profile only if artist_id is provided
    if (artist_id) fetchArtistProfile();
  }, [token, artist_id]); // Dependency array including token and artist_id

  return artist; // Returning artist data
}
