import { AiOutlineDesktop } from "react-icons/ai";
import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Collapse, Flex, Heading, Icon, IconButton, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useColorMode, useDisclosure } from "@chakra-ui/react";
import { CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { RoomStudents } from "../../../interfaces/rooms";
import ExamsAPIService from "../../../services/api/exams/ExamsAPIService";
import { FaUserPlus } from "react-icons/fa";
import { ExamView, StudentRoom } from "../../../interfaces/exams";
import { StudentDescriptive } from "../../../interfaces/students";

function ExamDetailsModal(props : {room : RoomStudents, examid: number, getExam: CallableFunction, unassignedStudents: StudentDescriptive[]}) {

    const { isOpen, onToggle } = useDisclosure()

    const { colorMode } = useColorMode()




    const unassignStudent = async (pesel : string) => {
        ExamsAPIService.updateRoomAssignments(props.examid, [{PESEL : pesel, number: null}]).then(()=>{
            props.getExam(props.examid);
        });
        // props.refreshExams();
        // props.onCloseExam();
    }

    const fillRoom = () => {
        let x = 0;
        if(props.room.students){
            x = props.room.students.length
            let new_students: Array<StudentRoom> = [];
        
            props.unassignedStudents.forEach(student => {
                    x++;
                    if(props.room.size<x){
                        console.log("Sala przepełniona")
                    }
                    else{
                        new_students.push({PESEL : student.PESEL, number : props.room.number});
                    }
                
            });

            ExamsAPIService.updateRoomAssignments(props.examid, new_students).then(()=>{
                props.getExam(props.examid);
            }); 
        }

    }

    return(
        <>
            <Box key={props.room.number}>
                <Card>
                    <CardHeader>
                        <Heading size='md'> Sala {props.room.number}
                        {props.room.computers !== null && props.room.computers === true  &&
                            <Badge><Icon fontSize="1vw" as={AiOutlineDesktop} /></Badge>
                        }
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>Pojemność sali: {props.room.students?.length}/{props.room.size}</Text>
                    </CardBody>
                    <CardFooter>
                        <Flex direction="row" justifyContent="space-between" alignContent="center">
                            <Button onClick={onToggle} width="45%">Zobacz</Button>
                            <Button onClick={fillRoom} width="45%">Auto<Box ml="5px"><FaUserPlus /></Box></Button>
                        </Flex>
                    </CardFooter>
                </Card>
            </Box>
            <Box position="absolute" zIndex="7" as={Collapse} in={isOpen} animateOpacity>
                <Box
                    p='40px'
                    color='white'
                    mt='4'
                    bg={colorMode == "light" ? "#F7FAFC" :'#2D3748'}
                    rounded='md'
                    shadow='md'
                    width="46vw"
                    height="70vh"
                    margin="0"
                >
                    <Flex justifyContent="space-between">
                        <Heading color={colorMode == "light" ? "black" :'white'}>
                            Sala {props.room.number} <Badge></Badge>
                            <Text fontSize="18px" fontWeight="medium">Pojemność: {props.room.students?.length}/{props.room.size}</Text>
                        </Heading>
                        <Button onClick={onToggle}><CloseIcon /></Button>
                    </Flex>
                    <SimpleGrid mt="1vw" spacing={4} templateColumns='repeat(auto-fill, minmax(15vw, 1fr))'>
                        {props.room.students?.map((student)=>
                            <Card key={student.PESEL} padding={4} bg={colorMode=="light" ? "RGBA(0, 0, 0, 0.08)" : "RGBA(0, 0, 0, 0.4)"}>
                                <Flex direction="row" fontSize="0.9vw" justifyContent="space-between" alignItems="center">
                                    <Text width="10%">{student.department}</Text>
                                    <Text width="10%">{student.ordinalNumber}</Text>
                                    <Text width="35%">{student.surname}</Text>
                                    <Text width="35%">{student.name}</Text>
                                    <IconButton width="10%" aria-label="Delete Student" icon={<MinusIcon/>} onClick={()=>unassignStudent(student.PESEL)}></IconButton>
                                </Flex>
                            </Card>
                        )}
                    </SimpleGrid>
                    {/* <Table>
                        <TableContainer>
                            {props.room.students?.map((result)=>
                                <Tr key={result.PESEL}>
                                    <Td>{result.ordinalNumber}</Td>
                                    <Td>{result.department}</Td>
                                    <Td>{result.surname}</Td>
                                    <Td>{result.name}</Td>
                                    <Td>{result.PESEL}</Td>
                                    <Td>
                                        <IconButton aria-label="Delete Student" icon={<MinusIcon/>} onClick={()=>unassignStudent(result.PESEL)}></IconButton>
                                    </Td>
                                </Tr>
                            )}
                        </TableContainer>
                    </Table> */}

                </Box>
            </Box>
        </>
    )
}

export default ExamDetailsModal