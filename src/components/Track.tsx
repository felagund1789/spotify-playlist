import {
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { Track as TrackModel } from "../types";
import { useState } from "react";

interface Props {
  track: TrackModel;
}

const millisToMinutes = (millis: number | undefined | null) => {
  if (!millis) return "--:--";

  const minutes = Math.floor(millis / 60000);
  const seconds = Math.round(millis / 1000) - minutes * 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

const Track = ({ track }: Props) => {
  const [selected, setSelected] = useState(false);

  const title = track.name;
  const imageUrl = track.album.images.find((i) => i.height > 256)?.url || "";
  const artist = track.artists[0].name;
  const album = track.album.name;
  const duration = millisToMinutes(track.duration_ms);

  return (
    <Card height="128px" margin={2} overflow="hidden">
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
        <Button
          colorScheme={selected ? "default" : "green"}
          backgroundColor={selected ? "gray" : "limegreen"}
          marginRight={5}
          marginTop={10}
          onClick={() => setSelected(!selected)}
        >
          {selected ? "Remove" : "Add"}
        </Button>
      </HStack>
    </Card>
  );
};

export default Track;
