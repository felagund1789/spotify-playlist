import { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import SearchResults from "./components/SearchResults";
import SearchInput from "./components/SearchInput";
import useSearchTracks from "./hooks/useSearchTracks";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const { data } = useSearchTracks(search);

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
        <SearchResults results={data} />
      </GridItem>
      <GridItem padding={10} area="playlist">
        <div />
      </GridItem>
    </Grid>
  );
}

export default App;
