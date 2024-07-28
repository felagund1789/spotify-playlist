import { Avatar, Heading, HStack } from "@chakra-ui/react";

interface Props {
  name: string | undefined;
  imgUrl: string | undefined;
}

const NavBar = ({ name, imgUrl }: Props) => {
  return (
    <HStack justifyContent="space-between" padding={4}>
      <Heading>Spotify Playlist Maker</Heading>
      <Avatar name={name} src={imgUrl} />
    </HStack>
  );
};

export default NavBar;
