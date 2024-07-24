import { Card, CardBody, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { Song } from "../App";

interface Props {
  song: Song;
}

const Track = ({ song }: Props) => {
  return (
    <Card margin={2} overflow="hidden">
      <HStack>
        <Image width="128px" src={song.imageUrl}></Image>
        <CardBody>
          <HStack justifyContent="space-between" alignItems="start">
            <div>
              <Heading size="md">{song.name}</Heading>
              <Text>{song.artist}</Text>
              <Text>{song.album}</Text>
            </div>
            <Text>{song.duration}</Text>
          </HStack>
        </CardBody>
      </HStack>
    </Card>
  );
};

export default Track;
