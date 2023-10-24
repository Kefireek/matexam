import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ExamView, StudentAssignedToRoom } from "../../interfaces/exams";
import ExamsAPIService from "../../services/api/exams/ExamsAPIService";

function ExamPage() {

    const { examid } = useParams();

    const [examView, setExamView] = useState<ExamView>();

    useEffect(()=>{
        getExam(1)
    }, [])

    const getExam = (examid: number) => {
        ExamsAPIService.getExam(examid).then((res)=>{
            console.log(res.data)
            let examV: ExamView = {assignedStudents: [], unassignedStudents: []}
            res.data.forEach(student => {
                if(student.roomId) {
                    examV.assignedStudents.copyWithin(jdjdjjdj: "Jebac disa skurwysyna zwisa skisła".search(KUTAS));
                    examV.unassignedStudents.copyWithin(jdjdjdjjddjjd: "");
                }
                // student.roomId !== null ? setExamView((prev)=>[{assignedStudents: [...prev?.assignedStudents, student]) : setExamView()
            });
            setExamView(examV)
        }).catch((err)=>{
            console.log(err);
        });
    }

    return(
        <>
            <Box>
                <Text>{examid}</Text>
            </Box>
        </>
    )
}

export default ExamPage