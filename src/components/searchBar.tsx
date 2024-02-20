import { 
  Box, 
  Input, 
  InputGroup,
  InputLeftAddon, 
  Select, 
  Spinner 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StudentDescriptive } from "../interfaces/students";

const SearchBar = (props: {filterList: StudentDescriptive[] | undefined, setFilterList: Function}) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('');

    const searchStudents = (searchValue: string) => {
      let students: StudentDescriptive[] = [];
        props.filterList?.filter((item: StudentDescriptive) => {
           if(item.PESEL.includes(searchValue) || item.name.includes(searchValue) || item.surname.includes(searchValue)) {
              students.push(item);
           }
        });
        props.setFilterList(students);
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
            searchStudents(searchValue);
            
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