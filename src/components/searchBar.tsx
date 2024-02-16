import { 
  Box, 
  Input, 
  InputGroup,
  InputLeftAddon, 
  Select, 
  Spinner 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('');

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
            console.log(searchValue);


        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [searchValue, 1000]);

  return (
      <Box display="flex">
        <InputGroup>
          <Input placeholder="Szukaj..." variant="filled" onChange={(e) => onSearchChange(e)} value={searchValue}/>
          <InputLeftAddon backgroundColor="gray.800" border="none">
            { <Spinner size="sm" opacity={(searchValue != debouncedSearchValue) ? 1 : 0 }/>}
          </InputLeftAddon>
        </InputGroup>
      </Box>
  )
}
export default SearchBar;