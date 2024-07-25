import { List, ListItem } from "@chakra-ui/react";
import { Track as TrackModel } from "../types";
import Track from "./Track";

interface Props {
  results: TrackModel[]
}

const SearchResults = ( { results }: Props ) => {
  return (
    <List>
      {results.map((track) => <ListItem key={track.id}>
        <Track track={track} />
      </ListItem>) }
    </List>
  );
};

export default SearchResults;
