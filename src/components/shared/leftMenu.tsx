import { useDisclosure, Card, CardBody, Stack, Heading, Badge, HStack, Spinner } from '@chakra-ui/react'
import { MoonIcon, SunIcon, AddIcon } from '@chakra-ui/icons'
import ExamsAPIService from '../../services/api/exams/ExamsAPIService.ts'
import ExamForm from '../examForm.tsx'
import { ExamItem, ExamsList } from '../../interfaces/exams.ts'
import {
    Text,
    Box,
    Button,
    Modal,
    ModalOverlay,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Divider
  } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CsvModal from '../csvModal.tsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'


function LeftMenu() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {isOpen: isCsvOpen, onOpen: onCsvOpen, onClose: onCsvClose} = useDisclosure();

    const { colorMode, toggleColorMode } = useColorMode()

    const [exams, setExams] = useState<ExamsList>();

    const navigate = useNavigate();

    useEffect(()=>{
        getExamsList();
    }, []);

    const getExamsList = () => {
        ExamsAPIService.getExams().then((res)=>{
            setExams(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err);
        });
    }
     
    return(
        <Box borderRight="1px solid white" width="10vw" height="100vh" position="fixed">
            <Text fontSize="4xl">matExam</Text>
            <Button onClick={onOpen} margin="3">Dodaj egzamin</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ExamForm refreshExams={getExamsList} onCloseExam={onClose}/>
            </Modal>

            <Accordion allowMultiple>
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            <HStack>
                                <Text fontSize="20">Egzaminy</Text>
                                {exams?.total !== undefined ?
                                    <Badge>{exams?.total}</Badge>
                                    : <Spinner size="sm" />
                                }
                            </HStack>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Stack spacing="3">
                            {exams?.items.map((exam: ExamItem) =>
                                <Card key={exam.id} variant="elevated" style={{cursor: "pointer"}}>
                                    <Link to={`/exam/${exam.id}`}>
                                    <CardBody>
                                        <HStack>
                                            <Heading fontSize='md'> 
                                                {exam.name}
                                            </Heading>
                                            {exam.type == "basic" &&
                                                 <Badge>P</Badge>
                                            }
                                            {exam.type == "extended" &&
                                                 <Badge>R</Badge>
                                            }
                                            {exam.type == "oral" &&
                                                 <Badge>U</Badge>
                                            }
                                        </HStack>
                                        {exam.startTime &&
                                            <Text fontSize="sm">{exam.startTime.toString()}</Text>
                                        }
                                    </CardBody> 
                                    </Link>
                                </Card>
                            ) ?? <Text>Wczytywanie...</Text>}
                        </Stack>
                    </AccordionPanel>
                </AccordionItem>
                <Divider />
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                        Section 2 title
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Button onClick={()=> navigate("/login")} margin="3">Zaloguj się</Button>
            <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon></MoonIcon> : <SunIcon></SunIcon>}
            </Button>
            <Button onClick={onCsvOpen}>
                <AddIcon/>
                <Modal isOpen={isCsvOpen} onClose={onCsvClose}>
                    <ModalOverlay/>
                    <CsvModal/>
                </Modal>
            </Button>
        </Box>
    )
}

export default LeftMenu