import { Button, HStack, Input, List, ListItem } from "@chakra-ui/react";
import { Track as TrackModel } from "../types";
import Track from "./Track";
import { FormEvent, useState } from "react";
import SpotifyService from "../services/SpotifyService";

interface Props {
  selectedTracks: TrackModel[];
  onRemoveSelected: (track: TrackModel) => void;
}

const Playlist = ({ selectedTracks, onRemoveSelected }: Props) => {
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
        <Input
          variant="flushed"
          placeholder="Enter a title for your playlist"
          value={playlistName}
          onChange={(event) => setPlaylistName(event.target.value)}
        />
        <Button
          type="submit"
          borderRadius={20}
          backgroundColor="limegreen"
          colorScheme="green"
          width={120}
        >
          Save
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
