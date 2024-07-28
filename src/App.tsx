import { useEffect, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import SearchResults from "./components/SearchResults";
import SearchInput from "./components/SearchInput";
import Playlist from "./components/Playlist";
import "./App.css";
import { Track } from "./types";
import NavBar from "./components/NavBar";
import SpotifyService from "./services/SpotifyService";

interface User {
  id: string;
  name: string;
  imageUrl: string;
}

function App() {
  const [search, setSearch] = useState("");
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { request, cancel } = SpotifyService.getUserProfile();

    request
      .then((res) => {
        localStorage.setItem("user_id", res.data.id);
        setUser({
          id: res.data.id,
          name: res.data.display_name,
          imageUrl: res.data.images[0].url,
        });
      })
      .catch(() => {});

    return () => cancel();
  }, []);

  return (
    <>
      <NavBar name={user?.name} imgUrl={user?.imageUrl} />
      <Box padding={"50px 20%"}>
        <SearchInput onSearch={(search) => setSearch(search)} />
      </Box>
      <SimpleGrid padding={10} columns={{ base: 1, lg: 2 }} spacing={10}>
        <Box>
          <SearchResults
            onAddTrack={(track) =>
              setSelectedTracks([...selectedTracks, track])
            }
            onRemoveTrack={(track) =>
              setSelectedTracks(selectedTracks.filter((t) => t.id !== track.id))
            }
            searchTerm={search}
            selectedTracks={selectedTracks}
          />
        </Box>
        <Box>
          <Playlist
            selectedTracks={selectedTracks}
            onRemoveAll={() => setSelectedTracks([])}
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
