import {
  Button,
  Card,
  CardBody,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Show,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Track as TrackModel } from "../types";
import Track from "./Track";
import { FormEvent, useRef, useState } from "react";
import SpotifyService from "../services/SpotifyService";
import { BsX } from "react-icons/bs";
import ErrorMessage from "./ErrorMessage";
import { AxiosError } from "axios";

interface Props {
  selectedTracks: TrackModel[];
  onRemoveAll: () => void;
  onRemoveSelected: (track: TrackModel) => void;
}

const Playlist = ({ selectedTracks, onRemoveAll, onRemoveSelected }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const userId = localStorage.getItem("user_id") || "";

  const handleSuccess = () => {
    setLoading(false);
    setError("");
    setPlaylistName("");
    onRemoveAll();
    setSuccessMessage("Your playlist is ready!");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleError = (errorMessage: string) => {
    setLoading(false);
    setError(errorMessage);
    setTimeout(() => setError(""), 5000);
  };

  const savePlaylist = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!playlistName) handleError("You have not entered a title for the playlist.");
    if (selectedTracks.length === 0) handleError("You have not selected any songs.");

    if (playlistName && selectedTracks.length > 0) {
      setLoading(true);
      SpotifyService.createPlaylist(userId, playlistName)
        .then((res) => {
          const playlistId = res.data.id;
          SpotifyService.addItemsToPlaylist(
            playlistId,
            selectedTracks.map((track) => `spotify:track:${track.id}`)
          )
            .then(handleSuccess)
            .catch((err) => handleError((err as AxiosError).message));
        })
        .catch((err) => handleError((err as AxiosError).message));
    }
  };

  const buttons = (
    <>
      <Button
        type="submit"
        borderRadius={20}
        backgroundColor="limegreen"
        colorScheme="green"
        minWidth={120}
      >
        Save
      </Button>
      <Button borderRadius={20} onClick={onRemoveAll} minWidth={120}>
        Remove all
      </Button>
    </>
  );

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
        <Show above="md">
          <HStack justifyContent="center">{buttons}</HStack>
        </Show>
      </HStack>
      <Show below="md">
        <HStack justifyContent="center">{buttons}</HStack>
      </Show>
      {isLoading && <Spinner />}
      {error && <ErrorMessage error={error} />}
      {successMessage && (
        <Card bgColor="green">
          <CardBody>
            <Text color="white">{successMessage}</Text>
          </CardBody>
        </Card>
      )}
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
