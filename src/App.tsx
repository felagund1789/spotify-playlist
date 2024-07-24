import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import SearchResults from "./components/SearchResults";
import SearchInput from "./components/SearchInput";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"search" "results" "playlist"`,
        lg: `"search results playlist"`,
      }}
      templateColumns={{
        base: "1fr 1fr 1fr",
        lg: "1fr 1fr 1fr",
      }}
    >
      <GridItem padding={10} area="search">
        <SearchInput onSearch={(search) => console.log(search)} />
      </GridItem>
      <GridItem padding={10} area="results">
        <SearchResults />
      </GridItem>
      <GridItem padding={10} area="playlist">
        <div />
      </GridItem>
    </Grid>
  );
}

export default App;
