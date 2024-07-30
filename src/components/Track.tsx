import {
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Show,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Track as TrackModel } from "../types";

interface Props {
  track: TrackModel;
  selected: boolean;
  onAdd: (track: TrackModel) => void;
  onRemove: (track: TrackModel) => void;
}

const millisToMinutes = (millis: number | undefined | null) => {
  if (!millis) return "--:--";

  const minutes = Math.floor(millis / 60000);
  const seconds = Math.round(millis / 1000) - minutes * 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

const Track = ({ track, selected, onAdd, onRemove }: Props) => {
  const title = track.name;
  const imageUrl = track.album.images.find((i) => i.height > 256)?.url || "";
  const artist = track.artists[0].name;
  const album = track.album.name;
  const duration = millisToMinutes(track.duration_ms);
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const toggleSelected = () => (selected ? onRemove(track) : onAdd(track));

  return (
    <Card
      bgColor={isMobile && selected ? "purple.700" : "gray.700"}
      margin={2}
      overflow="hidden"
      onClick={() => {
        if (!isMobile) return;
        if (selected) onRemove(track);
        else onAdd(track);
      }}
    >
      <HStack alignItems="start">
        <Image width="128px" src={imageUrl}></Image>
        <CardBody>
          <HStack justifyContent="space-between" alignItems="start">
            <div>
              <Heading size="md">{title}</Heading>
              <Text>{artist}</Text>
              <Text>{album}</Text>
            </div>
            <Text>{duration}</Text>
          </HStack>
        </CardBody>
        <Show above="md">
          <Button
            backgroundColor={selected ? "gray" : "limegreen"}
            borderRadius={20}
            colorScheme={selected ? "default" : "green"}
            marginRight={5}
            marginTop={10}
            width={90}
            onClick={toggleSelected}
          >
            {selected ? "Remove" : "Add"}
          </Button>
        </Show>
      </HStack>
    </Card>
  );
};

export default Track;
