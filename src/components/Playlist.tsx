import { Heading, List, ListItem } from "@chakra-ui/react";
import { Track as TrackModel } from "../types";
import Track from "./Track";

interface Props {
  selectedTracks: TrackModel[];
}

const Playlist = ({ selectedTracks }: Props) => {
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
              onRemove={(track) => {
                console.log(`Remove track: ${track.name}`);
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Playlist;
