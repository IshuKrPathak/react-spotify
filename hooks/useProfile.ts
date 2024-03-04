// Importing necessary modules and hooks
import { useEffect, useState } from "react";
import { useAppSelector } from "."; 
import spotify from "spotify";

// Interface for user profile data
interface User {
  display_name: string;
  email: string;
  url: string;
  image: string;
  id: string;
}

// Custom hook to fetch user profile information
export default function useProfile() {
  // State variable to store user profile data
  const [user, setUser] = useState<User>();

  // Retrieving access token from Redux store
  const token = useAppSelector((state) => state.auth.access_token);

  // Effect hook to fetch user profile data
  useEffect(() => {
    // Function to fetch user profile asynchronously
    const fetchProfile = async () => {
      // Checking if Spotify access token is available
      if (spotify.access_token) {
        // Fetching user profile data from Spotify API
        const res = await spotify.getProfile();

        // Setting user profile data to state
        setUser({
          display_name: res.display_name,
          email: res.email,
          url: res.external_urls.spotify,
          image: res.images[0]?.url,
          id: res.id,
        });
      }
    };

    // Calling fetchProfile function
    fetchProfile();
  }, [token]); // Dependency array with token to trigger effect when token changes

  // Returning user profile data
  return user;
}
