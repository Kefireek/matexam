import { 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    Input,
    FormLabel,
    FormControl,
    FormErrorMessage,
    Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";


const CsvModal = () => {

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm();

    const onSubmit = () => {
        
    }

    return (
        <ModalContent>
            <ModalHeader>
                <ModalCloseButton/>
            </ModalHeader>
            <ModalBody>
                <form id="csv-form" onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.file?.message != null}>
                        <FormLabel> Dodaj plik </FormLabel>
                        <Input 
                            type="file"
                            {...register(
                                'file'
                            )}
                        />
                        <FormErrorMessage>  </FormErrorMessage>
                    </FormControl>
                <Button type="submit" id="csv-form" isLoading={isSubmitting} colorScheme='teal'>Zatwierdź!</Button>
                </form>
            </ModalBody>
        </ModalContent>
    )
}

export default CsvModal;