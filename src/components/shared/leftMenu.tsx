import { useDisclosure, Card, CardBody, Stack, Heading, Badge, HStack, Spinner, MenuList, MenuItem } from '@chakra-ui/react'
import { MoonIcon, SunIcon, AddIcon} from '@chakra-ui/icons'
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
import AuthAPIService from '../../services/api/auth/AuthAPIService.ts'
import { ContextMenu } from 'chakra-ui-contextmenu'


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
    const logoutUser = () => {
        AuthAPIService.logout();
        navigate("/login");
    }
     
    return(
        <Box borderRight="1px solid white" width="12vw" height="100vh" position="fixed">
            <Text fontSize="4xl" onClick={()=> navigate("/")} style={{cursor: "pointer"}}  margin={["0", "0", "0", "3"]}>matExam</Text>
            <Button onClick={onOpen} margin={["0", "0", "0", "3"]}>Dodaj egzamin</Button>
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
                    <AccordionPanel pb={4} height="50vh" overflow="auto" >
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
                                            <Text fontSize="sm">
                                                {
                                                    new Date(exam.startTime.toString()).toLocaleString("pl-PL", {year: "numeric", month: "2-digit", day: "2-digit",hour: '2-digit', minute: "2-digit", weekday: "short"})
                                                }
                                            </Text>
                                        }
                                        
                                    </CardBody> 
                                    </Link>
                                    <ContextMenu<HTMLDivElement>
                                        renderMenu={() => (
                                        <MenuList>
                                            <MenuItem>Context Menu Item 1</MenuItem>
                                            <MenuItem>Context Menu Item 2</MenuItem>
                                        </MenuList>
                                        )}>
                                        {ref => <div ref={ref}>Target</div>}
                                    </ContextMenu>
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
            <Button onClick={() => logoutUser()} margin="3">Wyloguj się</Button>
            <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon></MoonIcon> : <SunIcon></SunIcon>}
            </Button>
            <Button onClick={onCsvOpen} margin={["0", "0", "0", "3"]}>
                <Text>Dodaj sztosa </Text>
                <AddIcon marginLeft="0.5vw"/>
                <Modal isOpen={isCsvOpen} onClose={onCsvClose} size="full">
                    <ModalOverlay/>
                    <CsvModal/>
                </Modal>
            </Button>
        </Box>
    )
}

export default LeftMenu