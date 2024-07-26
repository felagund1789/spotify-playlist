import { Heading, List, ListItem } from "@chakra-ui/react";
import { Track as TrackModel } from "../types";
import Track from "./Track";

interface Props {
  results: TrackModel[];
}

const SearchResults = ({ results }: Props) => {
  return (
    <>
      <Heading>Results</Heading>
      <List>
        {results.map((track) => (
          <ListItem key={track.id}>
            <Track track={track} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SearchResults;
