import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Track as TrackModel } from "../types";
import Track from "./Track";
import { FormEvent, useRef, useState } from "react";
import SpotifyService from "../services/SpotifyService";
import { BsX } from "react-icons/bs";

interface Props {
  selectedTracks: TrackModel[];
  onRemoveAll: () => void;
  onRemoveSelected: (track: TrackModel) => void;
}

const Playlist = ({ selectedTracks, onRemoveAll, onRemoveSelected }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const userId = localStorage.getItem("user_id") || "";
  const [playlistName, setPlaylistName] = useState("");

  const savePlaylist = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (playlistName && selectedTracks.length > 0) {
      SpotifyService.createPlaylist(userId, playlistName)
        .then((res) => {
          const playlistId = res.data.id;
          SpotifyService.addItemsToPlaylist(
            playlistId,
            selectedTracks.map((track) => `spotify:track:${track.id}`)
          );
        });
      }
  };

  return (
    <form onSubmit={savePlaylist}>
      <HStack padding={4}>
        <InputGroup>
          <Input
            ref={ref}
            variant="flushed"
            placeholder="Enter a title for your playlist"
            value={playlistName}
            onChange={(event) => setPlaylistName(event.target.value)}
          />
          <InputRightElement
            children={playlistName && <BsX />}
            onClick={() => {
              setPlaylistName("");
              ref.current?.focus();
            }}
          />
        </InputGroup>
        <Button
          type="submit"
          borderRadius={20}
          backgroundColor="limegreen"
          colorScheme="green"
          width={120}
        >
          Save
        </Button>
        <Button borderRadius={20} onClick={onRemoveAll} width={130}>
          Remove all
        </Button>
      </HStack>
      <List>
        {selectedTracks.map((track) => (
          <ListItem key={track.id}>
            <Track
              selected={true}
              track={track}
              onAdd={() => {}}
              onRemove={onRemoveSelected}
            />
          </ListItem>
        ))}
      </List>
    </form>
  );
};

export default Playlist;
