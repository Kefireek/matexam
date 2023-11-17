import { useDisclosure, Card, CardBody, Stack, Heading, Badge, HStack, Spinner, MenuList, MenuItem, Menu, MenuButton, IconButton, Flex } from '@chakra-ui/react'
import { MoonIcon, SunIcon, AddIcon, ChevronDownIcon} from '@chakra-ui/icons'
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
    Divider,
  } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CsvModal from '../csvModal.tsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthAPIService from '../../services/api/auth/AuthAPIService.ts'
import styles from "../../App.module.css";
import { useMediaQuery } from '@chakra-ui/react'


function LeftMenu() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {isOpen: isCsvOpen, onOpen: onCsvOpen, onClose: onCsvClose} = useDisclosure();

    const { colorMode, toggleColorMode } = useColorMode()

    const [exams, setExams] = useState<ExamsList>();

    const navigate = useNavigate();

    const [isLargerThan1800] = useMediaQuery('(min-width: 1800px)')


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
            <Text fontSize="2vw" onClick={()=> navigate("/")} style={{cursor: "pointer"}}  margin={["0", "0", "0", "3"]}>matExam</Text>
            <Button fontSize="1vw" width="90%" onClick={onOpen} margin="0.5vw">Dodaj egzamin</Button>
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
                                <Text fontSize="1.2vw">Egzaminy</Text>
                                {exams?.total !== undefined ?
                                    <Badge>{exams?.total}</Badge>
                                    : <Spinner size="sm" />
                                }
                            </HStack>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} height="40vh" overflowY="auto" overflowX="hidden" >
                        <Stack spacing="3">
                            {exams?.items.map((exam: ExamItem) =>
                                <Card key={exam.id} variant="elevated" style={{cursor: "pointer"}}>
                                    <Link to={`/exam/${exam.id}`}>
                                    <Menu>
                                        {({ isOpen }) => (
                                            <>
                                                <MenuButton isActive={isOpen}
                                                    as={IconButton}
                                                    aria-label='Options'
                                                    icon={<ChevronDownIcon />}
                                                    variant='outline'
                                                    size="sm"
                                                    float="right"
                                                    border="none"
                                                >
                                                </MenuButton>
                                                <MenuList>
                                                    <MenuItem>Edit</MenuItem>
                                                    <MenuItem>Delete</MenuItem>
                                                </MenuList>
                                            </>
                                        )}
                                    </Menu>
                                    <CardBody>
                                        <HStack>
                                            <Heading fontSize='0.9vw'> 
                                                {exam.name}
                                            </Heading>
                                            {exam.type == "basic" && isLargerThan1800 &&
                                                 <Badge fontSize="0.5vw">P</Badge>
                                            }
                                            {exam.type == "extended" && isLargerThan1800 &&
                                                 <Badge fontSize="0.5vw">R</Badge>
                                            }
                                            {exam.type == "oral" && isLargerThan1800 &&
                                                 <Badge fontSize="0.5vw">U</Badge>
                                            }
                                        </HStack>
                                        {exam.type == "basic" && !isLargerThan1800 &&
                                            <Badge fontSize="0.5vw">Podstawowy</Badge>
                                        }
                                        {exam.type == "extended" && !isLargerThan1800 &&
                                            <Badge fontSize="0.5vw">Rozszerzony</Badge>
                                        }
                                        {exam.type == "oral" && !isLargerThan1800 &&
                                            <Badge fontSize="0.5vw">Ustny</Badge>
                                        }
                                        {exam.startTime &&
                                            <Text fontSize="0.6vw">
                                                {
                                                    new Date(exam.startTime.toString()).toLocaleString("pl-PL", {year: "numeric", month: "2-digit", day: "2-digit",hour: '2-digit', minute: "2-digit", weekday: "short"})
                                                }
                                            </Text>
                                        }
                                        
                                    </CardBody> 
                                    </Link>
                                </Card>
                            ) ?? <Text>Wczytywanie...</Text>}
                        </Stack>
                    </AccordionPanel>
                </AccordionItem>
                <Divider />
            </Accordion>
            <Button width="90%" margin="0.5vw" fontSize="1vw" onClick={() => logoutUser}>Wyloguj się</Button>
            <Button margin="0.5vw" fontSize="1vw" onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon></MoonIcon> : <SunIcon></SunIcon>}
            </Button>
            <Button fontSize="1vw" width="90%" onClick={onCsvOpen} margin="0.5vw">
                <Text>Wypełnij dane </Text>
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