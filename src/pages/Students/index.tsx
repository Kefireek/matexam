import { useEffect, useState } from "react";
import StudentsAPIService from "../../services/api/students/StudentsAPIService";
import { StudentDescriptive } from "../../interfaces/students";
import { Box, Heading, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AssignToExamModal from "./AssignToExamModal";

function StudentsPage() {

  const [studentsList, setStudentsList] = useState<StudentDescriptive[]>()

  const [selectedStudent, setSelectedStudent] = useState<StudentDescriptive>()

  const getStudentsList = () => {
    StudentsAPIService.getStudentsList().then((res)=>{
      setStudentsList(res.data)
    }).catch((err)=>{
      console.log(err);
    });
  }

  const assignToExam = (student: StudentDescriptive) => {
    setSelectedStudent(student);
  }

  useEffect(() => {
    getStudentsList()
  }, [])

  return (
    <Box margin="1vw">
      <Heading>Uczniowie</Heading>
      <AssignToExamModal open={assignToExam} />
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Nr w dzienniku</Th>
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
    </Box>
  )
}

export default StudentsPage