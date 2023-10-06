import { useDisclosure, Card, CardBody, Stack, Heading, Badge } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import ExamsAPIService from '../../services/api/exams/ExamsAPIService.ts'
import ExamForm from '../examForm.tsx'
import { ExamsList } from '../../interfaces/exams.ts'
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
import { useEffect, useState } from 'react';

function LeftMenu() {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { colorMode, toggleColorMode } = useColorMode()

    const [exams, setExams] = useState<ExamsList>();

    const navigate = useNavigate();

    useEffect(()=>{
        ExamsAPIService.getExams().then((res)=>{
            setExams(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err);
        });
    }, []);
     
    return(
        <Box borderRight="1px solid white" width="10vw" height="100vh" position="fixed">
            <Text fontSize="4xl">matExam</Text>
            <Button onClick={onOpen} margin="3">Dodaj egzamin</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ExamForm/>
            </Modal>

            <Accordion allowMultiple>
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            <Text fontSize="20">Egzaminy</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Stack spacing="3">
                            <Card key="key1" variant="elevated">
                                <CardBody>
                                    <Heading fontSize='md'> 
                                        Matematyka 
                                        <Badge ml='1'>
                                            P
                                        </Badge>
                                    </Heading>
                                    <Text fontSize="sm">Śr., 07.10.2023r.</Text>
                                </CardBody>
                            </Card>
                            <Card key="key2" variant="elevated">
                                <CardBody>
                                    <Heading fontSize='md'> 
                                        Język polski
                                        <Badge ml='1'>
                                            R
                                        </Badge>
                                    </Heading>
                                    <Text fontSize="sm">Czw., 08.10.2023r.</Text>
                                </CardBody>
                            </Card>
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
        </Box>
    )
}

export default LeftMenu