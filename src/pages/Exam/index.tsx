import { useNavigate, useParams } from "react-router-dom";
import { Badge, Box, Flex, IconButton, Menu, MenuButton, MenuGroup, MenuItem, MenuList, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ExamView } from "../../interfaces/exams";
import ExamsAPIService from "../../services/api/exams/ExamsAPIService";
import ExamDetailsModal from "./ExamDetailsModal";
import { AddIcon } from "@chakra-ui/icons";

function ExamPage() {

    const { examid } = useParams() as any as examParams;

    const { colorMode } = useColorMode()

    const [examView, setExamView] = useState<ExamView>();

    const navigate = useNavigate();

    useEffect( ()=> {
        const fetchData = async () => {
            if(examid == undefined){
                navigate("/error")
            }
            else if(examid != undefined){
                getExam(examid)
            }
        }
        fetchData().catch((err)=>{
            console.log(err);
        });
    }, [examid])

    const getExam = (examid: number) => {
        ExamsAPIService.getExam(examid).then((res)=>{
            console.log(res.data)
            setExamView(res.data)
        }).catch((err)=>{
            console.log(err);
        });
    }

    const assignStudent = async (pesel : string, numberp : number) => {
        ExamsAPIService.updateRoomAssignments(examid, [{PESEL : pesel, number : numberp}]).then(()=>{
            getExam(examid);
        });
        // props.refreshExams();
        // props.onCloseExam();
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
            </Flex>
        </Box>
         <Box paddingLeft="1.5vw">
            <Box marginTop="2vw" display="flex" justifyContent="space-between">
                <Box>
                    <SimpleGrid width="46vw" spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                        {examView?.assignedStudents.map((room) =>
                            <ExamDetailsModal key={room.number} room={room} examid={examid} getExam={getExam}/>
                        )
                        }
                    </SimpleGrid>
                </Box>
                <Box ml="1vw">
                    <TableContainer width="46vw">
                        <Table variant='striped' colorScheme='teal'>
                            <TableCaption>Nieprzypisani uczniowie</TableCaption>
                            <Thead>
                            <Tr>
                                <Th>Nr w dzienniku</Th>
                                <Th>Oddział</Th>
                                <Th>Nazwisko</Th>
                                <Th>Imię</Th>
                                <Th>PESEL</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {examView?.unassignedStudents.map((student)=>
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
                                <Th>Nr w dzienniku</Th>
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