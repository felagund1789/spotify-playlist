import { useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import SearchResults from "./components/SearchResults";
import SearchInput from "./components/SearchInput";
import Playlist from "./components/Playlist";
import useTracks from "./hooks/useTracks";
import "./App.css";
import { Track } from "./types";

function App() {
  const [search, setSearch] = useState("");
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const { tracks } = useTracks(search);

  return (
    <>
      <Box padding={"50px 20%"}>
        <SearchInput onSearch={(search) => setSearch(search)} />
      </Box>
      <SimpleGrid padding={10} columns={{ base: 1, lg: 2 }} spacing={10}>
        <Box>
          <SearchResults
            onAddTrack={(track) =>
              setSelectedTracks([...selectedTracks, track])
            }
            onRemoveTrack={() => {}}
            results={tracks}
          />
        </Box>
        <Box>
          <Playlist
            selectedTracks={selectedTracks}
            onRemoveSelected={(track) =>
              setSelectedTracks(selectedTracks.filter((t) => t.id !== track.id))
            }
          />
        </Box>
      </SimpleGrid>
    </>
  );
}

export default App;
