// Importing necessary modules and types
import { Playlist } from "hooks/useFuturedPlaylists";
import { Album } from "hooks/useNewRelease";
import { RTrack } from "hooks/useRecentlyTracks";
import { createContext } from "react";

// Defining the shape of the context data
interface HomeContextData {
  recentlyTracks: RTrack[]; // Array of recently played tracks
  newRelease: Album[]; // Array of new album releases
  futuredPlaylists: Playlist[] | undefined; // Array of featured playlists, or undefined if not available
 
}

// Creating a context with the specified data structure
const HomeContext = createContext<HomeContextData>({} as HomeContextData);

// Exporting the HomeContext
export default HomeContext;
