import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import SearchResults from "./components/SearchResults";
import SearchInput from "./components/SearchInput";
import useSearchTracks from "./hooks/useSearchTracks";
import { useState } from "react";

export interface Song {
  id: string;
  name: string;
  artist: string;
  album: string;
  imageUrl?: string;
  duration: string;
}

const millisToMinutes = (millis: number | undefined | null) => {
  if (!millis) return "--:--";

  const minutes = Math.floor(millis / 60000);
  const seconds = Math.round(millis / 1000) - minutes * 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

function App() {
  const [search, setSearch] = useState("");
  const { data } = useSearchTracks(search);
  const tracks: Song[] = data.map((track) => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    imageUrl: track.album.images.find((i) => i.width > 256)?.url,
    duration: millisToMinutes(track.duration_ms),
  }));

  return (
    <Grid
      templateAreas={{
        base: `"search" "results" "playlist"`,
        lg: `"search results playlist"`,
      }}
    >
      <GridItem padding={10} area="search">
        <SearchInput onSearch={(search) => setSearch(search)} />
      </GridItem>
      <GridItem padding={10} area="results">
        <SearchResults results={tracks} />
      </GridItem>
      <GridItem padding={10} area="playlist">
        <div />
      </GridItem>
    </Grid>
  );
}

export default App;
