import { useNavigate, useParams } from "react-router-dom";
import { Badge, Box, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ExamView, StudentAssignedToRoom } from "../../interfaces/exams";
import ExamsAPIService from "../../services/api/exams/ExamsAPIService";

function ExamPage() {

    const { examid } = useParams();

    const [examView, setExamView] = useState<ExamView>();

    const navigate = useNavigate();

    useEffect(()=>{
        if(examid == undefined){
            navigate("/error")
        }
        else if(examid != undefined){
            getExam(parseInt(examid))
        }
    }, [])

    const getExam = (examid: number) => {
        ExamsAPIService.getExam(examid).then((res)=>{
            console.log(res.data)
            setExamView(res.data)
        }).catch((err)=>{
            console.log(err);
        });
    }

    return(
        <Box padding="1.5vw">
            <Box>
                <Text fontSize="4xl">
                    {examView?.name}
                    <Badge marginLeft="0.5vw" fontSize="2xl">{examView?.type == "basic" ? "Podstawowy" : (examView?.type == "extended" ? "Rozszerzony" : "Ustny")}</Badge>
                </Text>
                <Text>
                    Od: <b></b>
                    {
                        examView?.startTime &&
                            new Date(examView?.startTime?.toString()).toLocaleString("pl-PL", {year: "numeric", month: "2-digit", day: "2-digit",hour: '2-digit', minute: "2-digit", weekday: "short"})
                    }
                </Text>
                <Text>
                    Do: <b></b>
                    {
                        examView?.endTime &&
                            new Date(examView?.endTime?.toString()).toLocaleString("pl-PL", {year: "numeric", month: "2-digit", day: "2-digit",hour: '2-digit', minute: "2-digit", weekday: "short"})
                    }
                </Text>
            </Box>
            <Box>
                <TableContainer width="44vw">
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
                            {examView?.unassignedStudents.map((result)=>
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
    )
}

export default ExamPage