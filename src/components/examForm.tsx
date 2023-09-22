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


export type ExamFormModel = {
    name: string,
    date: string,

}

const ExamForm = () => {
    
    const { 
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm<ExamFormModel>();

    const onSubmit = (values: ExamFormModel) => {
        const {name, date} = values;
        alert(name + date)
    }
    
    return (
        <ModalContent>
            <ModalHeader>
                <ModalCloseButton/>
            </ModalHeader>
            <ModalBody>
                <form id="exam-form" onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.name?.message != null} mb="6">
                        <FormLabel> nazwa </FormLabel>
                        <Input
                            id="name"
                            placeholder="nawa"
                            {...register(
                                'name', {
                                    required: "Pole nie może być puste!"
                                }
                            )} />
                        <FormErrorMessage> {errors.name && errors.name?.message} </FormErrorMessage>
                    </FormControl>
                    <FormControl mb="5">
                        <FormLabel> rodzaj </FormLabel>
                        <RadioGroup>
                            <HStack>
                                <Radio value="podstawa" defaultChecked>podstawowy</Radio>
                                <Radio value="rozszerzenie" >rozszerzony</Radio>
                                <Radio value="ustny">ustny</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                    <FormControl isInvalid={errors.date?.message != null} mb="5">
                        <FormLabel> data </FormLabel>
                        <Input
                            id="date"
                            type="date"
                            {...register(
                                'date', {
                                    required: "Pole nie może być puste!"
                                }
                            )} />
                        <FormErrorMessage> {errors.date && errors.date?.message}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit" id="exam-form" isLoading={isSubmitting}>Zatwierdź!</Button>
                </form>
            </ModalBody>
        </ModalContent>
    )
}

export default ExamForm;