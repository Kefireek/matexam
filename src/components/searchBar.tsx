import { Box, Button, Input, InputGroup, InputLeftAddon, InputRightAddon, Select } from "@chakra-ui/react";

const SearchBar = () => {
  return (
      <Box display="flex">
        <InputGroup>
          <Input placeholder="Szukaj..." variant="filled" />
          <InputRightAddon>
            <Button background="transparent" variant="solid" >Szukaj</Button>
          </InputRightAddon>
        </InputGroup>  
      </Box>
  )
}
export default SearchBar;