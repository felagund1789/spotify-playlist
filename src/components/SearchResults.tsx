import { List, ListItem } from "@chakra-ui/react";
import Track from "./Track";
import { Song } from "../App";

interface Props {
  results: Song[]
}

const SearchResults = ( { results }: Props ) => {
  return (
    <List>
      {results.map((song) => <ListItem>
        <Track song={song} />
      </ListItem>) }
    </List>
  );
};

export default SearchResults;
