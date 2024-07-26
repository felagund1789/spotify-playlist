import { Heading, List, ListItem } from "@chakra-ui/react";
import { Track as TrackModel } from "../types";
import Track from "./Track";

interface Props {
  results: TrackModel[];
  onSelectTrack: (track: TrackModel) => void;
}

const SearchResults = ({ results, onSelectTrack }: Props) => {
  return (
    <>
      <Heading>Results</Heading>
      <List>
        {results.map((track) => (
          <ListItem key={track.id}>
            <Track selected={false} onAdd={onSelectTrack} onRemove={() => {}} track={track} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SearchResults;
