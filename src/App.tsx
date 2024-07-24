import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import SearchResults from "./components/SearchResults";
import SearchInput from "./components/SearchInput";
import songs from "./data/songs";

export interface Song {
  id: string;
  name: string;
  artist: string;
  album: string;
  imageUrl?: string;
  color: string;
}

const tracks: Song[] = songs.map((s) => ({
  id: s.item.data.id,
  name: s.item.data.name,
  artist: s.item.data.artists.items[0].profile.name,
  album: s.item.data.albumOfTrack.name,
  imageUrl: s.item.data.albumOfTrack.coverArt.sources.find((i) => i.width > 256)?.url,
  color: s.item.data.albumOfTrack.coverArt.extractedColors.colorDark.hex
}));

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"search" "results" "playlist"`,
        lg: `"search results playlist"`,
      }}
    >
      <GridItem padding={10} area="search">
        <SearchInput onSearch={(search) => console.log(search)} />
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
