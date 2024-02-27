import { Image } from '@chakra-ui/react'
import { MoonIcon, SunIcon, AddIcon, SettingsIcon} from '@chakra-ui/icons'
import ExamsAPIService from '../../services/api/exams/ExamsAPIService.ts'
import { ExamItem } from '../../interfaces/exams.ts'
import {
    Image,
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
    Tooltip
} from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CsvModal from '../csvModal.tsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthAPIService from '../../services/api/auth/AuthAPIService.ts'
import { useMediaQuery } from '@chakra-ui/react'
import { motion } from "framer-motion"
import logo_white from "../../assets/logo_white.png"
import logo_black from "../../assets/logo_black.png"
import StudentForm from '../studentForm.tsx'
import ModalWindow from './ModalWindow.tsx'



function LeftMenu() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const {isOpen: isCsvOpen, onOpen: onCsvOpen, onClose: onCsvClose} = useDisclosure();
    const {isOpen: isRoomOpen, onOpen: onRoomOpen, onClose: onRoomClose} = useDisclosure();
    const {isOpen: isStudentOpen, onOpen: onStudentOpen, onClose: onStudentClose} = useDisclosure();
    const {isOpen: isMenuWide, onOpen: onMenuOpen, onClose: onMenuClose, getDisclosureProps} = useDisclosure({defaultIsOpen: true});

    const [hidden, setHidden] = useState(!isMenuWide)

    const { colorMode, toggleColorMode } = useColorMode()

    const [exams, setExams] = useState<ExamItem[]>();

    const [editedExam, setEditedExam] = useState<ExamItem>()

    const navigate = useNavigate();

    const [isLargerThan1800] = useMediaQuery('(min-width: 1800px)')

    useEffect(()=>{
        getExamsList();
    }, []);

    const getExamsList = () => {
        ExamsAPIService.getExams().then((res)=>{
            setExams(res)
            console.log(res)
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
                animate={{ width: isMenuWide ? "12vw" : "4vw"}}
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
                <Flex direction="row" justifyContent="left" alignItems="center" height="10vh" width="100%" ml="1vw">
                    <Image mr="0.5vw" src={colorMode === "dark" ? logo_white : logo_black} width="2vw" onClick={()=>navigate("/")} cursor="pointer"></Image>
                    <motion.div
                    {...getDisclosureProps()}
                    hidden={hidden}
                    initial={false}
                    animate={{opacity: isMenuWide ? "100%" : "0%" }}>
                        <Text unselectable='on' fontSize="1.9vw" onClick={()=> navigate("/")} style={{cursor: "pointer"}} >matExam</Text>    
                    </motion.div>
                </Flex>
                <motion.div
                {...getDisclosureProps()}
                hidden={hidden}
                initial={false}
                animate={{opacity: isMenuWide ? "100%" : "0%" }}>
                <Button fontSize="1vw" width="90%" onClick={onOpen} margin="0.5vw">Dodaj egzamin <AddIcon ml="0.5vw" /></Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ExamForm refreshExams={getExamsList} onCloseExam={onClose}/>
                </Modal>
                <Button fontSize="1vw" width="90%" onClick={onRoomOpen} margin="0.5vw">Dodaj salę</Button>
                <Modal isOpen={isRoomOpen} onClose={onRoomClose}>
                    <ModalOverlay/>
                    <RoomForm onRoomClose={onRoomClose}/>
                    {/* <ModalWindow onClose={onClose} dataInterface={""} /> */}
                    <ModalWindow onClose={onClose} fields={[{fieldname: "imie", gridNumber:1}, {fieldname: "essa", gridNumber: 1}]} />
                </Modal>
                <Accordion allowMultiple>
                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                <HStack>
                                    <Text fontSize="1.2vw">Egzaminy</Text>
                                    {exams?.length != undefined && exams?.length >= 0 ?
                                        <Badge>{exams?.length}</Badge>
                                        : <Spinner size="sm" />
                                    }
                                </HStack>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} height="40vh" overflowY="auto" overflowX="hidden" >
                            {exams?.length !== undefined && exams?.length <= 0 &&
                                <Card height="100%">
                                    <CardBody>
                                        <Flex height="100%" width="100%" justifyContent="center" alignItems="center">
                                            <Text overflowWrap="break-word" whiteSpace="pre-wrap" fontSize="0.8vw">Nie ma tu jeszcze żadnego egzaminu.</Text>
                                        </Flex>
                                    </CardBody>
                                </Card>
                            }
                            <Stack spacing="3">
                                {exams?.map((exam: ExamItem) =>
                                <>
                                    <Card key={exam.id} variant="elevated" style={{cursor: "pointer"}}>
                                        <Link to={`/exam/${exam.id}`}>
                                        <Menu>
                                            {({ isOpen }) => (
                                                <>
                                                    <MenuButton isActive={isOpen}
                                                        as={IconButton}
                                                        aria-label='Options'
                                                        icon={<SettingsIcon />}
                                                        variant='outline'
                                                        size={isLargerThan1800 ? "sm" : "xs"}
                                                        float="right"
                                                        border="none"
                                                    >
                                                    </MenuButton>
                                                    <MenuList>
                                                        <MenuItem onClick={() => {setEditedExam(exam); onOpenEdit()}}>Edit</MenuItem>
                                                        <MenuItem onClick={()=> delExam(exam.id)}>Delete</MenuItem>
                                                    </MenuList>
                                                </>
                                            )}
                                        </Menu>
                                        <CardBody>
                                                <Heading fontSize='0.9vw'> 
                                                    {exam.name}
                                                </Heading>
                                            {exam.type == "basic" &&
                                                <Badge fontSize="0.5vw">Podstawowy</Badge>
                                            }
                                            {exam.type == "extended" &&
                                                <Badge fontSize="0.5vw">Rozszerzony</Badge>
                                            }
                                            {exam.type == "oral" &&
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
                                    </>
                                ) ?? <Text>Wczytywanie...</Text>}
                            </Stack>
                        </AccordionPanel>
                    </AccordionItem>
                    <Divider />
                </Accordion>
                <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
                    <ModalOverlay/>
                    <ExamForm examBody={editedExam} refreshExams={getExamsList} onCloseExam={onCloseEdit}/>
                </Modal>
                <Flex position="absolute" bottom="0" direction="column" justifyContent="center" alignItems="center" width="100%" mb="1vw">
                        <Flex width="90%" margin="0.5vw" justifyContent="space-around">
                            <Button width="65%" fontSize="1vw" onClick={() => logoutUser()}>Wyloguj się</Button>
                            <Button width="25%" fontSize="1vw" onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon></MoonIcon> : <SunIcon></SunIcon>}
                            </Button>
                        </Flex>
                        <Button fontSize="1vw" width="90%" onClick={onCsvOpen} margin="0.5vw" mb="0">
                            <Text>Wypełnij dane </Text>
                            <AddIcon marginLeft="0.5vw"/>
                            <Modal isOpen={isCsvOpen} onClose={onCsvClose} size="full">
                                <ModalOverlay/>
                                <CsvModal refreshExams={getExamsList} />
                            </Modal>
                        </Button>
                </Flex>
                </motion.div>
            </motion.div>

            {/* When left panel isn't wide  */}
            <Box paddingLeft="1vw" paddingRight="1vw" height="100vh" top="10vh" width="4vw" zIndex="5" float="left" style={{boxShadow: "8px 8px 24px 0px rgba(0, 0, 0, 0.6)"}} onMouseEnter={()=> onMenuOpen()}>
                <Flex height="10vh" justifyContent="left" alignItems="center">
                    <Image src={colorMode === "dark" ? logo_white : logo_black} zIndex="20" width="2vw"></Image>
                </Flex>
                <motion.div
                {...getDisclosureProps()}
                hidden={!hidden}
                initial={false}
                animate={{opacity: isMenuWide ? "0%" : "100%" }}
                transition={{delay: "0.5"}}
                style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                }}>
                    <Flex direction="column" justifyContent="flex-start" gap="1vw" alignItems="center" height="90vh">
                        <Flex width="100%" direction="column" justifyContent="center" alignItems="center">
                            <Button fontSize="0.9vw" width="1vw" size="sm" mt="1vh"><AddIcon /></Button>
                        </Flex>
                        <Divider width="80%" />
                        <Text fontSize="0.7vw">Egzam.</Text>
                        {exams?.map((exam: ExamItem) =>
                        <Link key={exam.id} to={`/exam/${exam.id}`}>
                            <Tooltip label={exam.name} placement="right">
                                <Badge fontSize="0.9vw">{Array.from(exam.name)[0]}{Array.from(exam.name)[1]}{Array.from(exam.name)[2]}</Badge>
                            </Tooltip>
                        </Link>  
                        ) ?? <Text>Wczytywanie...</Text>}
                        <Button justifySelf="end" aspectRatio="1/1" fontSize="0.9vw" size="sm" width="1vw" mt="auto"><SunIcon /></Button>
                        <Button justifySelf="end" aspectRatio="1/1" fontSize="0.9vw" size="sm" width="1vw" mb="1vw"><AddIcon /></Button>
                    </Flex>
                </motion.div>
            </Box>
        </Flex>
    )
}

export default LeftMenu