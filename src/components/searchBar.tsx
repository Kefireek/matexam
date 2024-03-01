import { CheckIcon } from "@chakra-ui/icons";
import { 
  Box, 
  Input, 
  InputGroup,
  InputLeftAddon,
  Spinner
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SearchBar = ({search}: {search: (value: string) => void }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('');

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
      search(searchValue);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, search]);

  return (
    <Box display="flex" width='100%'>
      <InputGroup>
        <Input placeholder="Szukaj..." variant="filled" onChange={(e) => onSearchChange(e)} value={searchValue} width='100%' height='100%' paddingY='6px' />
        <InputLeftAddon backgroundColor="gray.800" border="none" height='100%'>
          {searchValue != debouncedSearchValue ? <Spinner size="sm" /> : <CheckIcon boxSize={4} />}
        </InputLeftAddon>
      </InputGroup>
    </Box>
  )
}
export default SearchBar;