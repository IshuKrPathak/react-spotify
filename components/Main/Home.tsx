// Importing necessary modules and components
import Topic from "./Topic";
import React, { useContext } from "react";
import HomeContext from "context";
import Head from "next/head";
import PaginationOutlined from "components/Pagination";

// Home component
export default function Home() {
  // Accessing context from HomeContext
  const context = useContext(HomeContext);

  return (
    <React.Fragment>
      {/* Home page */}
      <Head>
        <title>Home</title> {/* Setting page title */}
      </Head>
      {/* Displaying albums made for Ishu */}
      
      <Topic
        title="Recently Played."
        sub_title=""
        tracks={[]}
        albums={context.recentlyTracks}
        type="album"
        playlists={[]}
      />
      <Topic
        title="Made for Ishu"
        sub_title="A typical choices"
        tracks={[]}
        albums={context.newRelease}
        type="album"
        playlists={[]}
      />
      <PaginationOutlined/>

    </React.Fragment>
  );
}
