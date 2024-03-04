// Importing necessary modules and components
import Artist from "components/Main/Artist";
import { useRouter } from "next/router";

// ArtistPage component
export default function ArtistPage() {
  // Getting router instance
  const router = useRouter();
  // Extracting id from router query parameters
  const { id } = router.query as { id: string };
  // Rendering Artist component with id
  return <Artist  id={id} />;
}
