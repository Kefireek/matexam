import { 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalCloseButton, 
    ModalBody, 
    Button,
    Input,
    FormLabel
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";


export type ExamFormModel = {
    name: string,
    date: Date,

}

const ExamForm = () => {
    
    const { 
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm<ExamFormModel>();

    const onSubmit = () => {

    }


    return (
        <ModalContent>
            <ModalHeader>
                <ModalCloseButton/>
            </ModalHeader>
            <ModalBody>
                <form id="exam-form" onSubmit={handleSubmit(onSubmit)}>
                    <FormLabel> nazwa egzaminu: </FormLabel>
                    <Input
                        id="name"
                        placeholder="name"
                        {...register(
                            'name', {
                                required: "This is required!"
                            }
                        )}
                    />
                </form>
            </ModalBody>
            <ModalFooter>
                <Button type="submit" id="exam-form" isLoading={isSubmitting}>Zatwierdź!</Button>
            </ModalFooter>
        </ModalContent>
    )
}

export default ExamForm;