import { Heading, List, ListItem, Spinner } from "@chakra-ui/react";
import { Track as TrackModel } from "../types";
import Track from "./Track";
import useTracks from "../hooks/useTracks";
import ErrorMessage from "./ErrorMessage";

interface Props {
  searchTerm: string;
  selectedTracks: TrackModel[];
  onAddTrack: (track: TrackModel) => void;
  onRemoveTrack: (track: TrackModel) => void;
}

const SearchResults = ({
  searchTerm,
  selectedTracks,
  onAddTrack,
  onRemoveTrack,
}: Props) => {
  const { tracks, isLoading, error } = useTracks(searchTerm);
  return (
    <>
      <Heading>Results</Heading>
      {isLoading && <Spinner />}
      {error && <ErrorMessage error={error} />}
      <List>
        {tracks.map((track) => (
          <ListItem key={track.id}>
            <Track
              selected={selectedTracks.findIndex((t) => t.id === track.id) > -1}
              onAdd={onAddTrack}
              onRemove={onRemoveTrack}
              track={track}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SearchResults;
