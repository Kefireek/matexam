import { useEffect, useState } from "react";
import StudentsAPIService from "../../services/api/students/StudentsAPIService";
import { StudentDescriptive } from "../../interfaces/students";
import { Box, Button, Flex, Heading, IconButton, Modal, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AssignToExamModal from "./AssignToExamModal";
import StudentForm from "../../components/studentForm";
import SearchBar from "../../components/searchBar";
import Pagination from "../../components/pagination";

function StudentsPage() {

  const [lastSearch, setLastSearch] = useState('');
  const [studentsList, setStudentsList] = useState<StudentDescriptive[]>();
  const [selectedStudent, setSelectedStudent] = useState<StudentDescriptive>();

  const {isOpen: isStudentOpen, onOpen: onStudentOpen, onClose: onStudentClose} = useDisclosure();

  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const take = 10;

  useEffect(() => {
    StudentsAPIService.searchStudentsList(lastSearch, skip, take).then((res)=>{
      setStudentsList(res.data.items)
      setTotal(res.data.total)
    }).catch((err)=>{
      console.log(err);
    });
  }, [lastSearch, skip])

  const assignToExam = (student: StudentDescriptive) => {
    setSelectedStudent(undefined)
    setTimeout(() => {
      setSelectedStudent(student);
    })
  }

  return (
    <Flex margin="1vw" direction='column'>
      <Flex direction='row' width='100%' gap='1vw' justifyContent='space-between'>
        <Heading>Uczniowie</Heading>
        <SearchBar search={setLastSearch} />
        <Button fontSize="1vw" onClick={onStudentOpen} paddingX='1.5vw'>Dodaj ucznia <AddIcon ml="0.5vw" /></Button>
      </Flex>
      <Modal isOpen={isStudentOpen} onClose={onStudentClose} size="lg">
        <ModalOverlay/>
        <StudentForm onStudentClose={onStudentClose}/>
      </Modal>
      <AssignToExamModal selectedStudent={selectedStudent} />
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Nr</Th>
              <Th>Oddział</Th>
              <Th>Nazwisko</Th>
              <Th>Imię</Th>
              <Th>PESEL</Th>
              <Th>Nr telefonu</Th>
              <Th>Email</Th>
              <Th>Dokument</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {studentsList?.map((student)=>
              <Tr key={student.PESEL}>
                <Td>{student.ordinalNumber}</Td>
                <Td>{student.department}</Td>
                <Td>{student.surname}</Td>
                <Td>{student.name}</Td>
                <Td>{student.PESEL}</Td>
                <Td>{student.phone}</Td>
                <Td>{student.email}</Td>
                <Td>{student.document}</Td>
                <Td>
                  <IconButton aria-label="Options" icon={<AddIcon />} variant="outline" onClick={() => assignToExam(student)} />
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Box alignSelf='flex-end' marginTop='10px'>
        <Pagination total={total} skipChanged={setSkip} take={take} key={'pag-' + lastSearch} />
      </Box>
    </Flex>
  )
}

export default StudentsPage