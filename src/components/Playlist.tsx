import { Heading, List, ListItem } from "@chakra-ui/react";
import { Track as TrackModel } from "../types";
import Track from "./Track";

interface Props {
  selectedTracks: TrackModel[];
  onRemoveSelected: (track: TrackModel) => void;
}

const Playlist = ({ selectedTracks, onRemoveSelected }: Props) => {
  return (
    <>
      <Heading>Playlist</Heading>
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
    </>
  );
};

export default Playlist;
