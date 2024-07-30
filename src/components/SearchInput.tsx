import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Show,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsSearch, BsX } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  const padding = useBreakpointValue({
    base: "20px",
    md: "50px 20%",
  });

  const clearSearchText = () => {
    setSearchText("");
    onSearch("");
    ref.current?.focus();
  };

  const searchButton = (
    <Button
      backgroundColor="limegreen"
      borderRadius={20}
      colorScheme="green"
      type="submit"
      width={120}
    >
      Search
    </Button>
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <HStack padding={padding}>
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="Search for a song"
            variant="filled"
            value={searchText}
            onChange={(input) => setSearchText(input.target.value)}
          />
          <InputRightElement
            children={searchText && <BsX />}
            onClick={clearSearchText}
          />
        </InputGroup>
        <Show above="md">{searchButton}</Show>
      </HStack>
      <Show below="md">
        <HStack justifyContent="center">{searchButton}</HStack>
      </Show>
    </form>
  );
};

export default SearchInput;
