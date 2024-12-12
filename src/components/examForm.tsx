import { 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    Button,
    Input,
    FormLabel,
    FormControl,
    FormErrorMessage,
    RadioGroup,
    HStack,
    Radio,
    Checkbox,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { ExamItem, ExamType } from "../interfaces/exams";
import ExamsAPIService from "../services/api/exams/ExamsAPIService";
import { useContext, useEffect, useState } from "react";
import messageContext from "../contexts/messageContext";


export type ExamFormModel = {
    name: string,
    startTime: Date,
    endTime: Date,
    type: ExamType,
    computers: boolean
}

const ExamForm = ({refreshExams, onCloseExam, examBody}: {refreshExams: () => void, onCloseExam: () => void,  examBody?: ExamItem}) => {

    const { 
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm<ExamFormModel>();

    const [examName, setExamName] = useState(examBody?.name);
    const [examType, setExamType] = useState(examBody?.type);
    const [examStartTime, setExamStartTime] = useState(examBody?.startTime);
    const [examEndTime, setExamEndTime] = useState(examBody?.endTime);

    const { setMessage } = useContext(messageContext)

    useEffect(()=>{
        setExamName(examBody?.name)
        setExamType(examBody?.type)
    }, [examBody])

    function compareTime(time1: Date, time2: Date) {
        return new Date(time1) < new Date(time2); // true if time2 is later
    }

    const onSubmit = async (values: ExamFormModel) => {
        const {name, startTime, endTime, type, computers} = values;
        const validDates = compareTime(startTime, endTime);
        if(validDates !== true){
            alert("Data zakończenia powinna być później niż data rozpoczęcia")
        }
        else{
            const exam = {name, type, startTime, endTime, computers}
            if(examBody === undefined){
                await ExamsAPIService.addExam(exam);
                setMessage({
                    title: 'Pomyślnie dodano egzamin',
                    description: null,
                    status: 'success'
                })
            }
            else{
                await ExamsAPIService.editExam(exam, examBody.id)
                setMessage({
                    title: 'Pomyślnie zedytowano egzamin',
                    description: null,
                    status: 'success'
                })
            }
            refreshExams();
            onCloseExam();
        }
    }
    
    return (
        <ModalContent>
            <ModalHeader>
                <ModalCloseButton/>
            </ModalHeader>
            <ModalBody>
                <form id="exam-form" onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.name?.message != null} mb="5">
                        <FormLabel> Nazwa </FormLabel>
                        <Input
                            id="name"
                            placeholder="Nazwa"
                            value={examName}
                            {...register(
                                'name', {
                                    required: "Pole nie może być puste!",
                                    onChange: (e)=> setExamName(e.target.value),
                                    maxLength: 100
                                }
                            )} />
                        <FormErrorMessage> {errors.name && errors.name?.message} </FormErrorMessage>
                    </FormControl>
                    <FormControl mb="5">
                        <FormLabel> Rodzaj </FormLabel>
                        <RadioGroup value={examType}>
                            <HStack>
                                <Radio value="basic" checked={examType == "basic" ? true : false } {...register('type', {onChange: ((e)=> setExamType(e.target.value))})}>podstawowy</Radio>
                                <Radio value="extended" checked={examType == "extended" ? true : false } {...register('type', {onChange: ((e)=> setExamType(e.target.value))})}>rozszerzony</Radio>
                                <Radio value="oral" checked={examType == "oral" ? true : false } {...register('type', {onChange: ((e)=> setExamType(e.target.value))})}>ustny</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                    <FormControl isInvalid={errors.startTime?.message != null} mb="5">
                        <FormLabel> Data i godzina rozpoczęcia </FormLabel>
                        <Input
                            id="startDate"
                            type="datetime-local"
                            value={examStartTime?.toLocaleString("sv-SE") ?? ''}
                            {...register(
                                'startTime', {
                                    required: "Pole nie może być puste!",
                                    onChange: (e)=>setExamStartTime(e.target.value)
                                }
                            )} />
                        <FormErrorMessage> {errors.startTime && errors.startTime?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.endTime?.message != null} mb="5">
                        <FormLabel> Data i godzina zakończenia </FormLabel>
                        <Input
                            id="endDate"
                            type="datetime-local"
                            value={examEndTime?.toLocaleString("sv-SE") ?? ''}
                            {...register(
                                'endTime', {
                                    required: "Pole nie może być puste!",
                                    onChange: (e)=>setExamEndTime(e.target.value)
                                }
                            )} />
                        <FormErrorMessage> {errors.endTime && errors.endTime?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Sala komputerowa </FormLabel> 
                        <Checkbox {...register('computers')}/>
                    </FormControl>
                    <Button style={{margin: "10px 0px 10px 0px"}} type="submit" id="exam-form" isLoading={isSubmitting} colorScheme='teal'>Zatwierdź!</Button>
                </form>
            </ModalBody>
        </ModalContent>
    )
}

export default ExamForm;