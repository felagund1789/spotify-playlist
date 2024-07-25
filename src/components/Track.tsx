import { Card, CardBody, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { Track as TrackModel} from "../types";

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
  const title = track.name;
  const imageUrl = track.album.images.find((i) => i.height > 256)?.url || "";
  const artist = track.artists[0].name;
  const album = track.album.name;
  const duration = millisToMinutes(track.duration_ms);

  return (
    <Card margin={2} overflow="hidden">
      <HStack>
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
      </HStack>
    </Card>
  );
};

export default Track;
