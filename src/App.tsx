import { useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import SearchResults from "./components/SearchResults";
import SearchInput from "./components/SearchInput";
import Playlist from "./components/Playlist";
import useTracks from "./hooks/useTracks";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const { tracks } = useTracks(search);

  return (
    <>
      <Box padding={"50px 20%"}>
        <SearchInput onSearch={(search) => setSearch(search)} />
      </Box>
      <SimpleGrid padding={10} columns={{ base: 1, lg: 2 }} spacing={10}>
        <Box>
          <SearchResults results={tracks} />
        </Box>
        <Box>
          <Playlist />
        </Box>
      </SimpleGrid>
    </>
  );
}

export default App;
