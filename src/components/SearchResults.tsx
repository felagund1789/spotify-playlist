import { Heading, List, ListItem } from "@chakra-ui/react";
import { Track as TrackModel } from "../types";
import Track from "./Track";

interface Props {
  results: TrackModel[];
  onAddTrack: (track: TrackModel) => void;
  onRemoveTrack: (track: TrackModel) => void;
}

const SearchResults = ({ results, onAddTrack, onRemoveTrack }: Props) => {
  return (
    <>
      <Heading>Results</Heading>
      <List>
        {results.map((track) => (
          <ListItem key={track.id}>
            <Track selected={false} onAdd={onAddTrack} onRemove={onRemoveTrack} track={track} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SearchResults;
