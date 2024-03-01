import { 
  Box, 
  Input, 
  InputGroup,
  InputLeftAddon,
  Spinner
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { StudentDescriptive } from "../interfaces/students";

const SearchBar = ({filterList, setFilterList}: {filterList: StudentDescriptive[] | undefined, setFilterList: Dispatch<SetStateAction<StudentDescriptive[]>>}) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('');

    const searchStudents = useCallback( (searchValue: string) =>  {
      const students: StudentDescriptive[] = [];

        filterList?.filter((item: StudentDescriptive) => {
           if(item.PESEL.includes(searchValue) || item.name.includes(searchValue) || item.surname.includes(searchValue)) {
              students.push(item);
           }
        });
        setFilterList(students);
    }, [filterList, setFilterList]);

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
    }, [searchValue, searchStudents]);

  return (
      <Box display="flex">
        <InputGroup>
          <Input placeholder="Szukaj..." variant="filled" onChange={(e) => onSearchChange(e)} value={searchValue}/>
          <InputLeftAddon backgroundColor="gray.800" border="none">
            { <Spinner size="sm" opacity={(searchValue != debouncedSearchValue) ? 1 : 0 } background="none"/>}
          </InputLeftAddon>
        </InputGroup>
      </Box>
  )
}
export default SearchBar;