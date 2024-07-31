import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Show,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <SearchInput
        onSearch={(search) => setSearch(search)}
        onClickSave={onOpen}
      />
      <SimpleGrid padding={10} columns={{ base: 1, lg: 2 }} spacing={10}>
        {(search || selectedTracks.length > 0) && (
          <Box>
            <SearchResults
              onAddTrack={(track) =>
                setSelectedTracks([...selectedTracks, track])
              }
              onRemoveTrack={(track) =>
                setSelectedTracks(
                  selectedTracks.filter((t) => t.id !== track.id)
                )
              }
              searchTerm={search}
              selectedTracks={selectedTracks}
            />
          </Box>
        )}
        <Show above="md">
          {(search || selectedTracks.length > 0) && (
            <Box>
              <Playlist
                selectedTracks={selectedTracks}
                onRemoveAll={() => setSelectedTracks([])}
                onRemoveSelected={(track) =>
                  setSelectedTracks(
                    selectedTracks.filter((t) => t.id !== track.id)
                  )
                }
              />
            </Box>
          )}
        </Show>
      </SimpleGrid>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your Playlist</DrawerHeader>

          <DrawerBody>
            <Playlist
              selectedTracks={selectedTracks}
              onRemoveAll={() => setSelectedTracks([])}
              onRemoveSelected={(track) =>
                setSelectedTracks(
                  selectedTracks.filter((t) => t.id !== track.id)
                )
              }
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default App;
