// Importing necessary modules and components
import { useAppSelector } from "hooks";
import React, { useEffect, useState } from "react";
import spotify from "spotify";
import Browse from "./Browse";
import Result from "./Result";

// Interface for artist result
export interface ArtistResult {
  id: string;
  followers: number;
  name: string;
  image: string;
}

// Interface for track result
export interface TrackResult {
  id: string;
  name: string;
  uri: string;
  offset: number;
  artist: string;
  image: string;
}

// Interface for album result
export interface AlbumResult {
  id: string;
  uri: string;
  name: string;
  artist: string;
  image: string;
}

// Interface for playlist result
export interface PlaylistResult {
  id: string;
  name: string;
  uri: string;
  image: string;
  owner: string;
}

// Interface for combined search results
export interface IResult {
  artists: ArtistResult;
  albums: AlbumResult[];
  tracks: TrackResult[];
  playlists: PlaylistResult[];
}

// Search component
export default function Search() {
  // Retrieving keyword from Redux store
  const keyword = useAppSelector((state) => state.search.keyword);
  // State to store search results
  const [result, setResult] = useState<IResult>();

  // Function to fetch search results
  const fetchResult = async () => {
    const res = await spotify.search(keyword);
    // Initialize variables to store individual results
    let artists: ArtistResult = {} as ArtistResult;
    let albums: AlbumResult[] = [] as AlbumResult[];
    let tracks: TrackResult[] = [] as TrackResult[];
    let playlists: PlaylistResult[] = [] as PlaylistResult[];

    // Process artist results
    artists.id = res.artists.items[0].id;
    artists.name = res.artists.items[0].name;
    artists.followers = res.artists.items[0].followers.total;
    artists.image = res.artists.items[0].images[0].url;

    // Process album results
    let singleAlbum: AlbumResult = {} as AlbumResult;
    for (const album of res.albums.items) {
      singleAlbum.id = album.id;
      singleAlbum.name = album.name;
      singleAlbum.uri = album.uri;
      singleAlbum.image = album.images[0].url;
      singleAlbum.artist = album.artists
        .map((artist: { id: string; name: string }) => artist.name)
        .join(", ");
      albums.push(JSON.parse(JSON.stringify(singleAlbum)));
    }

    // Process track results
    let singleTrack: TrackResult = {} as TrackResult;
    for (const track of res.tracks.items) {
      singleTrack.artist = track.artists
        .map((artist: { id: string; name: string }) => artist.name)
        .join(", ");
      singleTrack.id = track.id;
      singleTrack.name = track.name;
      singleTrack.image = track.album.images[0].url;
      singleTrack.offset = track.track_number;
      singleTrack.uri = track.album.uri;
      tracks.push(JSON.parse(JSON.stringify(singleTrack)));
    }

    // Process playlist results
    let singlePlaylist: PlaylistResult = {} as PlaylistResult;
    for (const playlist of res.playlists.items) {
      singlePlaylist.id = playlist.id;
      singlePlaylist.image = playlist.images[0].url;
      singlePlaylist.name = playlist.name;
      singlePlaylist.owner = playlist.owner.display_name;
      singlePlaylist.uri = playlist.uri;
      playlists.push(JSON.parse(JSON.stringify(singlePlaylist)));
    }

    // Set the combined search results
    setResult({ artists, albums, tracks, playlists });
  };

  // Logging the search result
  console.log(result);

  // Effect to fetch search results when keyword changes
  useEffect(() => {
    // Resetting the result state
    setResult({
      artists: { id: "", name: "", followers: 0, image: "" },
      albums: [],
      tracks: [],
      playlists: [],
    });
    // Fetching search result if keyword exists
    if (keyword.length > 0) {
      fetchResult();
    }
  }, [keyword]);

  // Rendering the Result or Browse component based on keyword existence
  return (
    <div>{keyword.length > 0 ? <Result result={result} /> : <Browse />}</div>
  );    
}
