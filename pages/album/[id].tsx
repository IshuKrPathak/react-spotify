// Importing the Album component and the useRouter hook from Next.js
import Album from "components/Main/Album";
import { useRouter } from "next/router";

// AlbumPage component definition
export default function AlbumPage() {
  // Accessing the router instance
  const router = useRouter();
  // Extracting the id parameter from the query object
  const { id } = router.query as { id: string };
  
  // Rendering the Album component with the extracted id parameter
  return <Album id={id} />;
}
