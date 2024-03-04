// Importing necessary modules and components
import Playlist from "components/Main/Playlist";
import { useRouter } from "next/router";

// Playlist page component
export default function PlaylistPage() {
  // Getting router instance
  const router = useRouter();
  // Extracting playlist ID from router query parameters
  const { id } = router.query as { id: string };
  
  // Rendering Playlist component with the extracted playlist ID
  return <Playlist id={id} />;
}
