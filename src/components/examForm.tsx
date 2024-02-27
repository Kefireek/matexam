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
    Radio
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { ExamType } from "../interfaces/exams";
import ExamsAPIService from "../services/api/exams/ExamsAPIService";


export type ExamFormModel = {
    name: string,
    startTime: Date,
    endTime: Date,
    type: ExamType
}

const ExamForm = (props: {refreshExams: () => void, onCloseExam: () => void}) => {
    
    const { 
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm<ExamFormModel>();

    function compareTime(time1: Date, time2: Date) {
        return new Date(time1) < new Date(time2); // true if time2 is later
    }

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
                                <Radio value="basic" defaultChecked={true} {...register('type')}>podstawowy</Radio>
                                <Radio value="extended" {...register('type')}>rozszerzony</Radio>
                                <Radio value="oral" {...register('type')}>ustny</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                    <FormControl isInvalid={errors.startTime?.message != null} mb="5">
                        <FormLabel> Data i godzina rozpoczęcia </FormLabel>
                        <Input
                            id="startDate"
                            type="datetime-local"
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