import { Collapse, Avatar, Tooltip, Image } from '@chakra-ui/react'

import { MoonIcon, SunIcon, AddIcon, ChevronDownIcon, HamburgerIcon} from '@chakra-ui/icons'
import ExamsAPIService from '../../services/api/exams/ExamsAPIService.ts'
import ExamForm from '../examForm.tsx'
import { ExamItem } from '../../interfaces/exams.ts'
import {
    useDisclosure, 
    Card, 
    CardBody, 
    Stack, 
    Heading,
    Badge, 
    HStack, 
    Spinner, 
    MenuList, 
    MenuItem,
    Menu, 
    MenuButton, 
    IconButton, 
    Flex,
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
import { useMediaQuery } from '@chakra-ui/react'
import { motion } from "framer-motion"
import RoomForm from '../roomForm.tsx'
import logo_white from "../../assets/logo_white.png"
import logo_black from "../../assets/logo_black.png"
import StudentForm from '../studentForm.tsx'



function LeftMenu() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {isOpen: isCsvOpen, onOpen: onCsvOpen, onClose: onCsvClose} = useDisclosure();
    const {isOpen: isRoomOpen, onOpen: onRoomOpen, onClose: onRoomClose} = useDisclosure();
    const {isOpen: isStudentOpen, onOpen: onStudentOpen, onClose: onStudentClose} = useDisclosure();
    const {isOpen: isMenuWide, onOpen: onMenuOpen, onClose: onMenuClose, getButtonProps, getDisclosureProps} = useDisclosure({defaultIsOpen: true});

    const [hidden, setHidden] = useState(!isMenuWide)

    const { colorMode, toggleColorMode } = useColorMode()

    const [exams, setExams] = useState<ExamItem[]>();

    const navigate = useNavigate();

    const [isLargerThan1800] = useMediaQuery('(min-width: 1800px)')


    useEffect(()=>{
        getExamsList();
        console.log(hidden)
    }, [hidden]);

    const getExamsList = () => {
        ExamsAPIService.getExams().then((res)=>{
            setExams(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err);
        });
    }

    const delExam = (id: number) => {
        ExamsAPIService.deleteExam(id).then(()=>{
            getExamsList();
        })
    }
    const logoutUser = () => {
        AuthAPIService.logout();
        navigate("/login");
    }
     
    return(
        <Flex height="100vh" flexDirection="column">
            <motion.div
                {...getDisclosureProps()}
                hidden={hidden}
                initial={false}
                onAnimationStart={() => setHidden(false)}
                onAnimationComplete={() => setHidden(!isMenuWide)}
                animate={{ width: isMenuWide ? "12vw" : "4vw" }}
                onMouseLeave={()=> onMenuClose()}
                style={{
                overflow: 'hidden',
                position: "absolute",
                whiteSpace: 'nowrap',
                left: '0',
                height: '100vh',
                top: '0',
                zIndex: "10",
                boxShadow: "8px 8px 24px 0px rgba(0, 0, 0, 0.6)",
                backgroundColor: colorMode == "dark" ? "#1A202C" : "white",
                display: "flex",
                flexDirection: "column"
                }}
            >
                <Flex justifyContent="center" alignItems="center" height="10vh">
                    <Image ml="0.3vw" mr="0.5vw" src={colorMode === "dark" ? logo_white : logo_black} width="2vw"></Image>
                    <Text unselectable='on' fontSize="2vw" onClick={()=> navigate("/")} style={{cursor: "pointer"}} >matExam</Text>    
                </Flex>
                <Button fontSize="1vw" width="90%" onClick={onOpen} margin="0.5vw">Dodaj egzamin</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ExamForm refreshExams={getExamsList} onCloseExam={onClose}/>
                </Modal>
                <Button fontSize="1vw" width="90%" onClick={onRoomOpen} margin="0.5vw">Dodaj salę</Button>
                <Modal isOpen={isRoomOpen} onClose={onRoomClose}>
                    <ModalOverlay/>
                    <RoomForm onRoomClose={onRoomClose}/>
                </Modal>
                <Button fontSize="1vw" width="90%" onClick={onStudentOpen} margin="0.5vw">Dodaj ucznia</Button>
                <Modal isOpen={isStudentOpen} onClose={onStudentClose} size="lg">
                    <ModalOverlay/>
                    <StudentForm onStudentClose={onStudentClose}/>
                </Modal>
                <Accordion allowMultiple>
                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                <HStack>
                                    <Text fontSize="1.2vw">Egzaminy</Text>
                                    {exams?.length !== undefined ?
                                        <Badge>{exams?.length}</Badge>
                                        : <Spinner size="sm" />
                                    }
                                </HStack>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} height="40vh" overflowY="auto" overflowX="hidden" >
                            <Stack spacing="3">
                                {exams?.map((exam: ExamItem) =>
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
                                                        <MenuItem onClick={() => delExam(exam.id)}>Delete</MenuItem>
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
                <Flex width="90%" margin="0.5vw" justifyContent="space-around">
                    <Button width="65%" fontSize="1vw" onClick={logoutUser}>Wyloguj się</Button>
                    <Button width="25%" fontSize="1vw" onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon></MoonIcon> : <SunIcon></SunIcon>}
                    </Button>
                </Flex>
                <Button fontSize="1vw" width="90%" onClick={onCsvOpen} margin="0.5vw">
                    <Text>Wypełnij dane </Text>
                    <AddIcon marginLeft="0.5vw"/>
                    <Modal isOpen={isCsvOpen} onClose={onCsvClose} size="xl">
                        <ModalOverlay/>
                        <CsvModal refreshExams={getExamsList}/>
                    </Modal>
                </Button>
            </motion.div>

            {/* When left panel isn't wide  */}
            <Box paddingLeft="1vw" height="100vh" top="10vh" width="4vw" zIndex="5" float="left" style={{boxShadow: "8px 8px 24px 0px rgba(0, 0, 0, 0.6)"}} onMouseEnter={()=> onMenuOpen()}>
                <Flex height="10vh" justifyContent="left" alignItems="center">
                    <Image src={colorMode === "dark" ? logo_white : logo_black} width="2vw"></Image>
                </Flex>
                <Stack spacing="3">
                    {exams?.map((exam: ExamItem) =>
                    <Link to={`/exam/${exam.id}`}>
                        <Tooltip label={exam.name} placement="right">
                            <Text>{Array.from(exam.name)[0]}</Text>
                        </Tooltip>
                    </Link>  
                    ) ?? <Text>Wczytywanie...</Text>}
                </Stack>
            </Box>
        </Flex>
    )
}

export default LeftMenu