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
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { ExamType } from "../interfaces/exams";
import ExamsAPIService from "../services/api/exams/ExamsAPIService";
import { useEffect } from "react";


export type ExamFormModel = {
    name: string,
    startTime: Date,
    endTime: Date,
    type: ExamType
}

const ExamForm = (props: {refreshExams: Function, onCloseExam: Function,  examBody?: {id: number, name: string, type?: string, start_time?: string, end_time?: string}}) => {
    
    const { 
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm<ExamFormModel>();

    function compareTime(time1: Date, time2: Date) {
        return new Date(time1) < new Date(time2); // true if time2 is later
    }

    useEffect(()=>{
        console.log(props.examBody)
    }, [])

    const onSubmit = async (values: ExamFormModel) => {
        const {name, startTime, endTime, type} = values;
        const validDates = compareTime(startTime, endTime);
        if(validDates !== true){
            alert("Data zakończenia powinna być później niż data rozpoczęcia")
        }
        else{
            const exam = {name, type, startTime, endTime}
            await ExamsAPIService.addExam(exam);
            props.refreshExams();
            props.onCloseExam();
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
                            value={props.examBody !== undefined ? props.examBody.name : ""}
                            {...register(
                                'name', {
                                    required: "Pole nie może być puste!",
                                    maxLength: 100
                                }
                            )} />
                        <FormErrorMessage> {errors.name && errors.name?.message} </FormErrorMessage>
                    </FormControl>
                    <FormControl mb="5">
                        <FormLabel> Rodzaj </FormLabel>
                        <RadioGroup defaultValue="basic">
                            <HStack>
                                <Radio value="basic" defaultChecked={true} checked={props.examBody !== undefined && props.examBody.type == "basic" ? true : false } {...register('type')}>podstawowy</Radio>
                                <Radio value="extended" checked={props.examBody !== undefined && props.examBody.type == "extended" ? true : false } {...register('type')}>rozszerzony</Radio>
                                <Radio value="oral" checked={props.examBody !== undefined && props.examBody.type == "oral" ? true : false } {...register('type')}>ustny</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                    <FormControl isInvalid={errors.startTime?.message != null} mb="5">
                        <FormLabel> Data i godzina rozpoczęcia </FormLabel>
                        <Input
                            id="startDate"
                            type="datetime-local"
                            value={props.examBody !== undefined ? props.examBody.start_time : undefined}
                            {...register(
                                'startTime', {
                                    required: "Pole nie może być puste!"
                                }
                            )} />
                        <FormErrorMessage> {errors.startTime && errors.startTime?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.endTime?.message != null} mb="5">
                        <FormLabel> Data i godzina zakończenia </FormLabel>
                        <Input
                            id="endDate"
                            type="datetime-local"
                            value={props.examBody !== undefined ? props.examBody.end_time : undefined}
                            {...register(
                                'endTime', {
                                    required: "Pole nie może być puste!"
                                }
                            )} />
                        <FormErrorMessage> {errors.endTime && errors.endTime?.message}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit" id="exam-form" isLoading={isSubmitting} colorScheme='teal'>Zatwierdź!</Button>
                </form>
            </ModalBody>
        </ModalContent>
    )
}

export default ExamForm;