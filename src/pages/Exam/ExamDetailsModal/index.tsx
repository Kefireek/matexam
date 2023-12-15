import { AiOutlineDesktop } from "react-icons/ai";
import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Collapse, Flex, Heading, Icon, IconButton, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { RoomStudents } from "../../../interfaces/rooms";
import ExamsAPIService from "../../../services/api/exams/ExamsAPIService";

function ExamDetailsModal(props : {room : RoomStudents, examid: number, getExam: CallableFunction}) {

    const { isOpen, onToggle } = useDisclosure()

    const unassignStudent = async (pesel : string) => {
        ExamsAPIService.updateRoomAssignments(props.examid, [{PESEL : pesel}]).then(()=>{
            props.getExam(props.examid);
        });
        // props.refreshExams();
        // props.onCloseExam();
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
                        <Text>Pojemność sali: {props.room.size}</Text>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={onToggle}>Zobacz</Button>
                    </CardFooter>
                </Card>
            </Box>
            <Box position="absolute" zIndex="10" as={Collapse} in={isOpen} animateOpacity>
                <Box
                    p='40px'
                    color='white'
                    mt='4'
                    bg='#2D3748'
                    rounded='md'
                    shadow='md'
                    width="40vw"
                    height="70vh"
                    margin="0"
                >
                    <Flex justifyContent="space-between">
                        <Heading>
                            Sala {props.room.number} <Badge></Badge>
                            <Text fontSize="18px">Pojemność: {props.room.size}</Text>
                        </Heading>
                        <Button onClick={onToggle}><CloseIcon /></Button>
                    </Flex>
                    <Table>
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
                    </Table>

                </Box>
            </Box>
        </>
    )
}

export default ExamDetailsModal