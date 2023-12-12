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

export type RoomFormModel = {
    roomNumber: number,
    roomSize: number,
    hasComputers: boolean
}
const RoomForm = () => {
    const { 
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm<RoomFormModel>();
    const onSubmit = () => {

    }

    return (
        <ModalContent>
        <ModalHeader>
            <ModalCloseButton/>
        </ModalHeader>
        <ModalBody>
            <form id="exam-form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.roomNumber?.message != null} mb="5">
                    <FormLabel> nazwa </FormLabel>
                    <Input
                        id="roomNumber"
                        placeholder="numer sali"
                        type="number"
                        {...register(
                            'roomNumber', {
                                required: "Pole nie może być puste!",
                            }
                        )} />
                    <FormErrorMessage> {errors.roomNumber && errors.roomNumber.message} </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.roomSize?.message != null} mb="5">
                    <FormLabel> rozmiar </FormLabel>
                    <Input
                        id="roomSize"
                        placeholder="rozmiar sali"
                        type="number"
                        {...register(
                            'roomSize', {
                                required: "Pole nie może być puste!"
                            }
                        )} />
                    <FormErrorMessage> {errors.roomSize && errors.roomSize.message}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel>czy sala posiada komputery?</FormLabel>
                    <Input
                        id="hasComputers"
                        type="checkbox"
                        {...register(
                            'hasComputers', {
                                
                            }
                        )}
                    />
                </FormControl>
                <Button type="submit" id="exam-form" isLoading={isSubmitting} colorScheme='teal'>Zatwierdź!</Button>
            </form>
        </ModalBody>
    </ModalContent>
    );
}

export default RoomForm;