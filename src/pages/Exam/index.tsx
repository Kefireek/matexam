import { useNavigate, useParams } from "react-router-dom";

import { Badge, Box, Button, Flex, IconButton, Menu, MenuButton, MenuGroup, MenuItem, MenuList, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { ExamView, StudentRoom } from "../../interfaces/exams";

import ExamsAPIService from "../../services/api/exams/ExamsAPIService";
import ExamDetailsModal from "./ExamDetailsModal";
import { AddIcon } from "@chakra-ui/icons";
import SearchBar from "../../components/searchBar";
import { StudentDescriptive } from "../../interfaces/students";


function ExamPage() {
    const { examid } = useParams() as unknown as examParams;

    const [examView, setExamView] = useState<ExamView>();
    const [unassignedStudents, setUnassignedStudents] = useState<ExamView["unassignedStudents"]>([]);
    const navigate = useNavigate();

    const gotoExam = useCallback(() => {
        if (examid)
            getExam(examid)
        else
            navigate('/error')
    }, [examid, navigate])

    useEffect( ()=> {
        gotoExam()  
    }, [gotoExam])


    useEffect( ()=> {  
        gotoExam()
    }, [gotoExam])

    const getExam = (examid: number) => {
        ExamsAPIService.getExam(examid).then((res)=>{
            setExamView(res.data)
            console.log(res.data.unassignedStudents)
            setUnassignedStudents(res.data.unassignedStudents)
        }).catch((err)=>{
            console.log(err);
        });
    }

    const assignStudent = async (pesel : string, numberp : number) => {
        ExamsAPIService.updateRoomAssignments(examid, [{PESEL : pesel, number : numberp}]).then(()=>{
            getExam(examid);
        });
    }

    const searchStudents = useCallback( (searchValue: string) =>  {
        searchValue = searchValue.toLowerCase();
        const students: StudentDescriptive[] = [];
    
        examView?.unassignedStudents?.forEach((item: StudentDescriptive) => {
          if(item.PESEL.includes(searchValue) || item.name.toLowerCase().includes(searchValue) || item.surname.toLowerCase().includes(searchValue)) {
            students.push(item);
          }
        });
        
        setUnassignedStudents(students);
      }, [examView?.unassignedStudents, setUnassignedStudents]);


    const fillExam = () => {
        if(!examView) return
        let unassignedStudentsCount = examView?.unassignedStudents.length; 
        const rooms = examView?.assignedStudents;

        rooms?.sort((a, b)=> b.size - a.size)
        
        console.log(rooms);
        let assignments: StudentRoom[] = []

        console.log("ds");

        rooms?.forEach((room, index) => {
            const freeSpace = room.size - (room.students?.length ?? 0);
            const gap = (unassignedStudentsCount ?? 0) - freeSpace; 
            if(freeSpace === 0){
                    return
            }
            else if(gap===0 || ((room.students?.length ?? 0) > 0)){
                    console.log(room.number + " " +  unassignedStudentsCount + " " + freeSpace)
                     if (freeSpace) {
                    assignments = assignments.concat(examView.unassignedStudents.splice(0, freeSpace).map(st => ({PESEL : st.PESEL, number : room.number}))) 
                }
                unassignedStudentsCount = (unassignedStudentsCount ?? 0) - freeSpace;
            }
            else if(gap > 0){
                console.log(room.number + " " +  unassignedStudentsCount + " " + freeSpace)
                if (freeSpace) {
                    assignments = assignments.concat(examView.unassignedStudents.splice(0, freeSpace).map(st => ({PESEL : st.PESEL, number : room.number}))) 
                }
                unassignedStudentsCount = (unassignedStudentsCount ?? 0) - freeSpace;
            }
            else if((gap < 0) && index + 1 < rooms.length && ((unassignedStudentsCount ?? 0)-(rooms[index + 1].size - (rooms[index + 1].students?.length ?? 0)) > 0) && (rooms[index + 1].size - (rooms[index + 1].students?.length ?? 0)) != 0){
                console.log(room.number + " " +  unassignedStudentsCount + " " + freeSpace)
                if (freeSpace) {
                    assignments = assignments.concat(examView.unassignedStudents.splice(0, freeSpace).map(st => ({PESEL : st.PESEL, number : room.number}))) 
                }
                unassignedStudentsCount = (unassignedStudentsCount ?? 0) - freeSpace;
            }
        });

        // rooms?.sort((a, b)=> a.size - b.size)
        // if((unassignedStudentsCount ?? 0) > 0){
        //     rooms?.forEach(room => {
        //         const freeSpace = room.size - assignments.filter(a => a.number === room.number).length;
        //         if(((unassignedStudentsCount ?? 0) - freeSpace) <= 0 || ((room.students?.length ?? 0) > 0)){
        //             if (freeSpace) {
        //                 assignments = assignments.concat(examView.unassignedStudents.splice(0, freeSpace).map(st => ({PESEL : st.PESEL, number : room.number})))
        //             }
        //             unassignedStudentsCount = unassignedStudentsCount ?? 0 - freeSpace;
        //         }
        //     });
        // }

        if(assignments.length > 0)
            ExamsAPIService.updateRoomAssignments(
                examid,
                assignments
            ).then(()=>{
                getExam(examid);
            });
    }

    return(
        <Box display="contents">
        <Box paddingLeft="1.5vw">
            <Flex justifyContent="left" alignItems="center" height="10vh">
                <Text fontSize="2vw">
                    {examView?.name}
                    <Badge marginLeft="0.5vw" fontSize="2xl">{examView?.type == "basic" ? "Podstawowy" : (examView?.type == "extended" ? "Rozszerzony" : "Ustny")}</Badge>
                </Text>
                <Box ml="1vw">
                    <Text fontSize="1vw">
                        Od: <b></b>
                        {
                            examView?.startTime &&
                                new Date(examView?.startTime?.toString()).toLocaleString("pl-PL", {year: "numeric", month: "2-digit", day: "2-digit",hour: '2-digit', minute: "2-digit", weekday: "short"})
                        }
                    </Text>
                    <Text fontSize="1vw">
                        Do: <b></b>
                        {
                            examView?.endTime &&
                                new Date(examView?.endTime?.toString()).toLocaleString("pl-PL", {year: "numeric", month: "2-digit", day: "2-digit",hour: '2-digit', minute: "2-digit", weekday: "short"})
                        }
                    </Text>
                </Box>
                <Button onClick={() => fillExam()} marginLeft="auto" justifySelf="end">Wypełnij egzamin</Button>              
            </Flex>
        </Box>
         <Box paddingLeft="1.5vw">
            <Box marginTop="2vw" display="flex" justifyContent="space-between">
                <Box>
                    <SimpleGrid width="46vw" spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                        {examView?.assignedStudents.map((room) =>
                            <ExamDetailsModal key={room.number} room={room} examid={examid} getExam={getExam} unassignedStudents={examView?.unassignedStudents}/>
                        )
                        }
                    </SimpleGrid>
                </Box>
                <Box ml="1vw">
                    <SearchBar search={searchStudents} />
                    <TableContainer width="46vw">
                        <Table variant='striped' colorScheme='teal'>
                            <Thead>
                                <Tr>
                                    <Th>Nr</Th>
                                    <Th>Oddział</Th>
                                    <Th>Nazwisko</Th>
                                    <Th>Imię</Th>
                                    <Th>PESEL</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {unassignedStudents.map((student)=>
                                    <Tr key={student.PESEL}>
                                        <Td>{student.ordinalNumber}</Td>
                                        <Td>{student.department}</Td>
                                        <Td>{student.surname}</Td>
                                        <Td>{student.name}</Td>
                                        <Td>{student.PESEL}</Td>
                                        <Td>
                                            <Menu>
                                                <MenuButton
                                                    as={IconButton}
                                                    aria-label='Options'
                                                    icon={<AddIcon />}
                                                    variant='outline'
                                                />
                                                <MenuList>
                                                    <MenuGroup title="Dodaj do sali">
                                                    {examView?.assignedStudents.map((room) =>
                                                        <MenuItem key={room.number} onClick={()=> assignStudent(student.PESEL, room.number)}> Sala nr {room.number}</MenuItem>
                                                    )
                                                    }
                                                    </MenuGroup>
                                                </MenuList>
                                            </Menu>
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Nr</Th>
                                    <Th>Oddział</Th>
                                    <Th>Nazwisko</Th>
                                    <Th>Imię</Th>
                                    <Th>PESEL</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
        </Box>
    )
}

export default ExamPage

type examParams = {examid : number}