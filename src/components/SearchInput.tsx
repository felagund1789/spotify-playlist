import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsSearch, BsX } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");

  const clearSearchText = () => {
    setSearchText("");
    onSearch("");
    ref.current?.focus();
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <HStack>
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="Search songs..."
            variant="filled"
            value={searchText}
            onChange={(input) => setSearchText(input.target.value)}
          />
          <InputRightElement
            children={searchText && <BsX />}
            onClick={clearSearchText}
          />
        </InputGroup>
        <Button
          backgroundColor="limegreen"
          borderRadius={20}
          colorScheme="green"
          type="submit"
          width={120}
        >
          Search
        </Button>
      </HStack>
    </form>
  );
};

export default SearchInput;
