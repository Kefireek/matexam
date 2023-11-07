import { useEffect } from "react";
import { AiOutlineDesktop } from "react-icons/ai";
import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Collapse, Flex, Heading, Icon, ScaleFade, Slide, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

function ExamDetailsModal(props) {

    const { isOpen, onToggle } = useDisclosure()


    return(
        <>
            <Box key={props.number}>
                <Card>
                    <CardHeader>
                        <Heading size='md'> Sala {props.number}
                        {props.computers !== null && props.computers === true  &&
                            <Badge><Icon fontSize="1vw" as={AiOutlineDesktop} /></Badge>
                        }
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>Pojemność sali: {props.size}</Text>
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
                    height="60vh"
                    margin="0"
                >
                    <Flex justifyContent="space-between">
                        <Heading>
                            Sala {props.number} <Badge></Badge>
                            <Text fontSize="18px">Pojemność: {props.size}</Text>
                        </Heading>
                        <Button onClick={onToggle}><CloseIcon /></Button>
                    </Flex>
                    <TableContainer width="40vw">
                        <Table variant='striped' colorScheme='teal'>
                            <TableCaption>Przypisani uczniowie</TableCaption>
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
                                {props.students.map((result)=>
                                    <Tr key={result.PESEL}>
                                        <Td>{result.ordinalNumber}</Td>
                                        <Td>{result.department}</Td>
                                        <Td>{result.surname}</Td>
                                        <Td>{result.name}</Td>
                                        <Td>{result.PESEL}</Td>
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
        </>
    )
}

export default ExamDetailsModal