// Importing necessary modules and hooks
import Header from "components/Header";
import HomeContext from "context";
import { useAppDispatch, useAppSelector } from "hooks";
import useFuturedPlaylists from "hooks/useFuturedPlaylists";
import useNewRelease from "hooks/useNewRelease";
import useRecentlyTracks from "hooks/useRecentlyTracks";
import { useEffect } from "react";
import { setToken } from "redux/slices/auth";
import spotify, { getToken, url_auth } from "spotify";

// Defining type for component props
type Props = {
  children?: JSX.Element | JSX.Element[];
};

// Main component
export default function Main({ children }: Props) {
  // Accessing dispatch function from Redux store
  const dispatch = useAppDispatch();
  // Retrieving token from Redux store
  const token = useAppSelector((state) => state.auth.access_token);
  // Fetching recently played tracks
  const recentlyTracks = useRecentlyTracks();
  // Fetching new releases
  const newRelease = useNewRelease();
  // Fetching featured playlists
  const futuredPlaylists = useFuturedPlaylists();

  // Effect hook to run once when component mounts
  useEffect(() => {
    // Checking if token is available
    if (!token) {
      // Retrieving token from Spotify API
      const _token = getToken();
      // If token is available
      if (_token.access_token) {
        // Dispatching action to set token in Redux store
        dispatch(setToken(_token));
        // Setting token for Spotify API requests
        spotify.setToken(_token.access_token);
      } else {
        // Redirecting to authentication URL
        window.location.href = url_auth;
      }
    }
  }, [token, dispatch]);

  return (
    // Providing context to child components
    <HomeContext.Provider
      value={{ recentlyTracks, newRelease, futuredPlaylists }}
    >
      {/* Main container */}
      <div className="w-main bg-gradient-to-t from-start to-end overflow-y-scroll no-scrollbar pb-10">
        {/* Header component */}
        <Header />
        {/* Main content */}
        <div className="w-full h-full max-w-screen-full">{children}</div>
      </div>
    </HomeContext.Provider>
  );
}
